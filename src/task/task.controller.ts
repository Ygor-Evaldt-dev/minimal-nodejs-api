import { IncomingMessage, ServerResponse } from "http";
import { TaskService } from "./task.service";
import { HttpStatus } from "@/util/http-status";
import { UpdateTaskDto } from "./dtos/update-task.dto";
import { NotFoundException } from "@/exceptions/not-found.exception";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { parse } from "csv-parse";
import { sleep } from "@/util/sleep";
import { BadRequestException } from "@/exceptions/bad-request.exception";


export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) { }

    async create(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        try {
            const { title, description } = req.body;
            const dto = new CreateTaskDto(title, description)
            await this.taskService.create(dto);

            res.writeHead(HttpStatus.OK).end();
        } catch (error: any) {
            if (error instanceof BadRequestException) {
                const { message } = error;
                return res.writeHead(error.statusCode).end(JSON.stringify({ message }));
            }

            res.writeHead(HttpStatus.INTERNAL_SERVER_ERROR).end();

        }
    }

    async createByCsv(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        try {
            const csvParse = parse({
                delimiter: ",",
                skipEmptyLines: true,
                fromLine: 2
            });

            const linesParse = req.pipe(csvParse);

            for await (const line of linesParse) {
                const [title, description] = line;

                const dto = new CreateTaskDto(title, description);
                await this.taskService.create(dto);

            }

            res.writeHead(HttpStatus.NO_CONTENT).end();
        } catch (error: any) {
            res.writeHead(HttpStatus.INTERNAL_SERVER_ERROR).end();
        }
    }

    async list(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        try {
            const tasks = await this.taskService.findMany();
            res.writeHead(HttpStatus.OK).end(JSON.stringify(tasks));
        } catch (error: any) {
            if (error instanceof NotFoundException) {
                return res.writeHead(error.statusCode).end(JSON.stringify({
                    message: error.message
                }));
            }
            res.writeHead(HttpStatus.NOT_FOUND).end(JSON.stringify({
                message: "Nenhuma tarefa encontrada"
            }));
        }
    }

    async update(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        try {
            const { id } = req.params;
            const { title, description, completedAt, updatedAt } = req.body;


            const dto = new UpdateTaskDto(title, description, undefined, completedAt, updatedAt);

            await this.taskService.update(id, dto);
            res.writeHead(HttpStatus.NO_CONTENT).end();
        } catch (error: any | NotFoundException) {
            if (error instanceof NotFoundException) {
                return res.writeHead(error.statusCode).end(JSON.stringify({
                    message: error.message
                }));
            }

            res.writeHead(HttpStatus.INTERNAL_SERVER_ERROR).end();
        }
    }

    async delete(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        try {
            const { id } = req.params;
            await this.taskService.delete(id);

            res.writeHead(HttpStatus.NO_CONTENT).end();
        } catch (error: any) {
            if (error instanceof NotFoundException) {
                return res.writeHead(error.statusCode).end(JSON.stringify({
                    message: error.message
                }));
            }

            res.writeHead(HttpStatus.INTERNAL_SERVER_ERROR).end();
        }
    }
}
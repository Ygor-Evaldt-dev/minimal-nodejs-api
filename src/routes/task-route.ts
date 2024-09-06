import { TaskController } from "@/task/task.controller";
import { Router } from "./router";
import { IncomingMessage, ServerResponse } from "node:http";

export class TaskRoutes {
    constructor(
        private readonly service: string,
        private readonly controller: TaskController
    ) {
        Router.get(this.service, async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
            return await this.controller.list(req, res);
        });
        Router.post(this.service, async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
            return await this.controller.create(req, res);
        });
        Router.post(`${this.service}/csv`, async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
            return await this.controller.createByCsv(req, res);
        });
        Router.put(`${this.service}/:id`, async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
            return await this.controller.update(req, res);
        });
        Router.delete(`${this.service}/:id`, async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
            return await this.controller.delete(req, res);
        });
    }
}
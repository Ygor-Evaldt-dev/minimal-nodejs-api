import { ITaskRepository } from "@/interfaces/task-repository.interface";
import { TaskEntity } from "./entity/task.entity";
import { NotFoundException } from "@/exceptions/not-found.exception";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-task.dto";

export class TaskService {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async create({
        title,
        description,
        createdAt
    }: CreateTaskDto): Promise<void> {
        const task = new TaskEntity(title, description, createdAt);
        await this.repository.create(task);
    }

    async findMany(): Promise<TaskEntity[]> {
        const tasks = await this.repository.findMany();
        if (tasks.length === 0)
            throw new NotFoundException("Nenuma tarefa encontrada");

        return tasks;
    }

    async update(id: string, dto: UpdateTaskDto): Promise<void> {
        const existingTask = await this.repository.findUnique(id);
        if (!existingTask)
            throw new NotFoundException("Tarefa não cadastrada");

        const { title, description, updatedAt, completedAt } = dto;
        const updated = updatedAt ? new Date(updatedAt) : new Date();
        const completed = completedAt ? new Date(completedAt) : undefined;

        const task = new TaskEntity(
            title ?? existingTask.title,
            description ?? existingTask.description,
            existingTask.createdAt,
            completed ?? existingTask.completedAt,
            updated,
            existingTask.id
        );

        await this.repository.update(task);
    }

    async delete(id: string) {
        const existingTask = await this.repository.findUnique(id);
        if (!existingTask)
            throw new NotFoundException("Tarefa não cadastrada");

        await this.repository.delete(id);
    }
}
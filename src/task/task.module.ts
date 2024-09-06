import { LocalDatabaseOrm } from "@/database/local-database-orm";
import { ITaskRepository } from "@/interfaces/task-repository.interface";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { TaskLocalRepository } from "@/database/repositories/task-local.repository";

export class TaskModule {
    readonly taskRepository: ITaskRepository;
    readonly taskService: TaskService;
    readonly taskController: TaskController;

    constructor(
        orm: LocalDatabaseOrm
    ) {
        this.taskRepository = new TaskLocalRepository(orm);
        this.taskService = new TaskService(this.taskRepository);
        this.taskController = new TaskController(this.taskService);
    }
}
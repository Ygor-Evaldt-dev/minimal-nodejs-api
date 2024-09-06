import { TaskEntity } from "@/task/entity/task.entity";

export interface IDatabase {
    tasks: TaskEntity[]
}
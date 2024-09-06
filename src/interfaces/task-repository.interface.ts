import { TaskEntity } from "@/task/entity/task.entity";

export interface ITaskRepository {
    create(task: TaskEntity): Promise<void>;
    findMany(): Promise<TaskEntity[]>;
    findUnique(id: string): Promise<TaskEntity | undefined>;
    update(task: TaskEntity): Promise<void>;
    delete(id: string): Promise<void>;

}
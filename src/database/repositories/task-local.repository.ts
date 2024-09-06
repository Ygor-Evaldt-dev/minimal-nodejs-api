import { ITaskRepository } from "@/interfaces/task-repository.interface";
import { LocalDatabaseOrm } from "../local-database-orm";
import { TaskEntity } from "@/task/entity/task.entity";

export class TaskLocalRepository implements ITaskRepository {
    constructor(
        private readonly orm: LocalDatabaseOrm
    ) {
        this.start();
    }

    async create(task: TaskEntity): Promise<void> {
        const db = await this.orm.open();

        db.tasks.push(task);
        this.orm.save(db);
    }

    async findMany(): Promise<TaskEntity[]> {
        const db = await this.orm.open();
        return db.tasks ?? [];
    }

    async findUnique(id: string): Promise<TaskEntity | undefined> {
        const db = await this.orm.open();
        return db.tasks.find(task => task.id === id);
    }

    async update(task: TaskEntity): Promise<void> {
        const db = await this.orm.open();
        const register = db.tasks.find(item => item.id === task.id);
        if (!register) return;

        const index = db.tasks.indexOf(register);
        db.tasks[index] = task;

        this.orm.save(db);
    }

    async delete(id: string): Promise<void> {
        let db = await this.orm.open();
        db.tasks = db.tasks.filter(task => task.id !== id);

        this.orm.save(db);
    }

    private async start() {
        const db = await this.orm.open();
        if (db.tasks) return;

        db.tasks = [];
        this.orm.save(db);
    }
}
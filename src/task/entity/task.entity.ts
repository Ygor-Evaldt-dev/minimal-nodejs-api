import { randomUUID } from "node:crypto";

export class TaskEntity {
    constructor(
        readonly title: string,
        readonly description: string,
        readonly createdAt: Date,
        readonly completedAt?: Date,
        readonly updatedAt?: Date,
        readonly id = randomUUID()
    ) { }
}
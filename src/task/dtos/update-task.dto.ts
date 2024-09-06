export class UpdateTaskDto {
    constructor(
        readonly title?: string,
        readonly description?: string,
        readonly createdAt?: Date,
        readonly completedAt?: string,
        readonly updatedAt?: string
    ) { }
}
import { BadRequestException } from "@/exceptions/bad-request.exception";

export class CreateTaskDto {
    constructor(
        readonly title: string,
        readonly description: string,
        readonly createdAt: Date = new Date(),
        readonly completedAt?: Date,
        readonly updatedAt?: Date
    ) {
        if (!this.title)
            throw new BadRequestException("'title' is required");
        else if (!this.description)
            throw new BadRequestException("'description' is required");
    }
}
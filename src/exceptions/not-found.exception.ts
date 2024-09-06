import { HttpStatus } from "@/util/http-status";

export class NotFoundException extends Error {
    readonly statusCode = HttpStatus.NOT_FOUND;

    constructor(message: string) {
        super(message);
    }
}
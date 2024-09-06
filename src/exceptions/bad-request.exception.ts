import { HttpStatus } from "@/util/http-status";

export class BadRequestException extends Error {
    readonly statusCode = HttpStatus.BAD_REQUEST;

    constructor(message: string) {
        super(message);
    }
}
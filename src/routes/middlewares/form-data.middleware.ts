import { IncomingMessage, ServerResponse } from "node:http";

export async function formDataMiddleware(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    res.setHeader("Content-Type", "multipart/form-data");
}
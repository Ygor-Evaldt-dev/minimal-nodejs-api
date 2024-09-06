import { IncomingMessage, ServerResponse } from "node:http";

export async function jsonMiddleware(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }

    const body = buffers.flat().toString();
    if (body)
        req.body = JSON.parse(body);

    res.setHeader("Content-Type", "application/json");
}
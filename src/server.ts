import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";

import { config } from "@/config";
import { jsonMiddleware } from "@/routes/middlewares/json.middleware";
import { extractQueryParams } from "./routes/util/extract-query-params";
import { HttpStatus } from "./util/http-status";

import { Router } from "@/routes/router";
import { formDataMiddleware } from "./routes/middlewares/form-data.middleware";

export class HttpServer {
    private readonly server: Server;

    constructor() {
        this.server = createServer(async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
            const { method, url } = req;
            const contentType = req.headers["content-type"];

            if (contentType?.includes("application/json")) {
                await jsonMiddleware(req, res);
            } else if (contentType?.includes("multipart/form-data")) {
                await formDataMiddleware(req, res);
            }

            const route = Router.routes.find(route => {
                return route.method === method && route.path.test(url!);
            });

            if (!route) return res.writeHead(HttpStatus.NOT_FOUND).end("rota não encontrada");

            const routeParams = url?.match(route.path);
            if (!routeParams)
                return res.writeHead(HttpStatus.INTERNAL_SERVER_ERROR).end();

            const { query, ...params } = routeParams.groups!;

            Object.assign(req, {
                query: extractQueryParams(query) ?? {},
                params
            });

            return route.exec(req, res);
        });
    }

    start() {
        const { port, baseUrl } = config;
        this.server.listen(port, () => console.log(`${baseUrl}:${port}`));
    }
}

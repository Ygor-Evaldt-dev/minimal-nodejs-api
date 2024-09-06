import { IncomingMessage, ServerResponse } from "http";
import { buildRoute } from "./util/build-route";

type Route = {
    method: "GET" | "POST" | "PUT" | "PATH" | "DELETE";
    path: RegExp;
    exec: (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void;
}

export class Router {
    static readonly routes: Route[] = [];

    static get(
        path: string,
        callback: (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void
    ) {
        this.routes.push({
            method: "GET",
            path: buildRoute(path),
            exec: callback
        });
    }

    static post(
        path: string,
        callback: (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void
    ) {
        this.routes.push({
            method: "POST",
            path: buildRoute(path),
            exec: callback
        });
    }

    static put(
        path: string,
        callback: (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void
    ) {
        this.routes.push({
            method: "PUT",
            path: buildRoute(path),
            exec: callback
        });
    }

    static delete(
        path: string,
        callback: (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void
    ) {
        this.routes.push({
            method: "DELETE",
            path: buildRoute(path),
            exec: callback
        });
    }
}
import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import { route } from "./helpers/RouteHandler";
import { sendJson } from "./helpers/sendJson";
import "./routes";
import findDynamicRoute from "./helpers/dynamicRoute";


const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";
    const methodMap = route.get(method)
    const handler = methodMap?.get(path);

    if (handler) {
        handler(req, res)
    }
    else if (findDynamicRoute(method, path)) {
        const matched = findDynamicRoute(method, path);
        console.log(matched);
        (req as any).params = matched?.params;
        matched?.handler(req, res);
    }
    else {
        const data = {
            success: false,
            message: "Route not found !!!",
            path,
        }
        sendJson(res, 404, data)
    }
})

server.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
})
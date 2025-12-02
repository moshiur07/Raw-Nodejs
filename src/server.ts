import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import { route } from "./helpers/RouteHandler";
import { sendJson } from "./helpers/sendJson";
import "./routes";



const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log("server is running...");

    // ! root

    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";
    const methodMap = route.get(method)
    const handler = methodMap?.get(path);

    if (handler) {
        handler(req, res)
    } else {
        const data = {
            success: false,
            message: "Route not found !!!",
            path,
        }
        sendJson(res, 404, data)
    }

    // ! user
    if (req.url == '/api/user' && req.method == "POST") {
        // const user = {
        //     id: 1,
        //     name: "David"
        // }
        // res.writeHead(200, { "content-type": "application/json" })
        // res.end(JSON.stringify(user))
        let body = "";
        // * listen for data chunk
        req.on("data", (chunk) => {
            body += chunk.toString()
        })
        req.on("end", () => {
            try {
                const parsedBody = JSON.parse(body)
                console.log(parsedBody);
                const stringify = JSON.stringify(parsedBody)
                console.log(stringify);
                res.end(stringify)
            } catch (err: any) {
                console.log(err?.message);
            }
        })
    }
})

server.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
})
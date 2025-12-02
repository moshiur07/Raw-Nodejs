import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";


const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log("server is running...");

    // ! root
    if (req.url == '/' && req.method == "GET") {
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({
            message: "Hello from raw node js with typescript...",
            path: req.url,
        }))
    }

    // ! health check
    if (req.url == '/api' && req.method == "GET") {
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({
            message: "Vibe Check",
            path: req.url,
        }))
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
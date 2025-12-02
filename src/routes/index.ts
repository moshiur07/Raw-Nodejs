import addRoutes from "../helpers/RouteHandler";
import { sendJson } from "../helpers/sendJson";

//! Root
addRoutes("GET", "/", (req, res) => {
    const data = {
        message: "Hello from raw node js with typescript...",
        path: req.url,
    }
    sendJson(res, 200, data);
})

// ! health check
addRoutes("GET", "/api", (req, res) => {
    sendJson(res, 200, {
        message: "Health Check",
        path: req.url,
    });
})

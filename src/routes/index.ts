import { readUser, writeUsers } from "../helpers/fileDB";
import parsedBody from "../helpers/parseBody";
import addRoutes from "../helpers/RouteHandler";
import { sendJson } from "../helpers/sendJson";

//! Root
addRoutes("GET", "/", (req, res) => {
    const data = {
        message: "Hello from space X raw node js with typescript...",
        path: req.url,
    }
    sendJson(res, 200, data);
})

// ! health check
addRoutes("GET", "/api", (req, res) => {
    sendJson(res, 200, {
        message: "Health Your Check please!!!!",
        path: req.url,
    });
})

// ! Api -> users

addRoutes("POST", "/api/users", async (req, res) => {
    const body = await parsedBody(req);
    const users = readUser();
    const newUser = {
        ...body
    }
    users.push(newUser);
    writeUsers(users);
    sendJson(res, 201, body);
})

// ! Dynamically update or PUT method

addRoutes("PUT", "api/users/:id", async (req, res) => {
    const { id } = (req as any).params;
    console.log(id);
    const body = await parsedBody(req)
    console.log(body);
    const readUsers = readUser()
    const index = readUsers.findIndex((user: any) => user.id == id)
    if (index == -1) sendJson(res, 404)

    readUsers[index] = {
        ...readUsers[index],
        ...body
    }
    writeUsers(readUsers);
    sendJson(res, 202)
})
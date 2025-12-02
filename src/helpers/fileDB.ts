import fs, { fstat } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "/src/data/users.json");

export const readUser = () => {
    const data = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(data);
}

export const writeUsers = (users: any) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
}


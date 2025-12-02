import { IncomingMessage } from "http";

const parsedBody = async (req: IncomingMessage): Promise<any> => {
    return new Promise((resolve, reject) => {
        let body = "";
        // * listen for data chunk
        req.on("data", (chunk) => {
            body += chunk.toString()
        })
        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {})
            } catch (err: any) {
                reject(err);
            }
        })
        req.on("error", reject)
    })
}
export default parsedBody;
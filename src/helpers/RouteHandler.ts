import { ServerResponse } from 'http';
import { IncomingMessage } from 'http';


type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void;

export const route: Map<string, Map<string, RouteHandler>> = new Map()

const addRoutes = (method: string, path: string, handler: RouteHandler) => {
    if (!route.has(method)) route.set(method, new Map())

    route.get(method)!.set(path, handler)
}

export default addRoutes;
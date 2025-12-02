import { route } from "./RouteHandler";

const findDynamicRoute = (method: string, url: string) => {
    const methodMap: any = route.get(method);
    if (!method) return null;
    for (const [routePath, handler] of methodMap?.entries()) {
        const routeParts = routePath.split("/");
        const urlPath = url.split("/")
        if (routeParts.length !== urlPath.length) continue;
        const params: any = {};
        let matched = true;
        for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i]?.startsWith(":")) {
                params[routeParts[i]?.substring(1)] = urlPath[i]
            } else if (routeParts[i] !== urlPath[i]) {
                matched = false;
                break;
            }
        }
        if (matched) return { handler, params }
    }
    return null
}
export default findDynamicRoute;
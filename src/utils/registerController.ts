import { Router } from "express";

export type RouteFactory = (router: Router) => void;

const registerController = (factory: RouteFactory) => () => {
    const router = Router();
    factory(router);
    return router;
}

export default registerController;
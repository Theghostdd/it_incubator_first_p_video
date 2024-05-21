import { Router, Response, Request } from 'express'

export const mainRouter = Router({});

mainRouter.get('/',async (req:Request, res: Response) => {
    return res.send("Hello, this is main page")
})
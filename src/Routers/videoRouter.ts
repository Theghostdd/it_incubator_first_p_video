import { Router, Response, Request } from 'express'

export const videoRouter = Router({});

videoRouter.get('/', async (req: Request, res: Response) => {
    return res.send("Hello, this is video page")
})
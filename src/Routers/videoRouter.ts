import { Router, Response, Request, NextFunction } from 'express'
import { videosCollection } from '../Collections/videosCollections'
import { ResponseVideoType } from "../utils/types"
import { validation, validationId } from '../Applications/validation';


export const videoRouter = Router({});



videoRouter.get('/:id?', 
    async (req: Request, res: Response, next: NextFunction) => { // If URI has params "ID" then middleware "validationId" starts
        if (req.params.id) { 
            validationId(req, res, next); 
        } else {
            next();
        }
    }, async (req: Request, res: Response) => { // Next logic
        let result;
        if (req.params.id) { // If URI has params "id" than start process looking for video whits id
            const idVideo = +req.params.id;
            result = await videosCollection.GetVideoById(idVideo);
        } else { // Else will get all videos
            result = await videosCollection.GetAllVideos();
        }
        return res.status(result.status).json(result.elements)
})

videoRouter.post('/', validation, async (req: Request, res: Response) => {
    const result = await videosCollection.CreateVideo(req.body)
    return res.status(result.status).json(result.elements);
})

videoRouter.delete('/:id', validationId, async (req: Request, res: Response) => {
    const result = await videosCollection.DeleteVideoById(+req.params.id)
    return res.sendStatus(result.status)
})

// videoRouter.put('/:id', validation, validationId, async (req: Request, res: Response) => {
//     const result = await videosCollection.UpdateVideoById(+req.params.id, req.body)
//     return res.sendStatus(result.status)
// })

videoRouter.put('/:id', validation, async (req: Request, res: Response) => {
    const result = await videosCollection.UpdateVideoById(+req.params.id, req.body)
    return res.sendStatus(result.status)
})


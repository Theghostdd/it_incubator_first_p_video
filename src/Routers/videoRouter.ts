import { Router, Response, Request } from 'express'
import { videosCollection } from '../Collections/videosCollections'
import { ResponseVideoType } from "../utils/types"
import { validation } from '../Applications/validation';


export const videoRouter = Router({});



videoRouter.get('/:id?', async (req: Request, res: Response) => {
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
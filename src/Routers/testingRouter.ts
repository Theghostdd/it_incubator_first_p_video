import { Request, Response, Router } from "express";
import { videosCollection } from "../Collections/videosCollections";
import { SETTINGS } from "../settings";

export const testingRouter = Router()

testingRouter.delete(SETTINGS.PATH_TESTING.TESTING_ALL_DATA, async (req: Request, res: Response) => {
    const result = await videosCollection.AllVideosDeleted()
    return res.sendStatus(result.status)
})
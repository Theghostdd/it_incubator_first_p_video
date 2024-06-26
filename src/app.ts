import express from 'express';
import cors from 'cors';
import { SETTINGS } from './settings';
import { videoRouter }  from './Routers/videoRouter';
import { mainRouter }  from './Routers/mainRouter';
import { testingRouter } from './Routers/testingRouter';

export const app = express();

app.use(express.json());
app.use(cors());

app.use('/', mainRouter);
app.use(SETTINGS.PATH.VIDEOS, videoRouter);
app.use(SETTINGS.PATH_TESTING.TESTING, testingRouter)

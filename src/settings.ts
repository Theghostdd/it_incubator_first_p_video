import { config } from 'dotenv'
config()

export const SETTINGS = {
    PORT: process.env.PORT || '3000',
    PATH: {
        VIDEOS: "/videos"
    },
    PATH_TESTING: {
        TESTING: "/testing",
        TESTING_ALL_DATA: "/all-data"
    }
}


import { VideoTypes, ResponseVideoType, ResponseVideosType } from "../utils/types"



const dbVideosInMemory: VideoTypes[] = [
    {
        id: 1,
        title: "First Video",
        author: "Mikhail Marchuk",
        canBeDownloaded: false,
        minAgeRestriction: 18,
        createdAt: "31.12.2023",
        publicationDate: "01.01.2024",
        availableResolutions: [
            "P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"
        ]
    }, 

    {
        id: 2,
        title: "Second Video",
        author: "Mikhail Marchuk",
        canBeDownloaded: false,
        minAgeRestriction: 18,
        createdAt: "31.12.2023",
        publicationDate: "01.01.2024",
        availableResolutions: [
            "P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"
        ]
    }, 
]

export const videosCollection = {

    async GetAllVideos (): Promise<ResponseVideosType> {

        try { // Cath errors 
            if (dbVideosInMemory.length > 0) { // If video`s array has over values 0 then sending all videos
                let response = {
                    status: 200,
                    message: "OK",
                    elements: dbVideosInMemory,
                    error: {
                        message: null
                    }
                }
                return response;
            } // Else sending error 404
    
            let response = {
                status: 404,
                message: "NOT FOUND",
                elements: null,
                error: {
                    message: "NOT FOUND"
                }
            }
            return response;

        } catch (e) { // If process has error
            let response = {
                status: 400,
                message: "BAD REQUEST",
                elements: null,
                error: {
                    message: "BAD REQUEST"
                }
            }
            return response;
        }
        
    },

    async GetVideoById (id: number): Promise<ResponseVideoType> {
        try { // Cath error
            const result = await dbVideosInMemory.find(v => v.id === id);
            if (result) { // If process found element than sending element
                const response = {
                    status: 200,
                        message: "OK",
                        elements: result,
                        error: {
                            message: null
                        }
                }
                return response;
            } // Else sending error 404
    
            const response = {
                status: 404,
                    message: "NOT FOUND",
                    elements: null,
                    error: {
                        message: "NOT FOUND"
                    }
            }
            return response;
        } catch (e) { // If process has error
            const response = {
                status: 400,
                    message: "BAD REQUEST",
                    elements: null,
                    error: {
                        message: "BAD REQUEST"
                    }
            }
            return response;
        } 
    },

    async CreateVideo (data: VideoTypes): Promise<ResponseVideoType> {
        try { // Cath error
            const currentDate = new Date(); // Create current date and time 
            const plusOneDayToCurrentDate = new Date(currentDate); // Clone current date and time 
            plusOneDayToCurrentDate.setDate(currentDate.getDate() + 1) // Plus one day to current date
            const createId = +new Date(); // Create the current date and change its type to a number for element`s id

            const element = {
                id: createId,
                title: data.title,
                author: data.author,
                canBeDownloaded: data.canBeDownloaded ? data.canBeDownloaded : false, // If canBeDownloaded has value else set default value "false"
                minAgeRestriction: data.minAgeRestriction ? data.minAgeRestriction : null, // If minAgeRestriction has value else set default value "null"
                createdAt: currentDate.toISOString(), // Change types to a format iso string
                publicationDate: plusOneDayToCurrentDate.toISOString(), // Change types to a format iso string
                availableResolutions: data.availableResolutions
            }

            const result = await dbVideosInMemory.push(element); // Push element in memory

            const response = {
                status: 201,
                    message: "OK",
                    elements: element,
                    error: {
                        message: null
                    }
            }
            return response;
        } catch (e) { // If process has error
            const response = {
                status: 400,
                    message: "Error",
                    elements: null,
                    error: {
                        message: "Error when creating a record"
                    }
            }
            return response;
        }  
    }

}
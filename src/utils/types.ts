/* 
*
*      Video values
*
*/
export type VideoTypes = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[]
}
/* 
*
*      Response type for Video
*
*/
export type ResponseVideosType = {
    status: number,
    message: string,
    elements: VideoTypes[] | null,
    error: {
        message: string | null,
    }
}
export type ResponseVideoType = {
    status: number,
    message: string,
    elements: VideoTypes | null,
    error: {
        message: string | null,
    }
}
/* 
*
*       Enum values for VideoQuality
*
*/
export enum VideoQualityEnum {
    P144 = "P144", 
    P240 = "P240", 
    P360 = "P360", 
    P480 = "P480",
    P720 = "P720", 
    P1080 = "P1080", 
    P1440 = "P1440", 
    P2160 = "P2160"
}
/* 
*
*       Tests
*
*/
export type expectVideoType = {
    status: number,
    checkValues?: VideoTypes | null
}

export type expectVideoErrorType = {
    status: number,
    checkValues: {
        errorsMessages: ErrorValidationType[]
    }
    
}

type ErrorValidationType = {
    field: string,
    message: string
}



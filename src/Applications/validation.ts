import { Request, Response, NextFunction } from "express";
import { VideoQualityEnum } from "../utils/types";

export const validation = (req: Request, res: Response, next: NextFunction) => {

    const data = req.body; // All body
    let errorsMessages: { message: string, field: string }[] = []; // Error`s array

    // Validation title
    if (!data.title) { // If title is empty
        errorsMessages.push({
            message: "Empty title",
            field: "title"
        })
    } else if (typeof data.title !== 'string') { // If title isn`t type string
        errorsMessages.push({
            message: "Fields title must be a string",
            field: "title"
        });
    } else if (data.title.trim().length < 1 || data.title.trim().length > 40) { // If title has over 40 symbol or less 1 symbol  
        errorsMessages.push({
            message: "The title should be between 1 character and 40 characters",
            field: "title"
        })
    } // If everything is ok then next 

    // Validation author
    if (!data.author) { // If author is empty
        errorsMessages.push({
            message: "Empty author",
            field: "author"
        })
    } else if (typeof data.author !== 'string') { // If author isn`t type string
        errorsMessages.push({
            message: "Fields author must be a string",
            field: "author"
        });
    } else if (data.author.trim().length < 1 || data.author.trim().length > 20) {
        errorsMessages.push({ // If author hav over 20 symbol or less 1 symbol
            message: "The author should be between 1 character and 20 characters",
            field: "author"
        })
    } // If everything is ok then next 

    // Validation quality
    if (!data.availableResolutions) { // If quality is empty
        errorsMessages.push({
            message: "Empty quality",
            field: "availableResolutions"
        })
    } else if (!Array.isArray(data.availableResolutions)){ // If quality isn`t array
        errorsMessages.push({
            message: "Field quality must be an Array",
            field: "availableResolutions"
        })
    } else { // Check values on array
        for (let i = 0; i < data.availableResolutions.length; i++) { // Start cycle
            const validationQuality = data.availableResolutions[i] in VideoQualityEnum;
            if (!validationQuality) { // If array has over 1 boolean types "false" then sending error 
                errorsMessages.push({
                    message: "Unacceptable video quality. Quality musts be P144, P240, P360, P480, P720, P1080, P1440, P2160",
                    field: "availableResolutions"
                })
                break; // Stop work 
            }            
        }
    } // If everything is ok then next 

    // Validation canBeDownloaded
    if (data.canBeDownloaded && typeof data.canBeDownloaded !== 'boolean') { // If canBeDownloaded doesn't have type boolean than sending error
        errorsMessages.push({
            message: "Field canBeDownloaded musts be boolean",
            field: "canBeDownloaded"
        })
    } // If everything is ok then next 

    // Validation minAgeRestriction
    if (data.minAgeRestriction && typeof data.minAgeRestriction !== 'number') { // If minAgeRestriction doesn`t have type number than sending error 
        errorsMessages.push({
            message: "Field minAgeRestriction musts be number",
            field: "minAgeRestriction"
        })
    } else if (data.minAgeRestriction && data.minAgeRestriction > 18 || data.minAgeRestriction < 1) { // If minAgeRestriction has value over 18 or less 1 than sending error 
        errorsMessages.push({
            message: "The minAgeRestriction should be between 1 character and 40 characters",
            field: "minAgeRestriction"
        })
    } // If everything is ok then next

    // Validation publicationDate
    if (data.publicationDate && !/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(data.publicationDate)) {
        errorsMessages.push({
            message: "Incorrect format date",
            field: "publicationDate"
        })
    }





    if (errorsMessages.length > 0) { // If error`s array has count over 0 than be error 
        return res.status(400).json({ errorsMessages });
    } // If everything is ok then next function

    next();
    return;
}

export const validationId = (req: Request, res: Response, next: NextFunction) => {
    const isNumber = /^\d+$/.test(req.params.id);
    if (isNumber) {
        next()
        return;
    }
    return res.status(400).json({
        errorsMessages: [
            {
                message: "ID musts be number type",
                fields: "id"
            }
        ]
    })
}



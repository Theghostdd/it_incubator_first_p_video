import { SETTINGS } from '../../src/settings'
import { expectVideoType, VideoTypes, expectVideoErrorType } from '../../src/utils/types'
import { CreateRecord, DellCreatedRecord, GetCreatedRecord, PutCreatedRecord, GetAllRecords, DellAllRecords} from './modules/modules'









describe (SETTINGS.PATH.VIDEOS, () => {

    const endpoint: string = SETTINGS.PATH.VIDEOS; // Endpoint to request
    const endpointToAllDell: string = `${SETTINGS.PATH_TESTING.TESTING}/${SETTINGS.PATH_TESTING.TESTING_ALL_DATA}`; // Endpoint to ALL Delete request
    let expectProcess: expectVideoType; // Inspections values
    let expectProcessError: expectVideoErrorType;
    let returningValue: VideoTypes; // Returned result after created element
    let elementID: number; // Id created element after created

    it('should delete all Records, status: 204', async () => {

        expectProcess = {
            status: 204, 
            checkValues: null
        }

        const dellAllRecords = await DellAllRecords(endpointToAllDell, expectProcess)
    })

    it('should create record, status: 201, and return created element', async () => { 

        const dataCreated = { // Data to create element 
            title: "Some Title",
            author: "Some author",
            availableResolutions: [
                "P144"
            ]
        };

        expectProcess = { // Writing inspections values for inspections
            status: 201,
            checkValues: {
                id: expect.any(Number),
                title: dataCreated.title,
                author: dataCreated.author,
                canBeDownloaded: expect.any(Boolean),
                minAgeRestriction: null,
                createdAt: expect.any(String),
                publicationDate: expect.any(String),
                availableResolutions: dataCreated.availableResolutions
            }
        };
        const createElement: VideoTypes = await CreateRecord(endpoint, dataCreated, expectProcess) // Start tests

        returningValue = {...createElement}; // Values created`s element for work with this element in future
        elementID = createElement.id; // Id created`s element for work with this element in future
    })

    it('should create second record, status: 201, and return created element', async () => { 

        const dataCreated = { // Data to create element 
            title: "Some Title2",
            author: "Some author2",
            availableResolutions: [
                "P144"
            ]
        };

        expectProcess = { // Writing inspections values for inspections
            status: 201,
            checkValues: {
                id: expect.any(Number),
                title: dataCreated.title,
                author: dataCreated.author,
                canBeDownloaded: expect.any(Boolean),
                minAgeRestriction: null,
                createdAt: expect.any(String),
                publicationDate: expect.any(String),
                availableResolutions: dataCreated.availableResolutions
            }
        };
        const createElement = await CreateRecord(endpoint, dataCreated, expectProcess) // Start tests

    })

    it('should get all record, status: 200', async () => {

        expectProcess = { // Writing inspections values for inspections
            ...expectProcess,
            status: 200,
        };
        const createElement = await GetAllRecords(endpoint, expectProcess) // Start tests
    })

    it('should get created record by created ID, status: 200', async () => {

        expectProcess = { // Writing inspections values for inspections
            status: 200, // Changing status
            checkValues: {
                ...returningValue // Values of the created element for comparison
            }
        };
        const getELement =  await GetCreatedRecord(endpoint, elementID, expectProcess) // Start tests for comparison result
    })

    it('should update record by ID, status: 204', async () => {

        const dataPutElement = { // Data to updating element
            title: "New Some Title",
            author: "New Some author",
            canBeDownloaded: true,
            availableResolutions: [
                "P144",
                "P240", 
                "P360",
                "P480",
                "P720", 
                "P1080", 
                "P1440", 
                "P2160"
            ]
        }

        
        expectProcess = { // Writing inspections values for inspections
            ...expectProcess, // Past element
            status: 204, // Changing status
            checkValues: { // Changing new values to updating element for comparison in next test
                ...returningValue,
                ...dataPutElement
            }
        };

        console.log(expectProcess)

        const putElement = await PutCreatedRecord(endpoint, elementID, dataPutElement, expectProcess) // Start tests
    })

    it('shouldn`t update record by ID, bad request - empty title, status 400', async () => {

        const dataPutElement = { // Data to updating element
            title: "",
            author: "New Some author",
            canBeDownloaded: true,
            availableResolutions: [
                "P144",
                "P240", 
                "P360",
                "P480",
                "P720", 
                "P1080", 
                "P1440", 
                "P2160"
            ]
        }
        expectProcessError = { 
            status: 400,
            checkValues: {
                errorsMessages: [
                    {
                        field: expect.any(String),
                        message: expect.any(String),
                    }
                ]
            }
        }
        const getELement =  await PutCreatedRecord(endpoint, elementID, dataPutElement, expectProcessError) // Start tests
    })

    it('shouldn`t update record by ID, bad request - bad availableResolutions, status 400', async () => {

        const dataPutElement = { // Data to updating element
            title: "New Some Title",
            author: "New Some author",
            canBeDownloaded: true,
            availableResolutions: [
                "P4",
                "P240", 
                "P360",
                "P480",
                "P720", 
                "P1080", 
                "P1440", 
                "P2160"
            ]
        }
        
        const getELement =  await PutCreatedRecord(endpoint, elementID, dataPutElement, expectProcessError) // Start tests
    })

    it('should get updated record by ID, status 200', async () => {

        expectProcess = { // Writing inspections values for inspections
            ...expectProcess,
            status: 200 // Changing status
        }
        const getELement =  await GetCreatedRecord(endpoint, elementID, expectProcess) // Start tests with new values after updating
    })

    it('should delete record by ID, status: 204',async () => {

        expectProcess = { // Writing inspections values for inspections
            ...expectProcess,
            status: 204
        }

        const dellElement = await DellCreatedRecord(endpoint, elementID, expectProcess) // Start tests
        
    })

    it('shouldn`t get deleted record by ID, status 404', async () => {

        expectProcess = { 
            status: 404, // Changing status
            checkValues: null // Delete data   
        }
        const getELement =  await GetCreatedRecord(endpoint, elementID, expectProcess) // Start tests
    })

    it('shouldn`t update record by ID, id not found, status 404', async () => {

        const dataPutElement = { // Data to updating element
            title: "New Some Title",
            author: "New Some author",
            canBeDownloaded: true,
            availableResolutions: [
                "P144",
                "P240", 
                "P360",
                "P480",
                "P720", 
                "P1080", 
                "P1440", 
                "P2160"
            ]
        }
        expectProcess = { 
            status: 404, // Changing status
            checkValues: null // Delete data   
        }
        const getELement =  await PutCreatedRecord(endpoint, elementID, dataPutElement, expectProcess) // Start tests
    })

    it('shouldn`t delete record by ID, id not found, status: 404',async () => {

        expectProcess = { // Writing inspections values for inspections
            ...expectProcess,
            status: 404
        }

        const dellElement = await DellCreatedRecord(endpoint, elementID, expectProcess) // Start tests
        
    })

    it('shouldn`t create record, bad request - empty title,  status: 400', async () => { 

        const dataCreated = { // Data to create element 
            title: "",
            author: "Some author",
            availableResolutions: [
                "P144"
            ]
        };

        expectProcessError = { 
            status: 400,
            checkValues: {
                errorsMessages: [
                    {
                        field: expect.any(String),
                        message: expect.any(String),
                    }
                ]
            }
        }
        const createElement: VideoTypes = await CreateRecord(endpoint, dataCreated, expectProcessError) // Start tests
    })

    it('shouldn`t create record, bad request - bad availableResolutions and empty title,  status: 400', async () => { 

        const dataCreated = { // Data to create element 
            title: "",
            author: "Some author",
            availableResolutions: [
                "P4"
            ]
        };

        expectProcessError = { 
            status: 400,
            checkValues: {
                errorsMessages: [
                    {
                        field: expect.any(String),
                        message: expect.any(String),
                    },
                    {
                        field: expect.any(String),
                        message: expect.any(String),
                    }
                ]
            }
        }
        const createElement: VideoTypes = await CreateRecord(endpoint, dataCreated, expectProcessError) // Start tests
    })

    it('should delete all Records, status: 204', async () => {

        expectProcess = {
            status: 204, 
            checkValues: null
        }

        const dellAllRecords = await DellAllRecords(endpointToAllDell, expectProcess)
    })

    it('should get null from all Records, status: 404', async () => {

        expectProcess = {
            status: 404, 
            checkValues: null
        }

        const getAllRecord = await GetAllRecords(endpoint, expectProcess)
    })
})
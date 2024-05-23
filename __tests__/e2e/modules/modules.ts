import request from "supertest"
import { app } from "../../../src/app"
import { expectVideoType, expectVideoErrorType } from '../../../src/utils/types'




export const getRequest = () => {
    return request(app)
}

export const CreateRecord = async (endpoint: string, data: any, expectProcess: expectVideoType | expectVideoErrorType) => {

    const result = await getRequest()
        .post(endpoint)
        .send(data)
        .expect(expectProcess.status)

    const response = result.body
    expect(response).toEqual(expectProcess.checkValues)
    return response 
}

export const GetCreatedRecord = async (endpoint: string, id: number, expectProcess: expectVideoType) => {

    const result = await getRequest()
        .get(`${endpoint}/${id}`)
        .expect(expectProcess.status)

    if (expectProcess.status === 200) {
        expect(result.body).toEqual(expectProcess.checkValues)
    }
    
    
}

export const GetAllRecords = async (endpoint: string, expectProcess: expectVideoType) => {

    const result = await getRequest()
        .get(endpoint)
        .expect(expectProcess.status)

    if (expectProcess.status === 200) {
        expect(result.body.length).toEqual(2)
    }
}

export const PutCreatedRecord = async (endpoint: string, id: number, data: any, expectProcess: expectVideoType | expectVideoErrorType) => {
    const result = await getRequest()
        .put(`${endpoint}/${id}`)
        .send(data)
        .expect(expectProcess.status)
}

export const DellCreatedRecord = async (endpoint: string, id: number, expectProcess: expectVideoType) => {
    const result = await getRequest()
        .delete(`${endpoint}/${id}`)
        .expect(expectProcess.status)
}

export const DellAllRecords = async (endpoint: string, expectProcess: expectVideoType) => {
    
    const result = await getRequest()
        .delete(endpoint)
        .expect(expectProcess.status)
}

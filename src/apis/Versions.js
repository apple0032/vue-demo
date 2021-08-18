import ApiConnector from './ApiConnector';
const utils = require('./utils')
// import store from '@/store'

export async function getRecordById(model, adminView){
    let api = process.env.VUE_APP_API_DOMAIN+`/v1/versions/trainingRecord/${model.recordId}/device/${model.deviceTypeId}`
    if(adminView){
        api = process.env.VUE_APP_API_DOMAIN+`/v1/versions/trainingRecord/${model.recordId}/device/${model.deviceTypeId}/admin`
    }
    
    let response = await ApiConnector.get(api)
    return response    
}

export async function getList(paginations = {}, options={}){
    let api = process.env.VUE_APP_API_DOMAIN+'/v1/versions'

    let params = utils.parsePaginationParams(paginations, options)

    try {
        let response = await ApiConnector.get(api, {params})
        return response
    } catch (error) {
       return error.response.data
    }
}

export async function createVersion(params){
    let api = process.env.VUE_APP_API_DOMAIN+'/v1/versions'

    try {
        let response = await ApiConnector.post(api, params)
        return response
    } catch (error) {
       return error.response.data
    }
}

export async function deleteVersion(id = 0){
    let api = process.env.VUE_APP_API_DOMAIN+`/v1/versions/${id}`

    try {
        let response = await ApiConnector.delete(api)
        return response
    } catch (error) {
       return error.response.data
    }
}
import ApiConnector from './ApiConnector';
// import store from '@/store'


export async function getRecordById(id = 0) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/record/${id}`

    try {
        let response = await ApiConnector.get(api)
        return response
    } catch (error) {
        return error.response.data
    }
}


export async function updateRecord(params) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/updateRecord`

    let response = await ApiConnector.put(api,params)
    return response
}


export async function createRecord(params) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/createRecord`

    let response = await ApiConnector.post(api,params)
    return response
}

export async function deleteRecord(recordID) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/deleteRecord/${recordID}`

    let response = await ApiConnector.delete(api)
    return response
}


export async function getDevices() {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/getDevices`

    try {
        let response = await ApiConnector.get(api)
        return response
    } catch (error) {
        return error.response.data
    }
}

export async function createDownload(params) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/recordDownload`

    let response = await ApiConnector.post(api,params)
    return response
}


export async function deleteScreenShot(imageID) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/deleteImage/${imageID}`

    let response = await ApiConnector.delete(api)
    return response
}

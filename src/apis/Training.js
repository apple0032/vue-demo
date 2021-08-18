import ApiConnector from './ApiConnector';
// const utils = require('./utils')
// import store from '@/store'

export async function getRecords() {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/training_records/admin`

    let response = await ApiConnector.get(api)
    return response
}
export async function getAllRecords() {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/training_records/?page=1&pageSize=500`

    let response = await ApiConnector.get(api)
    return response
}

export async function getRecordById(recordId = 0) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/training_records/${recordId}`

    let response = await ApiConnector.get(api)
    return response
}

export async function createRecord(formData) {
    let api = process.env.VUE_APP_API_DOMAIN + '/v1/training_records'

    let response = await ApiConnector.post(api, formData)
    return response
}

export async function updateRecord(id = 0, formData) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/training_records/${id}`

    let response = await ApiConnector.put(api, formData)
    return response
}

export async function deleteRecord(id = 0) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/training_records/${id}`

    let response = await ApiConnector.delete(api)
    return response
}
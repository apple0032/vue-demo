import ApiConnector from './ApiConnector';
// const utils = require('./utils')
// import store from '@/store'

export async function getRecordById(recordId = 0) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/user/${recordId}`

    let response = await ApiConnector.get(api)
    return response
}

export async function createRecord(formData) {
    let api = process.env.VUE_APP_API_DOMAIN + '/v1/user'

    let response = await ApiConnector.post(api, formData)
    return response
}

export async function getUserRecords() {
    let api = process.env.VUE_APP_API_DOMAIN + '/v1/user'
    try {
        let response = await ApiConnector.get(api)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export async function upload() {

}
import ApiConnector from './ApiConnector';
// const utils = require('./utils')
// import store from '@/store'

export async function download(model) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/downloads`

    let params = {
        training_record_id: model.trainingRecordId,
        device_id: model.deviceTypeId,
        user_device_id: model.userDeviceID,
        version_id: model.versionId
    }

    let response = await ApiConnector.post(api, params)
    return response
}

export async function getDownloads() {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/downloads`
    try {
        let response = await ApiConnector.get(api)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export async function getFilteredDownloads(filters) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/dashboard/filter`
    try {
        let response = await ApiConnector.post(api, filters)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export async function getDownloadSenariosList(trainingRecordId, deviceId, versionId) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/downloads/scenario/getList?device_id=${deviceId}&training_record_id=${trainingRecordId}&version_id=${versionId}`
    try {
        let response = await ApiConnector.get(api)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
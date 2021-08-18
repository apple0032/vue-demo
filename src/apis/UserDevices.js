import ApiConnector from './ApiConnector';
import store from '../store'
const utils = require('./utils')
// import store from '@/store'

export async function getAvailableDeviceListOfTraining(trainRecordId = 0){
    let api = process.env.VUE_APP_API_DOMAIN+`/v1/trainingRecord/${trainRecordId}/userDevices`

    try {
        let response = await ApiConnector.get(api)
        return response
    } catch (error) {
       return error.response.data
    }
}
export async function getList(){
    let api = process.env.VUE_APP_API_DOMAIN+`/v1/userDevices/${store.state.userInfo.id}`

    try {
        let response = await ApiConnector.get(api)
        return response
    } catch (error) {
       return error.response.data
    }
}

export async function addDevice(userId = 0, deviceId = 0, deviceName = ""){
    let api = process.env.VUE_APP_API_DOMAIN+`/v1/user_devices`
    if(userId == 0){
        userId = store.state.userInfo.id
    }

    let params = {
        active: 1,
        user_id: userId,
        device_id: deviceId,
        device_serial: deviceName
    }

    try {
        let response = await ApiConnector.post(api, params)
        return response
    } catch (error) {
       return error.response.data
    }
}
export async function updateDevice(userDeviceId, params){
    let api = process.env.VUE_APP_API_DOMAIN+`/v1/user_devices/${userDeviceId}`

    try {
        let response = await ApiConnector.put(api, params)
        return response
    } catch (error) {
       return error.response.data
    }
}

export async function getAuthCodeLog(deviceId = 0, trainingRecordId = 0, paginations = {}, options = {}){
    let api = process.env.VUE_APP_API_DOMAIN+`/v1/downloads/trainingRecord/${trainingRecordId}/userDevice/${deviceId}`

    let params = utils.parsePaginationParams(paginations, options)

    try {
        let response = await ApiConnector.get(api, {params})
        return response
    } catch (error) {
       return error.response.data
    }
}
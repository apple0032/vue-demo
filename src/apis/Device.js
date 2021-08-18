import ApiConnector from './ApiConnector';

export async function getDevices() {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/user_devices`
    try {
        let response = await ApiConnector.get(api)
        return response.data
    } catch (error) {
        return error.response.data
    }
}


export async function getDevicesV2() {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/getDevices`
    try {
        let response = await ApiConnector.get(api)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
import ApiConnector from './ApiConnector';
// const utils = require('./utils')
// import store from '@/store'

export async function getAllDeviceTypes(){
    let api = process.env.VUE_APP_API_DOMAIN+`/v1/devices`
    
    let response = await ApiConnector.get(api)
    return response    
}
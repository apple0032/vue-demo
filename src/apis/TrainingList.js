import ApiConnector from './ApiConnector';
const utils = require('./utils')
// import store from '@/store'

export async function getList(paginations = {}, options={}){
    let api = process.env.VUE_APP_API_DOMAIN+'/v1/training_records'

    let params = utils.parsePaginationParams(paginations, options)

    // try {
        let response = await ApiConnector.get(api, {params})
        return response
    // } catch (error) {
    //    return error.response.data
    // }
}


export async function getRecordsV2(paginations = {}, options={}) {
    let params = utils.parsePaginationParams(paginations, options)

    if (typeof ((JSON.stringify(params.device))) === 'undefined') {
        params.device = "ALL"
    } else {
        if( (params.device.length) === 0){
            params.device = "ZERO"
        }
    }

    //console.log(params);

    let api = process.env.VUE_APP_API_DOMAIN + `/v2/getRecords`
    try {
        let response = await ApiConnector.get(api, {params})
        return response.data
    } catch (error) {
        return error.response.data
    }
}
import ApiConnector from './ApiConnector';
import store from '../store'
const utils = require('./utils')
// import store from '@/store'

export async function getList(paginations = {}, options = {}) {
    let api = process.env.VUE_APP_API_DOMAIN + '/v1/user'

    let params = utils.parsePaginationParams(paginations, options)

    try {
        let response = await ApiConnector.get(api, {
            params
        })
        return response
    } catch (error) {
        return error.response.data
    }
}

export async function getRecordById(id = 0) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/user/${id}`

    try {
        let response = await ApiConnector.get(api)
        return response
    } catch (error) {
        return error.response.data
    }
}

export async function getUserDevices(userID = 0) {
    let queryID = userID
    if (queryID == 0) {
        queryID = store.state.userInfo.id
    }
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/userDevices/${queryID}`

    try {
        let response = await ApiConnector.get(api)
        return response
    } catch (error) {
        return error.response.data
    }
}

export async function createRecord(params) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/user`

    let response = await ApiConnector.post(api, params)
    return response
}

export async function updateRecord(id, params) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/user/${id}`

    let response = await ApiConnector.put(api, params)
    return response
}

export async function deleteRecord(id) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/user/${id}`

    let params = {
        active: 0
    }

    let response = await ApiConnector.put(api, params)
    return response
}

export async function checkIsForeignUser(username) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/user/isForeignUser/${username}`

    let response = await ApiConnector.get(api)
    return response
}

export async function verifyUserForRessetPassword(username, email, phone_number) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/user/verify`

    let response = await ApiConnector.post(api, {
        username,
        email,
        phone_number
    })
    return response
}

export async function updatePassword(id, params) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/user/${id}/updatePassword`

    let response = await ApiConnector.put(api, params)
    return response
}


//****** V2 API ******

export async function checkExistedUser(username) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/checkExistedUser`

    let response = await ApiConnector.post(api, {
        username
    })
    return response
}

export async function checkExistedEmail(email) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/checkExistedEmail`

    let response = await ApiConnector.post(api, {
        email
    })
    return response
}

export async function getV2UserInfoAPI(userID) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/user/${userID}`

    let response = await ApiConnector.get(api)
    return response
}



export async function createUser(params) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/createUser`

    let response = await ApiConnector.post(api,params)
    return response
}

export async function updateUser(params) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/updateUser`

    let response = await ApiConnector.put(api,params)
    return response
}

export async function sendResetPwdEmail(params) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/sendResetPwdEmail`

    let response = await ApiConnector.post(api, params)
    return response
}

export async function resetPassword(params) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/resetPassword`

    let response = await ApiConnector.post(api, params)
    return response
}


export async function getListv2(paginations = {}, options = {}, filterUserObj) {


    let api;
    //api = process.env.VUE_APP_API_DOMAIN + '/v2/getAllUsers';

    if(filterUserObj === "pending"){
        api = process.env.VUE_APP_API_DOMAIN + '/v2/getAllUsers?pending=1'
    } else {
        api = process.env.VUE_APP_API_DOMAIN + '/v2/getAllUsers'
    }


    let params = utils.parsePaginationParams(paginations, options)

    try {
        let response = await ApiConnector.get(api, {
            params
        })
        return response
    } catch (error) {
        return error.response.data
    }
}

export async function activateUser(params) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/activateUser`

    let response = await ApiConnector.put(api,params)
    return response
}


export async function deleteUser(userID) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/deleteUser/${userID}`

    let response = await ApiConnector.delete(api)
    return response
}


export async function approveUser(params) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/approveUser`

    let response = await ApiConnector.put(api,params)
    return response
}

export async function batchApproveUser(params) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/batchApproveUser`

    let response = await ApiConnector.put(api,params)
    return response
}

export async function rejectUser(params) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/rejectUser`

    let response = await ApiConnector.put(api,params)
    return response
}
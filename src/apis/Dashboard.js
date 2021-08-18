import ApiConnector from './ApiConnector';

export async function fetchDashboardData(filters) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/dashboard/filter`
    try {
        let response = await ApiConnector.post(api, {
            filters: filters
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export async function getTotalPlayCount() {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/dashboard/totalplaycount`
    try {
        let response = await ApiConnector.get(api)
        console.log(response)
        return response.data.totalPlayCount
    } catch (error) {
        return error.response.data
    }
}

export async function getFilteredTotalDevice(filters) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/dashboard/filterTotalDevice`
    try {
        let response = await ApiConnector.post(api, {
            filters: filters
        })
        return response.data[0]
    } catch (error) {
        return error.response.data
    }
}

export async function getFilteredTotalDownload(filters) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v1/dashboard/filterTotalDevice`
    try {
        let response = await ApiConnector.post(api, {
            filters: filters
        })
        return response.data[0]
    } catch (error) {
        return error.response.data
    }
}



export async function getKey(recordID) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/stat/getKeyByRecordCode/${recordID}`
    try {
        let response = await ApiConnector.get(api)
        return response.data
    } catch (error) {
        return error.response.data
    }
}


export async function getUserList() {

    let api = process.env.VUE_APP_API_DOMAIN + '/v2/getAllUsers?pending=0&isActive=1'

    try {
        let response = await ApiConnector.get(api)
        return response.data
    } catch (error) {
        return error.response.data
    }
}


export async function getDashboardData(params) {
    let api = process.env.VUE_APP_API_DOMAIN + `/v2/stat/dashboard`

    let response = await ApiConnector.post(api, params)
    return response
}
import ApiConnector from './ApiConnector';
// const utils = require('./utils')
// import store from '@/store'

export async function uploadFile(model){
    let api = process.env.VUE_APP_API_DOMAIN+`/v1/uploads`
    console.log("uploadFIleapi", model)

    let split = model.file.name.split('.')
    let ext = split.pop()
    let fileName = split.join()

    let formData = new FormData()
    formData.append("filename", fileName)
    formData.append("ext", ext) 
    formData.append("uploadfile", model.file)

    console.log("uploadFIleapi2", formData)
    
    let response = await ApiConnector.post(api, formData)
    return response    
}

export async function updateFile(id = 0, params){
    let api = process.env.VUE_APP_API_DOMAIN+`/v1/uploads/${id}`
    
    let response = await ApiConnector.put(api, params)
    return response
}
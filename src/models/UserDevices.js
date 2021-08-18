// import store from '@/store'
import BaseList from '@/models/BaseList'
import {
    getAvailableDeviceListOfTraining,
    getList,
    addDevice,
    updateDevice,
    getAuthCodeLog
} from '@/apis/UserDevices'
import _ from 'lodash'
// import {
//     uploadCadImage,
//     updateCadImage,
//     deleteCadImage
// } from '@/apis/cadImages'

class UserDevices extends BaseList{
    constructor(){
        super()
        this.lists = {}
        this.recordId = 0
        this.errors = {}
    }
    /**
     * Hack to have async constructor
     */
    static async create(trainRecordId){
      const model = new UserDevices
      await model.init(trainRecordId)
      return model
    }

    /**
     * All variable which require async can be assign here
     */
    async init(){
    }

    isNewRecord(){
        return this.id == 0
    }

    /**
     * Check if there are any errors, return Boolean
     */
    hasError(){
        return  !_.isEmpty(this.errors)
    }

    async getList(){
        try {
            let response = await getList(this.recordId)
            this.lists = response.data.data
        } catch(error){
            this.errors = error
            return false
        }
    }

    async getAvailableDeviceListOfTraining(){
        try {
            let response = await getAvailableDeviceListOfTraining(this.recordId)
            this.lists = response.data.data
        } catch(error){
            this.errors = error
            return false
        }
    }

    async addDevice(userID, deviceId, deviceName){
        try {
            await addDevice(userID, deviceId, deviceName)
            return true
        } catch(error){
            this.errors = error
            return false
        }
    }

    async getAuthCodeLog(){
        try {
            let response = await getAuthCodeLog(this.selectedUserDeviceId, this.trainingRecordId, this.pagination, this.options)
            this.authCodeLog = response.data.data
        } catch(error){
            this.errors = error
            return false
        }
    }

    async deleteDevice(id){
        let params = {
            active: 0
        }

        try {
            await updateDevice(id, params)
            return true
        } catch(error){
            this.errors = error
            return false
        }
        
    }
}

export default UserDevices
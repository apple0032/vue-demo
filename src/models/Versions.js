// import store from '@/store'
import {
    getList,
    getRecordById,
    createVersion,
    deleteVersion
} from '@/apis/Versions'
import _ from 'lodash'

class Versions{
    constructor(){
        this.lists = []

        this.recordId = 0
        this.deviceTypeId = 0

        this.errors = {}
    }
    /**
     * Hack to have async constructor
     */
    static async create(){
      const model = new Versions
      await model.init()
      return model
    }

    /**
     * All variable which require async can be assign here
     */
    async init(){
    //   await this.getList()
    }

    /**
     * Check if there are any errors, return Boolean
     */
    hasError(){
        return  !_.isEmpty(this.errors)
    }

    async getVersionByDeviceIdAndTrainingRecordId(adminView = false){
        this.lists = []
        try {
            let response = await getRecordById(this, adminView)
            this.lists = response.data.data
            this.latestRecord = this.lists[0]
        } catch(error){
            this.errors = error
            return false
        }
    }

    async getList(){
        try {
            let response = await getList()
            this.lists = response.data.data
        } catch(error){
            this.errors = error
            return false
        }
    }

    async createNewVersion(params){
        params.upload_type = 3
        params.active = 1
        try {
            let response = await createVersion(params)
            this.createdVersion = response.data.data
        } catch(error){
            this.errors = error
            return false
        }
    }
    async delete(versionId = 0){
        try {
            await deleteVersion(versionId)
            return true
        } catch(error){
            this.errors = error
            return false
        }
    }


}

export default Versions
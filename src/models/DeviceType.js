// import store from '@/store'

import {
    getAllDeviceTypes
} from '@/apis/DeviceType'
import _ from 'lodash'
// import {
//     uploadCadImage,
//     updateCadImage,
//     deleteCadImage
// } from '@/apis/cadImages'
// import _ from 'lodash'

class DeviceType{
    constructor(){
        this.id = 0
        this.formData = {}

        this.errors = {}
    }
    /**
     * Hack to have async constructor
     */
    static async create(){
      const model = new DeviceType
      await model.init()
      return model
    }

    /**
     * All variable which require async can be assign here
     */
    async init(){
      await this.getListing()
    }

    isNewRecord(){
        return this.id == 0
    }

    /**
     * Check if there are any errors, return Boolean
     */
    hasError(){
        return  !_.isEmpty(this._errors)
    }

    async getListing(){
        try {
            let response = await getAllDeviceTypes()
            this.list = response.data.data
        } catch(error){
            this.errors = error
            return false
        }
    }
}

export default DeviceType
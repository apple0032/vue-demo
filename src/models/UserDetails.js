// import store from '@/store'

import {
    getRecordById,
    createRecord
} from '@/apis/Training'
import _ from 'lodash'
// import {
//     uploadCadImage,
//     updateCadImage,
//     deleteCadImage
// } from '@/apis/cadImages'
// import _ from 'lodash'

class UserDetails{
    constructor(){
        this.id = 0
        this.details = {}
        this.formData = {}

        this.errors = {}
    }
    /**
     * Hack to have async constructor
     */
    static async create(){
      const model = new UserDetails
      await model.init()
      return model
    }

    /**
     * All variable which require async can be assign here
     */
    async init(){
    //   await this.getListing()
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

    async loadDetails(id = 0){
        try {
            let response = await getRecordById(id)
            this.details = response.data.data
        } catch(error){
            this.errors = error
            return false
        }
    }

    async create(){
        try {
            let response = await createRecord(this.formData)
            return response.data
        } catch(error){
            this.errors = error
            return false
        }
    }

    async update(){
    //   let response = await getList(this.paginationParms)
    }
}

export default UserDetails
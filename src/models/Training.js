// import store from '@/store'

import {
    getRecordById,
    createRecord,
    updateRecord,
    deleteRecord
} from '@/apis/Training'
import _ from 'lodash'

class Training{
    constructor(){
        this.id = 0
        this.formData = {
            trainingRecordNameEn: "",
            trainingRecordNameZh: "",
            description_en: "",
            description_zh: "",
            thumbnail:{url: ""}
        }

        this.errors = {}
    }
    /**
     * Hack to have async constructor
     */
    static async create(){
      const model = new Training
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
            this.id = id
            this.formData = response.data.data
        } catch(error){
            this.errors = error
            return false
        }
    }

    async create(){
        delete this.formData.thumbnail
        try {
            this.formData.training_record_name_en = this.formData.trainingRecordNameEn
            this.formData.training_record_name_zh = this.formData.trainingRecordNameZh
            this.formData.description_en = this.formData.descriptionEn
            this.formData.description_zh = this.formData.descriptionZh
            
            let response = await createRecord(this.formData)
            return response.data
        } catch(error){
            this.errors = error
            return false
        }
    }

    async update(){
        // delete this.formData.thumbnail
        let params = {
            training_record_name_en: this.formData.trainingRecordNameEn,
            training_record_name_zh: this.formData.trainingRecordNameZh,
            description_en: this.formData.descriptionEn,
            description_zh: this.formData.descriptionZh,
            active: 1
        }
        try {
            let response = await updateRecord(this.id, params)
            return response.data
        } catch(error){
            this.errors = error
            return false
        }
    }

    async delete(){
        try {
            await deleteRecord(this.id)
            return true
        } catch(error){
            this.errors = error
            return false
        }        
    }
}

export default Training
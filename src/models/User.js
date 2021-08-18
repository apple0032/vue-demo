// import store from '@/store'

import {
    getRecordById,
    getUserDevices,
    createRecord,
    updateRecord,
    deleteRecord,
    getV2UserInfoAPI
} from '@/apis/User'
import _ from 'lodash'
const { forEach } = require('p-iteration');

class User{
    constructor(){
        this.id = 0

        this.formData = {
            extraDetails:{},
            trainingRecordNameEn: "",
            trainingRecordNameZh: "",
            description_en: "",
            description_zh: "",
            thumbnail:{url: ""}
        }

        this.canUpdatePassword = false

        this.errors = {}
    }
    /**
     * Hack to have async constructor
     */
    static async create(){
      const model = new User
      await model.init()
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
        return  !_.isEmpty(this._errors)
    }

    async loadDetails(id = 0){
        try {
            let response = await getRecordById(id)
            this.id = id
            this.formData = response.data
            this.canUpdatePassword = this.formData.syncFromOtherVendor == 0 ? true : false
            this.formData.name_hk = this.formData.nameHk
            this.formData.name_en = this.formData.nameEn
        } catch(error){
            this.errors = error
            return false
        }
    }


    async loadV2Details(id = 0){
        try {
            let response = await getV2UserInfoAPI(id)
            //console.log(response);

            this.id = id
            this.formData = response.data.result
            this.role = response.data.result.policy
            this.userInfo =  this.formData.user_info

            this.userID = this.formData.id

            if( this.role.v1 === "SuperAdmin"){
                this.formData.userType = "CIC User";
            } else {
                if (this.userInfo.is_contractor_user === 1) {
                    this.formData.userType = "Contractor User";
                } else {
                    this.formData.userType = "General User";
                }
            }

            this.formData.user_info.completion_date = this.formData.user_info.completion_date.replace("T00:00:00.000Z", "");

            console.log(this.formData);

        } catch(error){
            this.errors = error
            return false
        }
    }


    async getUserDevices(){
        try {
            let response = await getUserDevices(this.id)
            this.userDevices = response.data
        } catch(error){
            this.errors = error
            return false
        }
    }

    async getNestedDeviceByType(){
        if(_.isEmpty(this.userDevices)){
            return {}
        }

        let data = {}
        let tmp_deviceIDName = ""

        await forEach(this.userDevices, (list) => {
            // define a key to group same device type
            tmp_deviceIDName = `device_${list["Device"]["id"]}`
            if(data[tmp_deviceIDName] === undefined){
                data[tmp_deviceIDName] = []
            }                
            data[tmp_deviceIDName]["deviceType"] = list["Device"]

            // add user device to device type
            if(data[tmp_deviceIDName]["userDevice"] === undefined){
                data[tmp_deviceIDName]["userDevice"] = []
            }
            data[tmp_deviceIDName]["userDevice"].push({
                id: list.id,
                deviceName: list.deviceSerial,
                // deviceNameZh: this.lists[i].deviceNameZh,
            })
        })

        return data
    }

    async create(){        
        let response = await createRecord(this.formData)
        return response.data
    }

    async update(){
        let response = await updateRecord(this.id, this.formData)
        return response.data
    }

    async updateLanguage(language){
        await updateRecord(this.id, {language})
        return true
    }

    async delete(){
        await deleteRecord(this.id)
        return true    
    }
}

export default User
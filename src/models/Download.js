// import store from '@/store'
import {
    download
} from '@/apis/Download'
import _ from 'lodash'

class Download{
    constructor(){
        this.lists = {}

        this.recordId = 0
        this.deviceTypeId = 0
        this.userDeviceID = 0
        this.versionId = 0
        this.downloadLink = ""
        this.authCode = ""

        this.errors = {}
    }
    /**
     * Hack to have async constructor
     */
    static async create(){
      const model = new Download
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
    
    async createDownloadRecord(){
        try {
            let response = await download(this)
            this.authCode = response.data.data.authenticationCode
        } catch(error){
            this.errors = error
            throw new Error(this.errors)
        }
    }
}

export default Download
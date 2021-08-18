import {
    uploadFile,
    updateFile
} from '@/apis/FileUploader'
import _ from 'lodash'
import Versions from './Versions'

class FileUploader{
    constructor(){
        this.id = 0
        this.recordId = 0
        this.fileId = 0
        this.file = null

        this.errors = {}
    }
    /**
     * Hack to have async constructor
     */
    static async create(){
      const model = new FileUploader
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

    setFile(file){
        this.file = file
    }

    hasFile(){
        if(this.file == null){
            this.errors = "Empty File"
            return false
        }
        return true
    }

    async uploadThumbnail(){
        if(!this.hasFile()){
            throw new Error("No File Need To Upload")
        }
        this.ref_type = 1
        return await this.upload()
    }

    async uploadScreenShots(){
        if(!this.hasFile()){
            throw new Error("No File Need To Upload")
        }
        this.ref_type = 2
        return await this.upload()
    }

    async uploadVRVersion(params){
        if(!this.hasFile()){
            throw new Error("No File Need To Upload")
        }
        
        //1. Create Version and get the id
        try {
            let versionModel = await Versions.create()
            await versionModel.createNewVersion(params)
            this.recordId = versionModel.createdVersion.id
        }catch(error){
            throw new Error(error)
        }
        //2. 

        this.ref_type = 3
        return await this.upload()
    }

    async upload(){
        console.log("upload", this.ref_type)
        try {
            // handle Initial Upload
            let response = await uploadFile(this)
            this.uploadedFile = response.data.data

            //Update the upload with ref_id
            this.fileId = this.uploadedFile.id
            let params = {
                ref_id: this.recordId,
                ref_type: this.ref_type,
                active: 1
            }
            response = await updateFile(this.fileId, params)
            console.log("uploadresponse", response.data.data)
            this.uploadedFile = response.data.data

            return true
        } catch(error){
            this.errors = error
            return false
        }
    }

    async delete(){
        try{
            let params = {
                active: 0
            }
            await updateFile(this.fileId, params)
            return true
        }catch(error){
            this.errors = error
            return false
        }
        
    }
}

export default FileUploader
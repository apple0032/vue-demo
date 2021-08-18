<template>
    <v-container
        :key="recordId"
        class="details-container"
        fluid>
        <loading 
            :active.sync="isLoading"
            :is-full-page="true" 
            :z-index="100"
        />
        <BackButton 
            title="Back"
            @back-action="backAction"
        />
        <v-form v-if="!isLoading">
            <v-row>
                <v-col class="py-0">
                    <div class="page-title text-left">{{titleTranslation("page-title")}}</div>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="py-2">
                    <div class="subtitle text-left">{{$t("trainingDetails.thumbnail")}}</div>
                    <div class="thumbnail-container">
                        <v-img
                            max-width="230"
                            v-if="thumbnail.url !== '' && !isLoading"
                            :src="model.formData.thumbnail.url"
                        >
                        </v-img>
                        <image-uploader
                            :key="reload.thumbnail"
                            :preview="true"
                            :className="['fileinput', { 'fileinput--loaded': thumbnail.hasImage }]"
                            capture="environment"
                            :maxWidth="230"
                            :maxHeight="190"
                            :debug="1"
                            doNotResize="gif"
                            outputFormat="file"
                            @input="setThumbnail"
                            style="padding-top:5px"
                        ></image-uploader>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <div class="subtitle text-left">{{titleTranslation("record-title-en")}}</div>
                    <input
                        class="text-field float-left"
                        :placeholder="placeholder.title"
                        v-model="model.formData.trainingRecordNameEn"
                    />
                </v-col>
                <v-col>
                    <div class="subtitle text-left">{{titleTranslation("record-title-zh")}}</div>
                    <input
                        class="text-field float-left"
                        :placeholder="placeholder.title"
                        v-model="model.formData.trainingRecordNameZh"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <div class="subtitle text-left">{{titleTranslation("record-description-en")}}</div>
                    <textarea
                        class="text-field text-area float-left"
                        :placeholder="placeholder.description"
                        v-model="model.formData.descriptionEn"
                    />
                </v-col>
                <v-col>
                    <div class="subtitle text-left">{{titleTranslation("record-description-zh")}}</div>
                    <textarea
                        class="text-field text-area float-left"
                        :placeholder="placeholder.description"
                        v-model="model.formData.descriptionZh"
                    />
                </v-col>
            </v-row>
            <div v-if="isNewRecord">
                <v-row>
                    <v-col>
                        <div>
                            <div class="no-user-device">
                                <p>{{$t("trainingDetails.createRecordBeforeUpload")}}</p>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <div v-else>
                <v-row >
                    <v-col>
                        <div class="subtitle text-left">{{$t("trainingDetails.screenshots")}}</div>
                        <Gallery
                            :images="screenshot"
                            :trainingRecordId="recordId"
                            v-on:update-screenshots="updateScreenShots"
                        />
                    </v-col>
                </v-row>
                <v-row >
                    <v-col>
                        <div class="subtitle text-left">{{titleTranslation("record-create-version")}}</div>
                        <DevicesType
                            v-on:select-device="selectDevice"
                        />
                    </v-col>
                </v-row>
                <v-row >
                    <v-col>
                        <div class="subtitle text-left">{{titleTranslation("record-upload-version")}}</div>
                        <UploadVersion
                            :selectedDeivceID="selectedDevice.deviceTypeId"
                            :deviceVersionCount="versionCount"
                            :trainingRecordId="recordId"
                            v-on:done-upload="handleAfterUpload"
                        />
                    </v-col>
                </v-row>
            </div>
            <v-row>
                <v-col>
                    <VersionLog
                        v-if="!isNewRecord"
                        :trainingRecordId="recordId"
                        :deviceTypeId="selectedDevice.deviceTypeId"
                        :needReloadTable="reload.versionLog"
                        v-on:version-count="setVersionCount"
                        v-on:done-reload="handleAfterVersionLogReload"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col class="action-btn-container">
                    <div class="save-btn-container">
                        <v-btn
                            :loading="isSaving"
                            class="btn save-btn"
                            @click="submitForm"
                        ><v-icon>content-save</v-icon>{{$t("generic.btn.save")}}</v-btn>
                    </div>
                    <v-btn 
                        v-if="isNewRecord" 
                        class="btn cancel-btn"
                        @click="backAction()"
                    >{{$t("generic.btn.cancel")}}</v-btn>
                    <v-btn
                        v-else
                        @click="deleteConfirmDialog = true"
                        class="btn delete-btn"
                    >{{$t("generic.btn.delete")}}</v-btn>
                </v-col>
            </v-row>
        </v-form>
        <v-dialog 
            v-model="deleteConfirmDialog"
            :width="350"
        >
            <template>
                <div class="confirm-dialog-container">
                    <div class="confirm-dialog">
                        <div>{{$t("editTrainingDetails.confirmDeleteTraining")}}</div>
                        <div class="btn-group">
                            <v-btn @click="resetConfirmDelete">{{$t("generic.btn.cancel")}}</v-btn>
                            <v-btn color="error" @click="confirmDelete">{{$t("generic.btn.confirm")}}</v-btn>
                        </div>
                    </div>
                </div>
            </template>
        </v-dialog>
    </v-container>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import BackButton from '../components/BackButton'
import _ from 'lodash'
const { forEach } = require('p-iteration');
//import Uploader from "vux-uploader-component";
import ImageUploader from 'vue-image-upload-resize'

import DevicesType from '../components/CreateEditTraining/DevicesType'
import UploadVersion from '../components/CreateEditTraining/UploadVersion'
import VersionLog from '@/components/VersionLog'
import Gallery from '@/components/CreateEditTraining/Gallery'

import Training from '@/models/Training'
import FileUploader from '@/models/FileUploader'

export default {
    name: "CreateEditTraining",
    components:{
        Loading,
        BackButton,
        UploadVersion,
        DevicesType,
        ImageUploader,
        VersionLog,
        Gallery
    },
    async created(){
        this.isLoading = true
        await this.loadDetails()
        this.isLoading = false
    },
    computed:{},
    watch:{
        "$route.params.id": async function(){
            this.isNewRecord = this.$route.params.id == undefined ? true: false
        }
    },
    data(){
        return {
            model: {},
            fileList:[],
            recordId: 0,
            isNewRecord: this.$route.params.id == undefined ? true: false,
            isLoading: false,
            placeholder:{
                title: "Title of the record",
                description: ""
            },
            screenshot:[],
            newScreenShots:[],
            needDeleteScreenShots: [],
            thumbnail: {
                hasImage: false,
                file: null,
                url: ""
            },
            version:{
                datetime: "",
                name: "",
                remarks: "",
                file: null
            },
            versionCount: 0,
            selectedDevice:{
                index: -1,
                deviceTypeId: 0
            },
            reload:{
                thumbnail: 0,
                versionLog: false
            },
            reloadIndex: 0, // Hack to reload components
            isSaving: false,
            deleteConfirmDialog: false
        }
    },
    methods: {
        loadDetails: async function(){
            this.model = await Training.create()
            if(!this.isNewRecord){
                await this.model.loadDetails(this.$route.params.id)
                this.recordId = parseInt(this.model.id)
                if(_.has(this.model.formData, "thumbnail") && !_.isNull(this.model.formData.thumbnail) && this.model.formData.thumbnail.url !== ""){
                    this.thumbnail.url = this.model.formData.thumbnail.url
                }
                if(_.has(this.model.formData, "screenshot") && !_.isNull(this.model.formData.screenshot) && !_.isEmpty(this.model.formData.screenshot)){
                     this.screenshot = this.model.formData.screenshot
                }
            }
        },
        resetConfirmDelete(){
            this.deleteConfirmDialog = false
        },
        async confirmDelete(){
            let successDelete = await this.model.delete()
            if(!successDelete){
                this.$noty.error("Fail To Delete Training")
                return
            }
            this.$noty.success("Successful Delete Training")
            this.$router.push({name: 'trainings'})            

        },
        /*eslint no-unreachable: 0*/
        titleTranslation: function(type){
            switch(type){
                case "page-title":
                    return this.isNewRecord ? this.$t("trainingList.createTraining") : this.$t("trainingDetails.editRecord")
                    break;
                case "record-title-en":
                    return this.$t("editTrainingDetails.record","en")
                    break;
                case "record-title-zh":
                    return this.$t("editTrainingDetails.record", "zh")
                    break;
                case "record-description-en":
                    return this.$t("trainingDetails.description","en")
                    break;
                case "record-description-zh":
                    return this.$t("trainingDetails.description","zh")
                    break;
                case "record-create-version":
                    return this.$t("editTrainingDetails.addNewVersion")
                    break;
                case "record-upload-version":
                    return this.$t("editTrainingDetails.uploadVersion.title")
                    break;
                
                default:
                    return "!!"+type+"!!"
            }
        },
        backAction: function(){
            if(this.isNewRecord){
                this.$router.push({name: 'trainings'})
            } else {
                this.$router.push({name: 'training-detail', params: {id: this.recordId}})
            }
        },
        selectDevice: function(selectedDevice){
            this.selectedDevice = selectedDevice
        },
        setThumbnail: function(output){
            this.thumbnail.hasImage = true
            this.thumbnail.file = output
            this.thumbnail.url = ""
        },
        setVersionCount: function(count){
            this.versionCount = count
        },
        updateScreenShots: function(screenshot){
            this.needDeleteScreenShots = screenshot.needDeleteFileIds
            this.newScreenShots = screenshot.newFiles
        },
        handleUploadVersion: function(versionDetails){
            this.version = versionDetails
            console.log('handleUploadVersion', this.version)
        },
        submitForm: function(){
            if(this.model.isNewRecord()){
                this.handleCreateTraining()
            } else {
                this.handleUpdateTraining()
            }
        },
        handleCreateTraining: async function(){
            this.isLoading = true
            this.isSaving = true
            let result = await this.model.create()
            if(result){
                this.recordId = result.data.id
                await this.handleFileUpload()
                .then(async () => {
                    this.$router.push({
                        name: "edit-training",
                        params: {
                            id: result.data.id
                        }
                    })
                    await this.loadDetails()
                })
            } else {
                this.$noty.error("create training fail")
            }

            this.$noty.success(this.$t("trainingDetails.saved"))
            this.isSaving = false
            this.isLoading = false
        },
        handleUpdateTraining: async function(){
            this.isSaving = true
            try{
                await this.handleFileUpload()
                await this.model.update()
                await this.loadDetails()
            } catch(error){
                alert(error)
            }
            this.$noty.success(this.$t("trainingDetails.saved"))
            this.isSaving = false
        },
        handleFileUpload: async function(){
            let fileModel = await FileUploader.create()
            fileModel.recordId = this.recordId
            //1. Upload Thumbnail If Any
            if(!_.isNull(this.thumbnail.file)){
                console.log("Upload Thumbnail")
                fileModel.setFile(this.thumbnail.file)
                await fileModel.uploadThumbnail()
                this.thumbnail.hasImage = false
                this.thumbnail.file = null
                this.reload.thumbnail+=1
            }
            //2.1 Delete ScreenShots
            if(!_.isEmpty(this.needDeleteScreenShots)){
                console.log("=====Delete ScreenShots=====")
                await forEach(this.needDeleteScreenShots, async(fileId) => {
                    fileModel.fileId = fileId
                    await fileModel.delete()
                })

            }
            //2.2 Upload New ScreenShots
            if(!_.isEmpty(this.newScreenShots)){
                console.log("=====Upload New ScreenShots=====")
                await forEach(this.newScreenShots, async(file) => {
                    fileModel.setFile(file.file)
                    await fileModel.uploadScreenShots()
                })
            }

            //3. Upload VR Version
            if(!_.isNull(this.version.file)){
                console.log("Upload VR Version")
                fileModel = await FileUploader.create()
                fileModel.recordId = this.recordId
                fileModel.setFile(this.version.file)
                await fileModel.uploadFiles()
            }
            console.log("doneUpload")
        },
        handleAfterUpload: function(){
            this.reload.versionLog = true
        },
        handleAfterVersionLogReload: function(){
            this.reload.versionLog = false
        },
        confirmDeleteTraining: function(){

        }
    }
}
</script>
<style lang="sass">
.details-container
    height: 100%
    padding: 0 63px
    font-family: Avenir
    font-weight: 500
    font-stretch: normal
    font-style: normal
    line-height: normal
    letter-spacing: normal
    .thumbnail-container
        text-align: left
        padding-top: 5px
        .img-preview
            width: 230px
    .fileinput--loaded
        max-width: 230px
        display: block
    .page-title
        font-size: 28px
        font-weight: 300
    .subtitle
        opacity: 0.4
        font-size: 14px
        font-weight: 900
    .text-field
        width: 332px
        border: 1px solid #d0d0d0
        border-radius: 10px
        padding: 13px 20px
        margin-top: 5px
    .text-area
        width: 100%
        min-height: 150px
    .action-btn-container
        .save-btn-container
        .btn
            width:134px
            padding: 15px 0
            border-radius: 29px
            float: left
            margin-right: 30px
            font-size: 14px
            font-weight: 900
            &:hover
                cursor: pointer
        .save-btn
            color: white
            background-color: #9fcb3d !important
            border: 1px solid #7ed321
            vertical-align: middle
            &:hover
                background-color: #5e9c1a
        .cancel-btn
            padding: 15px 0
            border: 1px solid #ced1d2
            vertical-align: middle
            color: #324e4f
            &:hover
                background-color: #c3c3c3
                
        .delete-btn
            border: 1px solid #ced1d2
            vertical-align: middle
            &:hover
                background-color: #c3c3c3
            // &::before
            //     margin-right: 10px
            //     width: 24px
            //     height: 24px
                content: url('~@/assets/icon-delete.svg')
.confirm-dialog-container
    padding: 8px
    background-color: white
    .confirm-dialog
        min-height: 90px
        .btn-group
            margin-top: 20px
        .v-btn
            margin: 0 8px


</style>
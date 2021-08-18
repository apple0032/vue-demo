<template>
    <v-container 
        class="details-container"
        fluid>
        <loading 
            :active.sync="isLoading"
            :is-full-page="false"
            :z-index="100"
        />
        <v-row>
            <v-col cols="3">
                <BackButton
                    @back-action="backAction"
                />
            </v-col>
            <v-col cols="9" v-if="$store.getters.isAdmin">
                <div class="edit-record">
                    <router-link :to="editRecordLink">
                        <div class="edit-record-btn">{{$t("trainingDetails.editRecord")}}</div>
                    </router-link>
                </div>
            </v-col>
        </v-row>
        <div v-if="!isLoading">
            <v-row>
                <v-col cols="9">
                    <div style="display:flex;">
                        <v-img
                            max-width="230"
                            :src="thumbnail"
                        />
                        <div class="training-title">{{title}}<br><v-btn
                            rounded
                            style="margin-top:7px;"
                            class="download-btn"
                            href="#training_file"
                            >{{$t("trainingDetails.download")}}</v-btn>
                        </div>
                    </div>
                </v-col>
                <v-col cols="3">
                    <div class="training-update-date">{{$t("generic.lastUpdate")}}{{$displayDateTime(updateDate)}}</div>
                </v-col>
            </v-row>
            <hr />
            <v-row id='training_file'>
                <v-col>
                    <p class="training-description-title">{{$t("trainingDetails.description")}}</p>
                    <p class="training-description">{{description}}</p>
                </v-col>
            </v-row>
            <hr />
            <v-row>
                <v-col>
                    <div class="gallery-thumbnail-container">
                        <p class="training-description-title">{{$t("trainingDetails.screenshots")}}</p>
                        <div v-if="hasGallery" class="d-flex flex-wrap">
                            <v-card
                                class="px-2"
                                :key="i"
                                v-for="(image, i) in gallery" 
                            >
                                <img
                                class="gallery-thumbnail" 
                                :src="image" 
                                @click="gallerySelectedIndex = i" />
                            </v-card>
                            <vue-gallery-slideshow 
                                :images="gallery" 
                                :index="gallerySelectedIndex" 
                                @close="gallerySelectedIndex = null" 
                            />
                        </div>
                        <div v-else>
                            {{$t("trainingDetails.noScreenShots")}}
                        </div>
                    </div>
                </v-col>
            </v-row>
            <hr />
            <v-row>
                <v-col>
                    <p class="training-description-title">{{$t("trainingDetails.selectRegisteredDevice")}}</p>
                </v-col>
            </v-row>
                <UserDevicesComponent
                    v-if="doneInit"
                    :userDevices="userDevices"
                    v-on:select-device="selectDevice"
                />
                <DownloadVRVersion 
                    v-if="showDownloadBox"
                    :trainingRecordId="recordId"
                    :startDownloading="startDownloading"
                    :deviceTypeId="selectedDevice.deviceTypeId"
                    v-on:trigger-download="download"
                />
                <v-dialog
                    v-model="successGenerateDownload.modal"
                    width="600"
                >
                    <template>
                        <div class="auth-code-container">
                            <div>{{$t("trainingDetails.inputCodeDuringGameLaunch")}}</div>
                            <div class="auth-code">{{popupAuthCode}}</div>
                            <div>{{$t("trainingDetails.downloadBeginShortly")}}</div><br>
                            <v-btn @click="successGenerateDownload.modal = false">{{$t("generic.btn.close")}}</v-btn>
                        </div>
                    </template>
                </v-dialog>
            <hr />
            <v-row>
                <v-col cols="12">
                    <AuthCodeLog
                        :updateKey="refresh.authCode"
                        :trainingRecordId="recordId"
                        :selectedUserDeviceId="selectedDevice.userDeviceId"
                    />
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import _ from 'lodash'

import BackButton from '../components/BackButton'
import VueGallerySlideshow from 'vue-gallery-slideshow';

// Components
import UserDevicesComponent from '../components/TrainingDetails/UserDevices'
import DownloadVRVersion from '../components/TrainingDetails/DownloadVRVersion'
import AuthCodeLog from '@/components/TrainingDetails/AuthCodeLog'

// Model
import Training from '@/models/Training'
import UserDevices from '@/models/UserDevices'
import Download from '@/models/Download'

// import DropdownMenu from '@innologica/vue-dropdown-menu'
export default {
    name: "TrainingDetails",
    components:{
        Loading,
        BackButton,
        VueGallerySlideshow,
        UserDevicesComponent,
        DownloadVRVersion,
        AuthCodeLog
    },
    watch:{
        successGenerateDownload:{
            deep: true,
            handler(){
                if(this.successGenerateDownload.modal == false){
                    this.successGenerateDownload.authCode = "",
                    this.successGenerateDownload.downloadUrl = ""
                    this.refresh.authCode+=1
                }
            }
        },
        "$i18n.locale":function(){
            if(this.$i18n.locale == "zh"){
                this.title = this.model.formData.trainingRecordNameZh
                this.description = this.model.formData.descriptionZh
            } else {
                this.title = this.model.formData.trainingRecordNameEn
                this.description = this.model.formData.descriptionEn
            }
        }
    },
    async mounted(){
	this.isLoading = true
        this.model = await Training.create()
        this.recordId = parseInt(this.$route.params.id)
        await this.model.loadDetails(this.recordId)
        this.userDevicesModel = await UserDevices.create(this.recordId)
        this.userDevicesModel.recordId = this.recordId
        await this.userDevicesModel.getAvailableDeviceListOfTraining()
        this.userDevices = this.userDevicesModel.lists

        this.thumbnail = _.isNil(this.model.formData.thumbnail) ? "" : this.model.formData.thumbnail.url
        this.updateDate = this.model.formData.updatedAt
        this.title = this.model.formData.trainingRecordNameEn
        this.description = this.model.formData.descriptionEn
        if(this.$i18n.locale == "zh"){
            this.title = this.model.formData.trainingRecordNameZh
            this.description = this.model.formData.descriptionZh
        }
        if(this.model.formData.screenshot !== undefined){
            this.gallery = this.model.formData.screenshot.map((screenshot) => {return screenshot.url})
        }

        this.isLoading = false
        this.doneInit = true
    },
    computed:{
        showDownloadBox: function(){
            return !_.isEmpty(this.userDevices) && this.doneInit
        },
        editRecordLink: function(){
            return `/training/edit/${this.recordId}`
        },
        popupAuthCode: function(){
            let code = this.successGenerateDownload.authCode
            let middle = Math.floor(code.length / 2)
            let p1 = code.substring(0, middle)
            let p2 = code.substring(middle)

            return `${p1}-${p2}`
        },
        hasGallery: function(){
            return !_.isEmpty(this.gallery)
        }
    },
    data(){
        return {
            recordId: 0,
            doneInit: false,
            isLoading: false,
            thumbnail: "",
            title: "",
            updateDate: "",
            description: "",
            gallery: [],
            gallerySelectedIndex: null,
            userDevices:{},
            selectedDevice:{
                index: 0,
                deviceTypeId: 0
            },
            startDownloading: false,
            successGenerateDownload:{
                modal: false,
                authCode: "",
                downloadUrl: ""
            },
            refresh:{
                authCode: 0
            }
        }
    },
    methods:{
        backAction: function(){
            this.$router.push({name: 'trainings'})
        },
        selectDevice: function(selectedDevice){
            this.selectedDevice = selectedDevice
        },
        download: async function(data){
            this.startDownloading = true
            let downloadModel = await Download.create()
            downloadModel.trainingRecordId = this.recordId
            downloadModel.deviceTypeId = this.selectedDevice.deviceTypeId
            downloadModel.userDeviceID = this.selectedDevice.userDeviceId
            downloadModel.versionId = data.versionId
            downloadModel.downloadLink = data.downloadLink

            try{
                await downloadModel.createDownloadRecord()
                this.successGenerateDownload.modal = true
                this.successGenerateDownload.authCode = downloadModel.authCode
                this.successGenerateDownload.downloadUrl = downloadModel.downloadLink
                this.triggerDownloadFile()
                console.log("success download! AuthCode:", downloadModel.authCode)
            } catch(error){
                alert(error)
            }

            this.startDownloading = false
        },
        triggerDownloadFile: function(){
            window.open(this.successGenerateDownload.downloadUrl, '_blank');
        }
    }
}
</script>
<style>
.details-container{
    height: 100%;
    padding: 0 63px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
}
.training-title{
    font-size: 28px;
    font-weight: 300;
    color: #324e4f;
    text-align: left;
    margin-left: 21px;
}
/*.training-update-date::before{
    content: "Last Update: ";
}*/
.training-update-date{
    font-size: 14px;
    font-weight: 900;
    opacity: 0.4;
    color: #222222;
    text-align: right;
}
hr{
    opacity: 0.1;
    border: 0.5px solid #7ed321;
}
.training-description-title{
    opacity: 0.4;
    font-size: 14px;
    font-weight: 900;
    color: #222222;
    text-align: left;
}
.training-description{
    font-size: 16px;
    line-height: 1.38;
    color: #324e4f;
    text-align: left; 
    padding-bottom: 39px;
    white-space: pre-line;
}
.gallery-thumbnail{
    width: 168px;
    height: 105px;
    vertical-align: middle;
    top: 50%;
    position: relative;
    transform: translateY(-50%);
    object-fit: contain;
}
.edit-record{
  float: right;
}
.edit-record a{
  text-decoration: none;
}
.edit-record-btn{
    width: 150px;
    padding: 13px 18px;
    color: white;
    background-color: #9fcb3d;
    border-radius: 27px;
    font-weight: 900;
}
.edit-record-btn:hover{
  background-color: #5e9c1a;
}

.auth-code-container{
    background-color: white;
    padding: 70px;
    min-height: 400px;
}
.auth-code-container .auth-code{
    color: #9fcb3d;
    font-size: 40px;
    padding: 20px 0;
}
</style>

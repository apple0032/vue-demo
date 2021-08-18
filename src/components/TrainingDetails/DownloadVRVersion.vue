<template>
    <div class="download-vr-container vld-parent">
        <loading 
            :active.sync="isLoading"
            :height="30"
            :is-full-page="false" 
            :z-index="100"
        />
        <div v-if="!hasSelectedADevice">
            <div>{{$t("trainingDetails.selectDeviceFirst")}}</div>
        </div>
        <div v-else>
            <v-row v-if="doneloadingDownloadDetails">
                <v-col cols="8">
                    <div class="name">{{title}}</div>
                    <div class="last-modify float-left d-inline-block">{{$t("generic.lastUpdate")}} {{lastModify}}</div>
                    <div class="file-type">{{$t("trainingDetails.fileType")}} {{fileType}}</div>
                </v-col>
                <v-col cols="4">
                    <v-btn
                        rounded
                        class="download-btn"
                        :loading="startDownloading"
                        @click="download">{{$t("trainingDetails.download")}}</v-btn>
                </v-col>
            </v-row>
        </div>
    </div>
</template>
<script>
import Loading from 'vue-loading-overlay';
import Versions from '@/models/Versions'
export default {
    name: "DownloadVRVersion",
    components:{
        Loading
    },
    props:{
        deviceTypeId: {
            type: Number,
            default: 0
        },
        trainingRecordId: {
            type: Number,
            default: 0
        },
        defaultVersionId: Number,
        availableVersion: {
            type: Array,
            default: () => ([])
        },
        startDownloading: {
            type: Boolean,
            default: false
        }
    },
    computed:{
        hasSelectedADevice: function(){
            return this.deviceTypeId != 0 && this.doneloadingDownloadDetails
        }
    },
    watch:{
        deviceTypeId: async function(){
            console.log("versions", {
                deviceTypeId: this.deviceTypeId, 
                trainingRecordId: this.trainingRecordId
            })
            this.isLoading = true
            this.versionsModel.deviceTypeId = this.deviceTypeId
            this.versionsModel.recordId = this.trainingRecordId
            await this.versionsModel.getVersionByDeviceIdAndTrainingRecordId()

            this.selectedVersion = this.versionsModel.latestRecord
            this.doneloadingDownloadDetails = true

            this.isLoading = false
        },
        selectedVersion: function(){
            this.versionId = this.selectedVersion.id
            this.title = this.selectedVersion.versionNameEn
            this.lastModify = this.$displayDateTime(this.selectedVersion.updatedAt)
            this.fileType = this.selectedVersion.fileType
        }
    },
    async mounted(){
        this.versionsModel = await Versions.create()
    },
    data(){
        return{
            versionId: 0,
            isLoading: false,
            doneloadingDownloadDetails: false,
            selectedVersion: {},
            title: "",
            lastModify: "",
            fileType: "",
            canDownload: false
        }
    },
    methods:{
        download: async function(){
            this.$emit('trigger-download', {
                versionId: this.versionId,
                downloadLink: this.selectedVersion.Upload[0].url
            })
        }
    }
}
</script>
<style lang="sass" scoped>
.download-vr-container
    width: 578px
    padding: 21px
    border-radius: 10px
    box-shadow: 0 0 10px 0 #e8e8e8
    border: solid 1px #e9e9e9
    background-color: white
    margin-bottom: 16px
    color: #324e4f

    .name
        text-align: left
        font-size: 24px
        font-weight: 500

    .last-modify, .file-type
        font-size: 14px
        font-weight: 900
        color: #222222
        opacity: 0.4

    .download-btn
        width: 150px
        height: 50px
        font-size: 14px
        font-weight: 900
        padding: 16px 34px
        border-radius: 27px
        background-color: #9fcb3d !important
        border: 1px solid #7ed321
        color: white
        cursor: pointer
        box-shadow:none
        &:hover
            background-color: #5e9c1a !important
        &.disabled
            border: solid 1px rgba(151, 151, 151, 0.26) !important
            background-color: #efefef !important
            cursor: not-allowed !important


    

</style>
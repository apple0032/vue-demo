<template>
    <v-container
        class="package"
        fluid>
        <v-row>
            <v-col>
                <div class="date-time">
                    <div class="date">
                        <div class="subtitle text-left">{{$t("editTrainingDetails.uploadVersion.publishDateTime")}}</div>
                            <VueCtkDateTimePicker 
                                :disabled="reachMaxVersionCount"
                                v-model="version.datetime"
                                :format="dateTimePickerOption.format"
                                :formatted="dateTimePickerOption.formatted"
                                :minute-interval="dateTimePickerOption.minuteInterval"
                                input-size="lg"
                            ></VueCtkDateTimePicker>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div class="subtitle text-left">{{$t("editTrainingDetails.uploadVersion.versionName")}}</div>
                <input
                    class="text-field float-left"
                    :disabled="reachMaxVersionCount"
                    :placeholder="$t('editTrainingDetails.uploadVersion.placeholder.versionName')"
                    v-model="version.name"
                />
            </v-col>
            <v-col>
                <div class="subtitle text-left">{{$t("editTrainingDetails.uploadVersion.remarks")}}</div>
                <input
                    class="text-field float-left"
                    :disabled="reachMaxVersionCount"
                    :placeholder="$t('editTrainingDetails.uploadVersion.placeholder.remarks')"
                    v-model="version.remarks"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-left">
                <input
                    type="file" 
                    ref="vrfile"
                    :disabled="reachMaxVersionCount || selectedDeivceID == 0"
                    v-on:change="uploadFileChange()"
                    :accept="acceptedExtensions"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div v-if="reachMaxVersionCount">
                    {{$t("editTrainingDetails.uploadVersion.reachMaxVersion")}}
                </div>
                <div v-else-if="selectedDeivceID == 0">
                    {{$t("editTrainingDetails.uploadVersion.selectDeviceFirst")}}
                </div>
                <v-btn
                    v-else
                    :style="{
                        
                    }"
                    class="float-left upload"
                    :disabled="!canUpload"
                    type="button" 
                    @click="beginUploadVersion">
                    {{$t("editTrainingDetails.uploadVersion.upload")}}
                </v-btn>
            </v-col>
        </v-row>
        <v-dialog 
            v-model="uploading"
            :width="500"
            persistent
        >
            <template>
                <div class="upload-container">
                    <div class="upload-container-content">
                        <div v-if="uploading && !doneUploading">
                            <div>{{$t("editTrainingDetails.uploadVersion.uploading")}}</div>
                            <div>{{$t("editTrainingDetails.uploadVersion.uploadingWait")}}</div>
                        </div>
                        <div v-else>
                            <div>{{$t("editTrainingDetails.uploadVersion.doneUpload")}}</div>
                            <div>{{$t("editTrainingDetails.uploadVersion.closeWindow")}}</div>
                        </div>
                        <v-btn
                            :loading="uploading && !doneUploading"
                            :disabled="!doneUploading"
                            @click="closeUploadDialog()"
                        >{{$t("editTrainingDetails.uploadVersion.closeWindowButton")}}</v-btn>
                    </div>
                </div>
            </template>
        </v-dialog>
    </v-container>
</template>
<script>
// import _ from 'lodash'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import moment from 'moment-timezone'

import FileUploader from '@/models/FileUploader'

export default {
    name: "UploadVersion",
    components:{
        VueCtkDateTimePicker
    },
    props:{
        selectedDeivceID: Number,
        deviceVersionCount: {
            type: Number,
            default: 0
        },
        trainingRecordId: {
            type: Number,
            default: 0
        },
    },
    computed:{
        canUpload: function(){
            if(this.selectedDeivceID == 0){
                return false
            }
            if(this.version.file === null){
                return false
            }
            if(this.version.datetime == ""){
                return false
            }
            if(this.version.name == ""){
                return false
            }
            return true
        },
        hasSelectADevice: function(){
            console.log(this.$refs.vrfile.value)
            return this.selectedDeivceID > 0
        },
        reachMaxVersionCount: function(){
            return this.deviceVersionCount >= this.maxVersion
        }
    },
    watch:{},
    data(){
        return {
            maxVersion : 5,
            acceptedExtensions: this.$store.state.options.acceptedExtensions,
            version:{
                datetime: "",
                name: "",
                remarks: "",
                file: null
            },
            dateTimePickerOption:{
                format: "YYYY-MM-DD HH:mm",
                formatted: "YYYY-MM-DD HH:mm",
                minDate: moment().format('YYYY-MM-DD'),
                minuteInterval: "15"
            },
            placeholder:{
                name: "Type in Version Name",
                remarks: "Remarks of theversion",
            },
            uploading: false,
            doneUploading: false,
        }
    },
    methods:{
        titleTranslation: function(type){
            /*eslint no-unreachable: 0*/
            switch(type){
                case "version-publish-date":
                    return "Publish Date & Time"
                    break;
                case "version-publish-time":
                    return "Publish Time"
                    break;
                case "version-name":
                    return "Version Name"
                    break;
                case "version-remarks":
                    return "Remarks"
                    break;
                case "version-select-file":
                    return "Choose File"
                    break;
                case "version-upload":
                    return "Upload"
                    break;
                default:
                    return "!!"+type+"!!"
            }
        },
        uploadFileChange: function(){
            this.version.file = this.$refs.vrfile.files[0]
        },
        beginUploadVersion: async function(){
            this.uploading = true
            let fileModel = await FileUploader.create()
            fileModel.setFile(this.version.file)
            let params = {
                file_name: this.version.file.name.split('.')[0],
                file_type: this.version.file.name.split('.').pop(),
                version_name_en: this.version.name,
                version_name_zh: this.version.name,
                remarks: this.version.remarks,
                device_id: this.selectedDeivceID,
                training_record_id: this.trainingRecordId,
                publish_date: moment(this.version.datetime).format()
            }
            try{
                await fileModel.uploadVRVersion(params)
                this.version = {
                    datetime: "",
                    name: "",
                    remarks: "",
                    file: null
                }
                this.$emit("done-upload")
            }catch(error){
                alert(error)
            }
            this.doneUploading = true
        },
        closeUploadDialog: function(){
            this.$refs.vrfile.value = ''
            this.uploading = false
            this.doneUploading = false
        }
    }
}
</script>
<style lang="sass" scoped>
.package
    border-radius: 10px
    border: solid 1px #e9e9e9
    .file-uploads    
        padding: 8px 40px
        border-radius: 10px
        border: 1px solid #324e4f
        margin-right: 40px
        font-size: 17px
        font-weight: 900
        &::before
            width: 22px
            top: 4px
            position: relative
            content: url('~@/assets/icon-choose-file.svg')
    .upload
        color: white
        font-size: 17px
        font-weight: 900
        padding: 20px 40px
        border-radius: 30px
        border: 1px solid #7ed321
        background-color: #9fcb3d !important
.upload-container
    height: 500px
    background-color: white
    .upload-container-content
        position: relative
        top: 50%
        transform: translateY(-50%)


        
</style>
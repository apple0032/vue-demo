<style>
html{
  background: #F8FAF7;
}
</style>

<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <template>
          <v-form id="RecordForm" :lazy-validation="lazy">
            <v-card class="record-form-container mx-auto" max-width="1050" min-height="950" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="pageView-header">
                    <div class="d-inline">
                      <BackButton
                          title="Back"
                          @back-action="backAction"
                      />
                    </div>

                    <div class="record-edit-btn" v-if="$store.getters.isAdmin">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" @click="goEdit($route.params.id)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.51496 9.55311L5.3719 13.4101L14.05 4.73192C14.8488 3.93312 14.8488 2.63801 14.05 1.83922L13.0858 0.874979C12.287 0.076179 10.9919 0.076179 10.1931 0.874979L1.51496 9.55311ZM3.07829 14.8564C3.56536 14.8564 4.03452 14.6827 4.40293 14.3696L0.555457 10.5221C0.242326 10.8905 0.0686035 11.3596 0.0686035 11.8467V14.5155C0.0686035 14.7038 0.221234 14.8564 0.409513 14.8564H3.07829Z" fill="#9FCB3D"/>
                      </svg>
                      <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg" @click="openConfirmDeleteDialog" class="delete-record">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.08735 17.8314C3.0936 17.8314 2.24985 17.0439 2.17485 16.0502L1.34985 5.3252H12.8811L12.0561 16.0502C11.9811 17.0627 11.1561 17.8314 10.1436 17.8314H4.08735ZM9.5436 7.7252C9.26235 7.7252 9.0561 7.9502 9.0561 8.2127V14.9439C9.0561 15.2252 9.2811 15.4314 9.5436 15.4314C9.82485 15.4314 10.0311 15.2064 10.0311 14.9439V8.2127C10.0311 7.93145 9.8061 7.7252 9.5436 7.7252ZM6.63735 8.2127C6.63735 7.9502 6.8436 7.7252 7.12485 7.7252C7.38735 7.7252 7.61235 7.93145 7.61235 8.2127V14.9439C7.61235 15.2064 7.4061 15.4314 7.12485 15.4314C6.86235 15.4314 6.63735 15.2252 6.63735 14.9439V8.2127ZM4.72485 7.7252C4.4436 7.7252 4.23735 7.9502 4.23735 8.2127V14.9439C4.23735 15.2252 4.46235 15.4314 4.72485 15.4314C5.0061 15.4314 5.21235 15.2064 5.21235 14.9439V8.2127C5.21235 7.93145 4.98735 7.7252 4.72485 7.7252Z" fill="#9FCB3D"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.8999 2.4375H12.5437C13.4062 2.4375 14.0999 3.13125 14.0999 3.99375C14.0999 4.2 13.9312 4.36875 13.7249 4.36875H0.524902C0.318652 4.36875 0.149902 4.2 0.149902 3.99375C0.149902 3.13125 0.843652 2.4375 1.70615 2.4375H4.3499V1.85625C4.3499 0.825 5.19365 0 6.20615 0H8.04365C9.0749 0 9.8999 0.84375 9.8999 1.85625V2.4375ZM6.20615 1.4625C5.98115 1.4625 5.79365 1.65 5.79365 1.875V2.45625H8.45615V1.875C8.45615 1.65 8.26865 1.4625 8.04365 1.4625H6.20615Z" fill="#9FCB3D"/>
                      </svg>
                    </div>

                    <div class="d-inline">
                      <v-row no-gutters class="ViewRecord-header">
                        <v-col cols="12" sm="3">
                          <div v-if="(record_thumbnail != null)" class="record_thumbnail">
                            <div class="thumbnail_icon" :style="displayThumbnail(record_thumbnail)"></div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="record-title text-center">{{creationForm.record_title}}</div>
                          <div class="record-desc">
                            {{$t('records.contractor_company')}} : {{creationForm.contractor_company}}
                          </div>
                          <div class="record-desc">
                            {{$t('records.uploader')}} :
                            <div class="uploader_avatar" v-if="(uploader_avatar !== null)" >  <img :src="displayAvatar(uploader_avatar)">  </div>
                            <div class="uploader_avatar" v-else >  <img src="@/assets/default_avatar.png"> </div>
                            {{uploader}}
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3" class="last_update">
                          {{$t('records.lastUpdate')}} : {{$displayDateTime(creationForm.updated_at)}}
                          <div style="color: #c3c3c3; margin-top: 5px">Code : {{creationForm.code}}</div>
                        </v-col>
                      </v-row>
                    </div>

                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-container>
                <v-container class="form-container ViewDesc-container">
                  <v-row no-gutters>
                    <v-col cols="12" sm="12">
                      <div class="profile_header_value text-left">
                        <div class="viewDesc-title">{{$t('records.description')}}</div>
                        {{creationForm.description}}
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-container>

              <div class="record-view">
                <div class="screenshot-container">
                  <v-row class="screenshot-view" v-if="(isNewRecord === false)">
                    <v-col>
                      <div class="gallery-thumbnail-container">
                        <p class="training-description-title">{{$t("trainingDetails.screenshots")}}</p>
                        <div class="d-flex flex-wrap">
                          <v-card
                              class="px-2"
                              :key="i"
                              v-for="(image, i) in gallery"
                              style="box-shadow: none !important;"
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

                      </div>
                    </v-col>
                  </v-row>
                </div>
              </div>

              <div class="label-left">{{$t("records.vr_device")}}</div>
              <div class="devices-filter-container" v-if="(isNewRecord === false)">
                <v-select v-model="defaultSelected" :items="devices_list" item-value="id" item-text="device_name_en" :label="null" outlined @change="filterDevice" style="width: 250px"></v-select>
              </div>

              <div v-for="(document, index) in creationForm.devices" :key="'info-'+ index" class="document-each">
                <v-container :class="`devices-container-view`" v-if="(filterDev === document.name || document.new === true)">
                  <v-row no-gutters>
                    <v-col cols="12" md="8">
                      <div class="device-info-title">
                        {{document.version}}
                      </div>
                      <div class="device-info-detail">
                        {{$t('records.lastUpdate')}} : {{$displayDateTime(document.updated_at)}}
                      </div>
                    </v-col>
                    <v-col cols="12" md="4">
                      <div class="device-download-btn">
                        <div v-if=" ( (document.url !== 'undefined') && (document.url != null) )">
                          <a :href="document.url" target="_blank" @click="downloadFile">{{$t('records.download')}}</a>
                        </div>
                        <div v-if="document.ofile != null">
                          <a :href="`${fileUrl(document.ofile)}`" target="_blank" @click="downloadFile">{{$t('records.download')}}</a>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </div>


              <div class="vlog-container" v-if="(isNewRecord === false && filterDev !== '')">
                <div class="label-left" style="margin-left: 30px; font-size: 20px;">{{$t('records.versionLog')}}</div>
                <div class="vlog-table">
                  <div class="vlog-header">
                    <v-row no-gutters class="vlog-title">
                        <v-col cols="12" md="4" class="vlog-data">
                          {{$t('records.vlogDate')}}
                        </v-col>
                        <v-col cols="12" md="4" class="vlog-data">
                          {{$t('records.vlogVersion')}}
                        </v-col>
                        <v-col cols="12" md="4" class="vlog-data">
                          {{$t('records.vlogUpload')}}
                        </v-col>
                    </v-row>
                    <div v-for="(log, index) in versionLog" :key="'log-'+ index">
                      <v-row no-gutters class="each-log">
                        <v-col cols="12" md="4" class="vlog-data">
                          {{ $displayDateTime(log.created_at,"long") }}
                        </v-col>
                        <v-col cols="12" md="4" class="vlog-data">
                          {{ log.version }}
                        </v-col>
                        <v-col cols="12" md="4" class="vlog-data">

                          <div class="vlog_avatar" v-if="(log.user.user_info.user_avatar !== null)" :style="displayLogAvatar(log.user.user_info.user_avatar)"></div>
                          <div class="vlog_avatar default-avatar" v-else></div>

                          <span v-if="($i18n.locale === 'en')">
                            {{ log.user.user_info.contact_person_en }}
                          </span>
                          <span v-else>
                            {{ log.user.user_info.contact_person_zh }}
                          </span>
                        </v-col>
                      </v-row>
                    </div>
                  </div>
                </div>
              </div>





              <p class="login-error" v-if="errors.length">
                <b>{{$t('userCreate.submit_alert')}}</b>
              <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
              </p>


            </v-card>
          </v-form>
        </template>
      </v-col>
    </v-row>

    <v-dialog v-model="confirmDelete" :width="350">
      <template>
        <div class="confirm-dialog-container">
          <div class="confirm-dialog">
            <div>{{$t("records.confirmDeleteRecord")}}</div>
            <div class="btn-group">
              <v-btn @click="resetConfirmDelete">{{$t("generic.btn.cancel")}}</v-btn>
              <v-btn color="error" @click="confirmDeleteRecord">{{$t("generic.btn.confirm")}}</v-btn>
            </div>
          </div>
        </div>
      </template>
    </v-dialog>

  </v-container>


</template>

<script>

import BackButton from '../components/BackButton';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import {getRecordById, getDevices , deleteRecord, createDownload} from "@/apis/Record";
import moment from "moment";
import store from "@/store";
import axios from 'axios';
import VueGallerySlideshow from 'vue-gallery-slideshow';

export default {
  name: "creationForm",
  pwshow: false,
  props: {},
  components: {
    BackButton,
    VueGallerySlideshow
  },
  beforeMount() {
    if(this.$store.getters.isAdmin === false){
      //this.$router.push({name: 'Login'})
    }
  },
  data() {
    return {
      isNewRecord: this.$route.params.id == undefined ? true: false,
      rules: {
        name_min: (v) => v.length >= 4 || "Min 4 characters",
        required: (v) => !!v || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match",
        isEmail: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      },
      gallerySelectedIndex: null,
      gallery: [],
      versionLog : [],
      sourceVersionLog : [],
      validForm: true,
      lazy: false,
      creationForm: {
        record_title: "",
        publish_date: "",
        publish_hour: "",
        publish_min: "",
        contractor_company: "",
        description: "",
        devices : [
          { name : "" , new : true}
        ],
        devices_version : [
          { version : "" }
        ],
        devices_download : [
          { url : "" }
        ],
        screenshot : [],
        updated_at : "",
        code : ""
      },
      userId: null,
      loading: false,
      errors: [],
      hours: this.getHours(),
      minute : this.getMin(),
      devices_list : [],
      userID : this.$store.getters.userID,
      filterDev : "",
      defaultSelected : {
        id : 1,
        device_name_en : "Oculus Quest"
      },
      record_thumbnail : null,
      uploader : null,
      uploader_avatar : null,
      confirmDelete: false,
      record_code : null
    };
  },
  computed: {
    allowSelect()
    {
      if (this.isNewRecord == false)
        return true
      else
        return false
    }
  },
  async created(){

    console.log(this.isNewRecord);
    if(this.isNewRecord === false) {
      let record = await getRecordById(this.$route.params.id);
      console.log(record);
      if(record.data.response_code == 401){
        this.$noty.error("Record not found.");
        this.$router.push({name: 'trainings'})
      }

      this.creationForm.record_title = record.data.result.training_record_name_en
      this.creationForm.contractor_company = record.data.result.company_name_en
      this.creationForm.publish_date = record.data.result.publish_date
      let published = (record.data.result.publish_time).split(":")

      this.creationForm.publish_hour = (published[0])
      this.creationForm.publish_min = (published[1])
      this.creationForm.description =  record.data.result.description_en
      this.creationForm.updated_at = record.data.result.updated_at
      this.creationForm.code = record.data.result.code

      //this.creationForm.devices = record.data.result.records_devices
      if( ((record.data.result.records_devices).length) > 0 ){
        let dev = [];
        for (const rd of (record.data.result.records_devices) ) {
          dev.push({id: rd.id , name: rd.devices_id, version: rd.version , url : rd.url, ofile : rd.file , is_url : rd.device.is_url, updated_at : rd.updated_at})
        }
        this.creationForm.devices = dev
      }

      if( ((record.data.result.records_screenshots).length) > 0 ){
        let screenImg = [];
        for (const rs of (record.data.result.records_screenshots) ) {
          screenImg.push(this.fileUrl(rs.file))
        }
        //console.log(screenImg);
        this.gallery = screenImg;
        //this.record_thumbnail = screenImg[0];
      }

      if( ((record.data.result.thumbnail) != null ) ) {
        this.record_thumbnail = record.data.result.thumbnail;
      }

      if( ((record.data.result.records_versionlogs).length) > 0 ) {
        this.versionLog = record.data.result.records_versionlogs;
        this.sourceVersionLog = this.versionLog;
      }

      if( (record.data.result.user) != null ) {
        if(this.$i18n.locale === "en") {
          this.uploader = record.data.result.user.user_info.contact_person_en;
        } else {
          this.uploader = record.data.result.user.user_info.contact_person_zh;
        }

        this.uploader_avatar =  record.data.result.user.user_info.user_avatar;
      }

      this.record_code = record.data.result.code;
    }

    let devices = await getDevices();
    this.devices_list = devices.data.result;


    if(this.creationForm.devices.length > 0) {
      this.filterDevice(this.creationForm.devices[0]["name"])
      this.defaultSelected = {
        id : this.creationForm.devices[0]["name"]
      }
    }

  },
  methods: {
    async downloadFile(){
      let response = await createDownload({
        key : "download",
        record_code: this.record_code,
        user_id : this.$store.getters.userID,
        type : "download",
      });
      console.log(response);

      console.log("DOWNLOAD!");
    },
    displayAvatar : function (item){

      let host = process.env.VUE_APP_IMAGE_DOMAIN;
      
      //let host = backend.replace("api", "");
      let avatar = host+item;

      return avatar;
    },
    displayLogAvatar (url){
      let host = process.env.VUE_APP_IMAGE_DOMAIN;

      //let host = backend.replace("api", "");
      let avatar = host + url;

      return "background: url('"+avatar+"')";
    },
    goEdit(id){
      this.$router.push({name: 'edit-record', params: {id:id}})
    },
    openConfirmDeleteDialog(){
      this.confirmDelete = true;
    },
    resetConfirmDelete(){
      this.confirmDelete = false
    },
    async confirmDeleteRecord(){
      console.log(this.$route.params.id);
      await deleteRecord(this.$route.params.id);
      this.confirmDelete = false;

      this.$router.push({name: 'trainings'})
    },
    selectStatus(isNew) {
      if(isNew === true) {
        return true;
      } else {
        return false;
      }
    },
    fileUrl(filename){
      let host = process.env.VUE_APP_IMAGE_DOMAIN;
      
      //let host = backend.replace("api", "");

      return host+filename;
    },
    isNew(isNewRecord){
      if(isNewRecord == false){
        return "hide";
      }
      return "";
    },
    isUrl(is_url = 1,file = null){
      if(file == null) {
        if (is_url === 0) {
          return  " hide";
        }
      } else {
        if (is_url === 1) {
          return  " hide";
        }
      }
      return "";
    },
    selectDevice(rowId, selectedID){
      for (let i = 0; i < (this.devices_list).length; i++) {
        if(this.devices_list[i]["id"] === selectedID){
          var items  = document.getElementsByClassName("vr_url-"+rowId);
          var files  = document.getElementsByClassName("vr_file-"+rowId);
          if(this.devices_list[i]["is_url"] == 0){
            for(var j = 0; j < items.length; j++)
            {
              items[j].className += " hide";
              files[j].className = "col-sm-3 col-12 vr_file-"+rowId;
            }
          } else {
            for(var k = 0; k < items.length; k++)
            {
              items[k].className = "col-sm-3 col-12 vr_url-"+rowId;
              files[k].className += " hide";
            }
          }
        }
      }
    },
    filterDevice(id){
      //console.log(id);
      //console.log(this.versionLog);
      this.filterDev = id;
      let newVersionLog = [];
      (this.sourceVersionLog).forEach(function (v) {
        if(id === v.devices_id){
          newVersionLog.push(v);
        }
      });

      this.versionLog = newVersionLog;
    },
    getHours: function (){
      let arr = [];
      for (let i = 0; i < 24; i++) {
        arr.push( ('0' + i).slice(-2) );
      }
      return arr
    },
    getMin: function (){
      let arr = [];
      for (let i = 0; i < 60; i++) {
        arr.push( ('0' + i).slice(-2) );
      }
      return arr
    },
    backAction: function(){
        this.$router.push({name: 'BaseFrame'})
    },
    displayDateTime : function (mysqlDateTime, type = "short") {
      let time = moment(mysqlDateTime).format(store.state.options.displayDateFormat)
      if (type == "long") {
        time = moment(mysqlDateTime).format(store.state.options.displayFullDateTimeFormat)
      }
      return time
    },
    async confirmUpdateDevice(RecordDevice_id, index)
    {

      let recordID = this.$route.params.id;
      let device_id = ((this.creationForm.devices)[index]).name;
      let version = ((this.creationForm.devices)[index]).version;
      let url = ((this.creationForm.devices)[index]).url;
      let file = ((this.creationForm.devices)[index]).file;

      console.log(recordID);console.log(RecordDevice_id);console.log(device_id);console.log(version);console.log(url);console.log(file);

      var bodyFormData = new FormData();
      bodyFormData.append('recordID', recordID);
      bodyFormData.append('RecordDevice_id', RecordDevice_id);
      bodyFormData.append('device_id', device_id);
      bodyFormData.append('version', version);
      bodyFormData.append('url', url);
      bodyFormData.append('file', file)
      bodyFormData.append('userID', this.userID);

      await axios({
        method: "post",
        url: process.env.VUE_APP_API_DOMAIN+"/v2/updateRecordDevice",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (response) {
            console.log(response);
          });

      this.$router.go(this.$router.currentRoute);
      this.$noty.success(this.$t("records.updateRecordSuccess"));

    },
    displayThumbnail : function (item){

      let backend = process.env.VUE_APP_IMAGE_DOMAIN;
      let image = backend+item;

      return "background: url('"+image+"')";
      //return image;
    }
  },
};
</script>

<style scoped>
.pageView-header{
  text-align: left;
  padding-left: 40px;
}


.record-title {
  font-size: 31px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  padding: 0;
  display: inline-block;
}

#RecordForm .form-input-box {
  font-size: 28px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}


#RecordForm .v-text-field.v-text-field--enclosed , .form-input{
  margin: 0 40px;
}

.v-text-field--outlined.v-input--is-focused fieldset {
  border: 1px solid #d0d0d0;
}

.next-btn {
  font-size: 13px !important;
  color: white !important;
  width: 332px;
  background-color: #9fcb3d;
  border: 1px solid #7ed321;
  border-radius: 27px;
  padding: 16px !important;
  height: 54px !important;
  margin: 14px 200px 21px;
}


.v-card__actions {
  padding: 0 !important;
}

.login-error {
  text-align: left;
  width: 270px;
  margin: 0 auto;
  color: red;
  font-size: 12px;
}

.label-left{
  text-align: left;
  margin: 0 50px;
  font-weight: bold;
  margin-bottom: 10px;
}

.v-stepper__content{
  padding: 24px 50px 16px 50px;
}

.label-remark{
  float: right;
  font-weight: normal;
  color: gray;
}

.pa-2{
  border:none !important;
  box-shadow: none !important;
}

.form-container{
  padding :0;
  margin-top:20px;
}

</style>


<style scoped>
.year-month-selector, .year-month-selector{
  height: 50px !important;
}

.datetime-field .week-days{
  height: 10px !important;
  padding : 0 !important;
}

.datetime-field .flex-direction-column{
  min-width: 0 !important;
  width: 260px !important;
}

@media(max-width: 500px) {
  .label-remark{
    display: block;
    float: none !important;
  }
}

@media(max-width: 700px) {
  .next-btn{
    margin: 14px 150px 21px !important;
  }

  .v-text-field--enclosed{
    margin: 20px !important;
  }
}

.v-card__actions {
  padding: 0 !important;
  justify-content: center;
}

.form-input-box{
  padding-left: 5px !important;
  padding-right: 5px !important;
}


.datetimepicker .datepicker{
  bottom: auto !important;
}


#RecordForm .v-text-field input{
  padding: 24px 0;
}

.ViewDesc-container{
  padding: 20px 40px !important;
  margin-top: 0 !important;
  border-top: 0.5px solid #c7f19a;
}

.ViewDesc-container .label-left{
  margin: 0;
}


@media(max-width: 700px) {

  .label-left{
    margin: 0 25px !important;;
  }

  .desc-container{
    padding: 0 25px !important;
  }

  .devices-container-view{
    width: 80% !important;
  }

  .devices-container-view .v-input{
    width: 80% !important;
  }

  .record_thumbnail img{
    width: 100% !important;
    height: auto !important;
  }

  .pageView-header {
    padding-left: 5px !important;
  }

  .last_update{
    text-align: left !important;
    margin-top: 10px;
  }

  .ViewDesc-container{
    padding: 20px 10px !important;
  }

  .record-view .screenshot-view {
    padding: 0 10px !important;
  }

  .devices-container-view{
    margin: 0 30px !important;
    padding: 20px 0 20px 20px !important;
  }

  .device-download-btn{
    text-align: right;
    margin-right: 10px;
  }

  .vlog-container{
    margin: 20px 30px !important;
  }

  .record-view .screenshot-container{
    margin: 10px 10px 10px 12px !important;
  }

  .record-edit-btn{
    margin-right: 0 !important;
  }
}

#RecordForm .v-input__control{
  height: 45px;
}

.viewDesc-title{
  font-weight: bold;
}

.devices-container-view{
  margin: 20px 50px;
  padding: 20px 0 20px 50px;
  width: 50%;
  background: #FFFFFF;
  border: 1px solid #E9E9E9;
  box-shadow: 0px 0px 10px #E8E8E8;
  border-radius: 10px;
}

.devices-container-view .v-input{
  width: 100%;
  display: inline-block;
}

.add_package{
  text-align: left;
  padding-left: 45px;
}

.add_package button{
  border: 2px solid #9FCB3D;
  border-radius: 30px;
  width: 160px;
  height: 50px;
  color: #9FCB3D !important;
  padding: 25px 0 !important;
  font-weight: bold;
}


.hide{
  display:none;
}

.record-view .screenshot-container{
  border-top: 0.5px solid #c7f19a;
  border-bottom: 0.5px solid #c7f19a;
  margin: 10px 10px 10px 0;
}

.record-view .screenshot-view{
  padding: 0 45px;
}

.gallery-thumbnail{
  width: 85px;
  height: 100px;
  vertical-align: middle;
  top: 50%;
  position: relative;
  transform: translateY(-50%);
  object-fit: contain;
  cursor: pointer;
}

.vlog-container{
  padding-top: 20px;
  margin: 20px 50px;
  border-radius: 10px;
  border: 1px solid #E9E9E9;
  box-shadow: 0px 0px 10px #E8E8E8;
}

.vlog-table{
  margin: 30px 20px 20px 20px;
}

.vlog-header{
  color: #324E4F;
  font-weight: bold;
  font-size: 14px;
}

.each-log{
  border-top: 1px solid #d0d0d0;
  padding: 13px 0;
}

.devices-filter-container{
  padding: 0 10px;
  margin: 20px 0;
}

.v-file-input .v-text-field__slot{
  min-height: 60Px;
}

.record-edit-btn{
  display: inline-block;
  float: right;
  margin-right: 30px;
  margin-top: -30px;
  cursor: pointer;
}

.training-description-title{
  text-align: left;
  font-weight: bold;
}

.ViewRecord-header{
  margin-top: 20px;
}

.record_thumbnail img{
  width: 210px;
  height: 150px;
}

.record-desc{
  margin-top: 10px;
  color: #c3c3c3 !important;
  font-weight: bold;
  font-size: 14px;
}

.uploader_avatar{
  text-align: center;
  display: inline-block;
}

.uploader_avatar img{
  width: 20px;
  height: 20px;
  display: inline-block;
  border-radius: 50%;
  background-size: cover;
  margin-bottom: -7px;
}

.last_update{
  text-align: right;
  color: #c3c3c3 !important;
  font-size: 13px;
}

.device-info-title{
  text-align: left;
  font-weight: bold;
  font-size: 25px;
}

.device-info-detail{
  text-align: left;
  font-size: 13px;
  color : #c3c3c3 !important;
}

.device-download-btn{
  padding-top: 20px;
}

.device-download-btn a{
  color: white !important;
  background: #9FCB3D !important;
  border: 1.1px solid #9FCB3D;
  box-sizing: border-box;
  border-radius: 26.9134px;
  text-decoration: none;
  padding: 5px 10px;
}

.delete-record{
  margin-left: 10px;
}

.confirm-dialog-container{
  padding: 8px;
  background-color: white;
}
.confirm-dialog-container .confirm-dialog{
  min-height: 90px;
}
.confirm-dialog-container .confirm-dialog .btn-group{
  margin-top: 20px;
}
.confirm-dialog-container .confirm-dialog .v-btn{
  margin: 0 8px;
}

.record-form-container{
  margin-bottom: 100px;
  padding-bottom: 30px;
}

.thumbnail_icon{
  width: 210px;
  height: 150px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: -7px;

  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: contain !important;
}

.vlog-data{
  text-align: left;
  padding-left: 10px !important;
}

.vlog-title{
  margin-bottom: 20px;
}

.vlog_avatar{
  width: 20px;
  height: 20px;
  display: inline-block;
  border-radius: 50%;
  background-size: cover !important;
  margin-right: 10px;
  margin-bottom: -7px;
}

.default-avatar{
  background-image: url("~@/assets/default_avatar.png");
}

</style>
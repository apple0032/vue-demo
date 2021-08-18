<template>
  <div class="userView-container">
    <v-container 
        class="details-container"
        fluid>
        <loading 
          :active.sync="isLoading"
          :is-full-page="false" 
          :z-index="100"
        />
        <BackButton
          v-if="showBackButton"
          title="Back"
          @back-action="backAction"
        />
        <div v-if="!isLoading">

          <v-container class="form-container">
            <v-row no-gutters>
              <v-col cols="12" sm="4">
                <div class="user-profile-title text-left">{{$t("userDetails.editProfile")}}</div>
              </v-col>
              <v-col cols="12" sm="2">
                <div class="profile_header_title text-left">{{$t("userCreate.user_id")}}</div>
                <div class="profile_header_value text-left">{{model.formData.id}}</div>
              </v-col>
              <v-col cols="12" sm="3">
                <div class="profile_header_title text-left">{{$t("userCreate.user_type")}}</div>
                <div class="profile_header_value text-left">{{model.formData.userType}}</div>
              </v-col>
              <v-col cols="12" sm="3">
                <div class="profile_header_title text-left">{{$t("userCreate.auth_code")}}</div>
                <div class="profile_header_value text-left">{{model.formData.auth_code}}</div>
              </v-col>
            </v-row>
          </v-container>
          <br>

          <v-container class="form-container">
            <v-row no-gutters>
              <v-col cols="12" sm="6">
                <div class="viewForm_title text-center">{{$t("userCreate.avatar")}}</div>
                <div class="viewForm_value text-center avatar-img">
                  <div class="user_thumbnail" :style="displayThumbnail(user_avatar)" v-if="user_avatar != null"></div>
                  <div class="user_thumbnail default-avatar" v-else></div>
                </div>

                <div class="avatar-uploader">
                  <v-row no-gutters>
                    <v-col cols="12" sm="6">
                      <v-file-input :label="$t('user.newAvatar')" multiple accept="image/*" outlined v-model = "upload_avatar"></v-file-input>
                    </v-col>
                    <v-col cols="12" sm="3" class="upload-btn-container">
                      <v-btn text class="upload-btn" @click="uploadAvatar">{{$t('records.upload')}}</v-btn>
                    </v-col>
                  </v-row>
                </div>

              </v-col>
              <v-col cols="12" sm="6">
                <div class="viewForm_title text-left">{{$t("userCreate.name_en")}}</div>
                <div class="profile_header_value text-left">
                  <v-text-field  flat solo
                      class="text-left form-input-box" v-model="model.formData.user_info.contact_person_en"
                  ></v-text-field>
                </div>

                <div class="viewForm_title text-left">{{$t("userCreate.name_zh")}}</div>
                <div class="profile_header_value text-left">
                  <v-text-field  flat solo
                                 class="text-left form-input-box" v-model="model.formData.user_info.contact_person_zh"
                  ></v-text-field>
                </div>

                <div class="viewForm_title text-left">{{$t("userCreate.password")}}</div>
                <div class="profile_header_value text-left">
                  <v-btn @click="confirmReset()" class="btn reset-btn"><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.98244 6.5345C2.92688 6.69423 2.82271 6.77409 2.66994 6.77409H0.59702C0.506742 6.77409 0.428617 6.7411 0.362645 6.67513C0.296672 6.60916 0.263686 6.53103 0.263686 6.44075V6.36784C0.715075 4.50673 1.65258 2.99805 3.07619 1.8418C4.4998 0.685547 6.16646 0.107422 8.07619 0.107422C9.09007 0.107422 10.0762 0.30013 11.0345 0.685547C11.9929 1.07096 12.8435 1.61437 13.5866 2.31576L14.9408 0.972005C15.0727 0.840061 15.229 0.774089 15.4095 0.774089C15.5901 0.774089 15.7463 0.840061 15.8783 0.972005C16.0102 1.10395 16.0762 1.2602 16.0762 1.44076V6.10742C16.0762 6.28798 16.0102 6.44423 15.8783 6.57617C15.7463 6.70812 15.5901 6.77409 15.4095 6.77409H10.7429C10.5623 6.77409 10.406 6.70812 10.2741 6.57617C10.1422 6.44423 10.0762 6.28798 10.0762 6.10742C10.0762 5.92687 10.1422 5.77062 10.2741 5.63867L11.7116 4.20117C10.6838 3.24978 9.47202 2.77409 8.07619 2.77409C7.14563 2.77409 6.27758 2.99978 5.47202 3.45117C4.66646 3.90256 4.02063 4.52409 3.53452 5.31575C3.45813 5.43381 3.2741 5.84006 2.98244 6.5345ZM13.0137 14.3731C11.597 15.5293 9.93728 16.1074 8.0345 16.1074C7.02062 16.1074 6.03971 15.9165 5.0918 15.5345C4.14388 15.1526 3.29839 14.6074 2.55534 13.8991L1.21159 15.2428C1.07964 15.3748 0.923394 15.4408 0.742839 15.4408C0.562283 15.4408 0.406033 15.3748 0.274089 15.2428C0.142144 15.1109 0.0761719 14.9546 0.0761719 14.7741V10.1074C0.0761719 9.92687 0.142144 9.77062 0.274089 9.63868C0.406033 9.50673 0.562283 9.44076 0.742839 9.44076H5.4095C5.59006 9.44076 5.74631 9.50673 5.87825 9.63868C6.0102 9.77062 6.07617 9.92687 6.07617 10.1074C6.07617 10.288 6.0102 10.4442 5.87825 10.5762L4.45117 12.0033C4.94423 12.4616 5.50326 12.8158 6.12825 13.0658C6.75325 13.3158 7.40256 13.4408 8.07617 13.4408C9.00673 13.4408 9.87478 13.2151 10.6803 12.7637C11.4859 12.3123 12.1317 11.6908 12.6178 10.8991C12.6942 10.781 12.8783 10.3748 13.1699 9.68034C13.2255 9.52062 13.3296 9.44076 13.4824 9.44076H15.4824C15.5727 9.44076 15.6508 9.47375 15.7168 9.53972C15.7828 9.60569 15.8158 9.68382 15.8158 9.77409C15.8158 9.80882 15.8123 9.83312 15.8053 9.84701C15.3609 11.7081 14.4303 13.2168 13.0137 14.3731Z" fill="#666666"/>
                  </svg>
                     {{$t("user.reset")}}</v-btn>
                </div><br>

              </v-col>
            </v-row>
          </v-container>


          <v-container class="form-container">
            <v-row no-gutters>
              <v-col cols="12" sm="6">
                <div class="viewForm_title text-left">{{$t("userCreate.username")}}</div>
                <div class="profile_header_value text-left">
                  <v-text-field  flat solo disabled class="text-left form-input-box disabled-text" v-model="model.formData.username"></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="viewForm_title text-left">{{$t("userCreate.user_email_address")}}</div>
                <div class="profile_header_value text-left">
                  <v-text-field  flat solo class="text-left form-input-box" v-model="model.formData.user_info.user_email_address"></v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-container>

          <v-container class="form-container">
            <v-row no-gutters>
              <v-col cols="12" sm="6">
                <div class="viewForm_title text-left">{{$t("userCreate.contract_number")}}</div>
                <div class="profile_header_value text-left">
                  <v-text-field  flat solo class="text-left form-input-box" v-model="model.formData.user_info.contract_number"></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="viewForm_title text-left">{{$t("userCreate.contract_title")}}</div>
                <div class="profile_header_value text-left">
                  <v-text-field  flat solo class="text-left form-input-box" v-model="model.formData.user_info.contract_title"></v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-container>

          <v-container class="form-container">
            <v-row no-gutters>
              <v-col cols="12" sm="12">
                <div class="viewForm_title text-left">{{$t("userCreate.address")}}</div>
                <div class="profile_header_value text-left">
                  <v-text-field  flat solo class="text-left form-input-box" v-model="model.formData.user_info.address"></v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-container>

          <v-container class="form-container">
            <v-row no-gutters>
              <v-col cols="12" sm="6">
                <div class="viewForm_title text-left">{{$t("userCreate.expected_completion_date")}}</div>
                <div class="profile_header_value text-left">
                  <VueCtkDateTimePicker v-model="completion_date"
                                        :format="'YYYY-MM-DD'"
                                        :formatted="'YYYY-MM-DD'"
                                        :no-label="true"
                                        input-size="lg" only-date	autoClose noHeader noButtonNow></VueCtkDateTimePicker>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="viewForm_title text-left">{{$t("userCreate.contract_sum")}}</div>
                <div class="profile_header_value text-left">
                  <v-text-field  flat solo class="text-left form-input-box" v-model="model.formData.user_info.contract_sum"></v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-container>

          <v-container class="form-container">
            <v-row no-gutters>
              <v-col cols="12" sm="6">
                <div class="viewForm_title text-left">{{$t("userCreate.user_contact_number")}}</div>
                <div class="profile_header_value text-left">
                  <v-text-field  flat solo class="text-left form-input-box" v-model="model.formData.user_info.user_contact_number"></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="viewForm_title text-left">{{$t("userCreate.company_contact_number")}}</div>
                <div class="profile_header_value text-left">
                  <v-text-field  flat solo class="text-left form-input-box" v-model="model.formData.user_info.company_contact_number"></v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-container>


          <v-container class="form-container">
            <v-row no-gutters>
              <v-col cols="12" sm="12">
                <div class="viewForm_title text-left">
                  {{$t("userCreate.lists_of_documents")}}
                </div>
                <div class="profile_header_value text-left documents-box">

                    <div v-for="(document, index) in all_documents" :key="'info-'+ index" class="document-each">
                      <div class="doc_first_line">
                        {{$t("user.document")}} {{index+1}}
                        <span class="doc_link">
                          <a :href="document.url" target="_blank">
                            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 12C7.73478 12 7.48043 12.1054 7.29289 12.2929C7.10536 12.4804 7 12.7348 7 13V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V13C9 12.7348 8.89464 12.4804 8.70711 12.2929C8.51957 12.1054 8.26522 12 8 12ZM8.38 9.08C8.19898 8.99607 7.99698 8.9682 7.8 9L7.62 9.06L7.44 9.15L7.29 9.27C7.19489 9.3658 7.12016 9.47987 7.07032 9.60533C7.02048 9.73079 6.99656 9.86505 7 10C6.99924 10.1316 7.02446 10.2621 7.07423 10.3839C7.12399 10.5057 7.19732 10.6166 7.29 10.71C7.3851 10.801 7.49725 10.8724 7.62 10.92C7.73868 10.976 7.86882 11.0034 8 11C8.13161 11.0008 8.26207 10.9755 8.38391 10.9258C8.50574 10.876 8.61656 10.8027 8.71 10.71C8.80268 10.6166 8.87601 10.5057 8.92577 10.3839C8.97554 10.2621 9.00076 10.1316 9 10C9.00076 9.86839 8.97554 9.73793 8.92577 9.61609C8.87601 9.49426 8.80268 9.38344 8.71 9.29C8.6128 9.20167 8.50119 9.13064 8.38 9.08ZM16 6.94C15.9896 6.84813 15.9695 6.75763 15.94 6.67V6.58C15.8919 6.47718 15.8278 6.38267 15.75 6.3L9.75 0.3C9.66734 0.222216 9.57282 0.158081 9.47 0.11H9.37C9.27276 0.058003 9.16826 0.020922 9.06 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V7C16 7 16 7 16 6.94ZM10 3.41L12.59 6H11C10.7348 6 10.4804 5.89464 10.2929 5.70711C10.1054 5.51957 10 5.26522 10 5V3.41ZM14 17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H8V5C8 5.79565 8.31607 6.55871 8.87868 7.12132C9.44129 7.68393 10.2044 8 11 8H14V17Z" fill="#9FCB3D"/></svg>
                            Go to Link
                          </a>
                        </span>
                      </div>
                      <div class="doc_sec_line">
                        Note: {{ document.desc }}
                      </div>
                    </div>

                  <div v-for="(document2,index) in documents" :key="'info1-'+ index">
                    <v-row no-gutters>
                      <v-col cols="12" sm="6" style="padding-right: 20px">
                        <v-text-field v-model="document2.url" :label="$t('userCreate.document_url')" solo></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="document2.desc" :label="$t('userCreate.document_desc')" solo></v-text-field>
                      </v-col>
                    </v-row>
                  </div>

                  <div class="label-left-step2">
                    <v-btn @click="addDoc" class="add-btn">
                      +  {{$t('userCreate.add_url')}}
                    </v-btn>
                  </div>

                </div>
              </v-col>
            </v-row>
          </v-container>


          <v-container class="form-container">
            <v-row no-gutters>
              <v-col cols="12" sm="12">
                <div class="profile_header_value text-left">
                  <v-textarea v-model="model.formData.user_info.remarks" :label="$t('userCreate.remarks')"></v-textarea>
                </div>
              </v-col>
            </v-row>
          </v-container>


          <v-row>
              <v-col class="action-btn-container">
                  <div class="save-btn-container">
                      <v-btn
                          :loading="isSaving"
                          class="btn save-btn"
                          @click="submitForm"
                      ><v-icon class="mr-1">mdi-content-save</v-icon>{{$t("generic.btn.save")}}</v-btn>
                  </div>
                  <v-btn
                      class="btn cancel-btn"
                      @click="backAction()"
                  >{{$t("generic.btn.cancel")}}</v-btn>
                <!--
                  <v-btn
                      @click="confirmDelete()"
                      class="btn delete-btn"
                  >{{$t("generic.btn.delete")}}</v-btn>
                  -->
              </v-col>
          </v-row>

        </div>
    </v-container>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import BackButton from '../components/BackButton'

import User from '@/models/User'

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import moment from 'moment-timezone'
import {getV2UserInfoAPI, updateUser, checkExistedEmail, sendResetPwdEmail} from "@/apis/User";
import axios from "axios";

export default {
  name: 'UserView',
  components: {
    Loading,
    BackButton,
    VueCtkDateTimePicker
  },
  computed:{
    isAdmin: function(){
      return true
    },
    showBackButton: function(){
      return true
    }
  },
  watch:{
      "$route.params.id": async function(){
        this.$router.go(this.$router.currentRoute);
      }
  },
  async mounted(){

  },
  async created(){


    if( (this.$route.params.id == this.$store.getters.userInfo.id) || (this.$store.getters.isAdmin) ){
      // Is self profile or is admin
      //console.log(this.$store.getters.userInfo.v2Info.data.result.email);

      this.isLoading = true
      await this.loadDetails();

      //After load details
      this.isLoading = false

      //console.log(this.all_documents);

    } else {
      this.$noty.error("No permission.");
      this.$router.push({name: 'trainings'})
    }


  },
  data(){
    return {
      isSelf : true,
      canDelete: true,
      recordId: 0,
      isNewRecord: false,
      isSaving: false,
      isLoading: false,
      password: "",
      expected_completion_date: moment().format('YYYY-MM-DD'),
      expected_date_launch_ceremony: moment().format('YYYY-MM-DD HH:mm:ss'),
      completion_date: null,
      dateTimePickerOption:{
        dateOnly: "YYYY-MM-DD",
        dateOnlyFormatted: "YYYY-MM-DD",
        format: "YYYY-MM-DD HH:mm",
        formatted: "YYYY-MM-DD HH:mm",
        minDate: moment().format('YYYY-MM-DD'),
        minuteInterval: "15"
      },
      documents: [
        {url: ""}
      ],
      doc_description: [
        {desc: ""}
      ],
      all_documents : [],
      upload_avatar : null,
      user_avatar : null
    }
  },
  methods: {
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    backAction: function(){
      if((this.$store.getters.isAdmin) === true){
        this.$router.push({name: 'users'})
      } else {
        this.$router.push({name: 'trainings'})
      }
    },
    loadDetails: async function(){
      this.model = await User.create()
      //await this.model.loadDetails(this.$route.params.id)

      await this.model.loadV2Details(this.$route.params.id)

      //Assign db value into vue object.
      this.completion_date = this.model.formData.user_info.completion_date;
      this.all_documents = this.model.formData.user_docs;
      this.user_avatar = this.model.formData.user_info.user_avatar;

      if(this.user_avatar === null){
        this.user_avatar = null;
      }

      //console.log(this.user_avatar);

      this.recordId = parseInt(this.model.id)
    },
    addDoc()
    {
      this.documents.push({ url: '' });
      this.doc_description.push({ desc: '' });
    },
    submitForm: async function(){

      let canUpdate = true;
      let currentUser = await getV2UserInfoAPI( this.$route.params.id );
      let current_email = currentUser.data.result.user_info.user_email_address;

      if (this.validEmail(this.model.formData.user_info.user_email_address) === false) {
        this.$noty.error("Invalid email format.");
        canUpdate = false;
      }

      if(current_email != this.model.formData.user_info.user_email_address) {
        let response2 = await checkExistedEmail(this.model.formData.user_info.user_email_address);
        if (response2.data.result === "EXISTED") {
          this.$noty.error(this.$t("user.email_duplicate"));
          canUpdate = false;
        }
      }

      if(canUpdate === true) {
        this.model.formData.user_info.completion_date = this.completion_date;
        let documents = JSON.parse(JSON.stringify(this.documents));

        console.log(this.model.formData.user_info);
        //console.log(documents);

        let response = await updateUser({
          user_info: this.model.formData.user_info,
          documents: documents,
        });

        console.log(response);
        this.$noty.success(this.$t("generic.updateUserSuccess"));
      }

    },
    resetConfirmDelete: function(){
      this.deleteConfirmDialog = false
    },
    confirmReset: async function(){
      let currentUser = await getV2UserInfoAPI( this.$route.params.id );
      let current_email = currentUser.data.result.user_info.user_email_address;
      console.log(current_email);
      let res3 = await sendResetPwdEmail({ receiver : current_email , domain : process.env.VUE_APP_RESET_PW_DOMAIN});
      console.log(res3);
      if(res3.data.response_code === 200){
        this.$noty.success(this.$t("user.reset_email_sent"));
        //this.$auth.logout();
      }
    },
    uploadAvatar : async function (){
      console.log(this.upload_avatar);
      console.log(this.$route.params.id);

      if(this.upload_avatar === null || (this.upload_avatar).length === 0){
        this.$noty.error(this.$t("user.noAvatarFound"));
      } else {
        console.log("Ready to upload avatar.....");

        var bodyFormData = new FormData();
        bodyFormData.append('file', this.upload_avatar[0])
        bodyFormData.append('user_id', this.$route.params.id)
        let newAvatar = "";
        await axios({
          method: "post",
          url: process.env.VUE_APP_API_DOMAIN+"/v2/uploadAvatar",
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
          console.log(response);
          newAvatar = response.data.filename;
        })
        .catch(function (response) {
          console.log(response);
        });

        this.user_avatar =  newAvatar;
        this.$noty.success(this.$t("user.avatarUploaded"));
      }
    },
    displayThumbnail : function (item){

      let host = process.env.VUE_APP_IMAGE_DOMAIN;
      //let host = backend.replace("api", "");
      let avatar = host+item;

      return "background: url('"+avatar+"')";
    }
  }
}
</script>
<style lang="sass">
.details-container
    padding: 0 63px
    font-family: Avenir-Medium, Helvetica, Arial, sans-serif
    font-weight: 500
    font-stretch: normal
    font-style: normal
    line-height: normal
    letter-spacing: normal


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
            padding: 20px 0
            border: 1px solid #ced1d2
            vertical-align: middle
            &:hover
                background-color: #c3c3c3
                color: #5b5b5b
        .delete-btn
            border: 1px solid #ced1d2
            vertical-align: middle
            &:hover
                background-color: #c3c3c3


</style>


<style>
.form-container{
    margin: 0;
    max-width: 100%;
    padding: 0;
}

.user-profile-title {
  color: #324e4f;
  font-family: Avenir-Medium, Helvetica, Arial, sans-serif;
  font-size: 36px;
  font-weight: 100;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}

.profile_header_title{
  color: gray;
}

.profile_header_value{
  font-weight: bold;
  color: #324E4F;
  padding-right: 30px;
}

.viewForm_title{
  font-weight: bold;
  color: #324E4F;
  margin-bottom: 8px;
}

.details-container{
  padding : 30px 150px;
}


.details-container .v-text-field__slot{
  border: 1px solid #d0d0d0;
  border-radius: 10px;
  background-color: #f8f8f8;
  padding: 7px;
}

.details-container .disabled-text .v-text-field__slot{
  background-color: #dddddd;
}

.details-container .v-text-field input{
  font-size: 15px !important;
}

.details-container .v-input__slot{
  padding: 0 !important;
}

.details-container .v-text-field{
  padding:0;
}

.details-container .v-text-field input{
  padding: 24px 12px;
}

.avatar-img img{
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

@media(max-width: 700px) {
  .details-container{
    padding : 30px 20px;
  }
  .userView-container{
    margin: 0 !important;
  }

  .upload-btn-container{
    margin-bottom: 20px;
  }
}

.documents-box{
  margin-bottom: 50px;
  font-size: 15px;
}

.document-each {
  margin-bottom: 10px;
}

.doc_sec_line{
  color: gray;
}

.doc_link{
  margin-left: 20px;
}

.add-btn{
  border: 2px solid #9FCB3D;
  border-radius: 30px;
  width: 160px;
  height: 50px;
  color: #9FCB3D !important;
  padding: 25px 0 !important;
  font-weight: bold;
  box-shadow: none !important;
}

.documents-box .v-text-field__slot{
  border-radius: 0;
}

.documents-box .v-text-field__slot label{
  left: 15px !important;
}

.reset-btn{
  padding: 20px 0;
  border: 1px solid #ced1d2;
  vertical-align: middle;
}

.reset-btn svg {
  margin-right: 10px;
}

.content-container, body{
  background: #F8FAF7 !important;
}

.avatar-uploader{
  margin-top: 20px;
  zoom: 0.9;
}

.v-file-input__text{
  height: 40px !important;
}

.avatar-uploader .v-text-field--outlined fieldset{
    border : none !important;
}

.avatar-uploader .upload-btn {
  border: 2px solid #9FCB3D;
  border-radius: 30px;
  width: 160px;
  height: 50px;
  color: #9FCB3D !important;
  padding: 25px 0 !important;
  font-weight: bold;
}

.userView-container{
  box-shadow: 0px 0px 5px 2px rgb(146 158 193 / 20%);
  margin: 0 60px 230px 75px;
  background-color: #fcfcfd;
  border-radius: 10px;
}

.user_thumbnail{
  width: 150px;
  height: 150px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: -7px;
  border-radius: 68%;
  background-position: center !important;
  background-size: cover !important;
}

.default-avatar{
  background-image: url("~@/assets/default_avatar.png");
}
</style>
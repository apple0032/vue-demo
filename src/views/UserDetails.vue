<template>
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
          <v-row>
            <v-col>
              <div v-if="isNewRecord" class="user-profile-title text-left">{{$t("userDetails.createUser")}}</div>
              <div v-else class="user-profile-title text-left">{{$t("userDetails.editProfile")}}</div>
            </v-col>
          </v-row>
          <v-row>
            <!--v-col cols="3">
              <div class="user-profile-avatar-title field-title">Avatar</div>
            </v-col-->
            <v-col class="text-left">
              <div>
                <div class="user-profile-name-title field-title text-left">{{$t("userDetails.username")}}</div>
                <div v-if="!isNewRecord" class="text-left user-profile-username">{{model.formData.username}}</div>
                <input 
                  v-else
                  class="text-left user-profile-username input" 
                  v-model="model.formData.username"
                />
              </div>
              <div>
                <div class="user-profile-password-title field-title text-left">{{$t("userDetails.password")}}</div>
                <input
                  type="password"
                  v-if="isNewRecord || model.canUpdatePassword"
                  class="text-left user-profile-password input" 
                  v-model="password"
                />
              </div>
              <div>
                <div class="user-profile-name-title field-title text-left">{{$t("userDetails.nameHk")}}</div>
                <input
                  class="text-left user-profile-password input" 
                  v-model="model.formData.name_hk"
                />
              </div>
              <div>
                <div class="user-profile-name-title field-title text-left">{{$t("userDetails.nameEn")}}</div>
                <input
                  class="text-left user-profile-password input" 
                  v-model="model.formData.name_en"
                />
              </div>
            </v-col>
          </v-row>
          <div class="user-details-container" v-if="$store.getters.isAdmin">
            <div class="user-section-title">{{$t("userDetails.particularsOfEntry")}}</div>
            <v-row>
              <v-col cols="3">
                <div class="field-title">{{$t("userDetails.contractTypes")}}</div>
              </v-col>
              <v-col cols="9">
                <div></div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="field-label">{{$t("userDetails.contractTitle")}}</div>
              </v-col>
              <v-col cols="9">
                <div class="field-container">
                  <input
                    class="input-field"
                    v-model="model.formData.extraDetails.contract_title"
                  />
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="field-label">{{$t("userDetails.address")}}</div>
              </v-col>
              <v-col cols="9">
                <div class="field-container">
                  <input 
                    class="input-field"
                    v-model="model.formData.extraDetails.address"/>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="field-label">{{$t("userDetails.company_contractor")}}</div>
              </v-col>
              <v-col cols="9">
                <div class="field-container">
                  <input 
                    class="input-field"
                    v-model="model.formData.extraDetails.company_contractor"/>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="field-label">{{$t("userDetails.expected_completion_date")}}</div>
              </v-col>
              <v-col cols="9">
                <div class="field-container">
                  <VueCtkDateTimePicker
                      id="expected_completion_date"
                      class="datetime-field"
                      v-model="expected_completion_date"
                      :format="dateTimePickerOption.dateOnly"
                      :formatted="dateTimePickerOption.dateOnlyFormatted"
                      :minute-interval="dateTimePickerOption.minuteInterval"
                      input-size="lg"
                  ></VueCtkDateTimePicker>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="field-label">{{$t("userDetails.contract_sum")}}</div>
              </v-col>
              <v-col cols="9">
                <div class="field-container">
                  <input 
                    class="input-field"
                    v-model="model.formData.extraDetails.contract_sum"/>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="field-label">{{$t("userDetails.participated_in_ccsas2018")}}</div>
              </v-col>
              <v-col cols="9">
                <div class="field-container">
                  <input 
                    class="input-field"
                    v-model="model.formData.extraDetails.participated_in_ccsas2018"/>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="field-label">{{$t("userDetails.participated_in_ccsas2018_yes")}}</div>
              </v-col>
              <v-col cols="9">
                <div class="field-container">
                  <input 
                    class="input-field"
                    v-model="model.formData.extraDetails.participated_in_ccsas2018_yes"/>
                </div>
              </v-col>
            </v-row>
            <div class="user-section-title">{{$t("userDetails.contactPerson")}}</div>
            <v-row>
              <v-col cols="3">
                <div class="field-label">{{$t("userDetails.contactPersonHKFull")}}</div>
              </v-col>
              <v-col cols="9">
                <div class="field-container">
                  <input 
                    class="input-field"
                    v-model="model.formData.name_hk"/>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="field-label">{{$t("userDetails.contactPersonENFull")}}</div>
              </v-col>
              <v-col cols="9">
                <div class="field-container">
                  <input 
                    class="input-field"
                    v-model="model.formData.name_en"/>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="field-label">{{$t("userDetails.contact_number_company")}}</div>
              </v-col>
              <v-col cols="9">
                <div class="field-container">
                  <input 
                    class="input-field"
                    v-model="model.formData.extraDetails.contact_number_company"/>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="field-label">{{$t("userDetails.contact_number_mobile")}}</div>
              </v-col>
              <v-col cols="9">
                <div class="field-container">
                  <input 
                    class="input-field"
                    v-model="model.formData.extraDetails.contact_number_mobile"/>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="field-label">{{$t("userDetails.email")}}</div>
              </v-col>
              <v-col cols="9">
                <div class="field-container">
                  <input 
                    class="input-field"
                    v-model="model.formData.email"/>
                </div>
              </v-col>
            </v-row>
            <div class="user-section-title">{{$t("userDetails.otherParticulars")}}</div>
            <v-row>
              <v-col cols="3">
                <div class="field-label">{{$t("userDetails.expected_date_launch_ceremony")}}</div>
              </v-col>
              <v-col cols="9">
                <div class="field-container">
                  <VueCtkDateTimePicker
                      id="expected_date_launch_ceremony"
                      class="datetime-field"
                      v-model="expected_date_launch_ceremony"
                      :format="dateTimePickerOption.format"
                      :formatted="dateTimePickerOption.formatted"
                      :minute-interval="dateTimePickerOption.minuteInterval"
                      input-size="lg"
                  ></VueCtkDateTimePicker>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="field-label">{{$t("userDetails.expected_participants_launch")}}</div>
              </v-col>
              <v-col cols="9">
                <div class="field-container">
                  <input 
                    class="input-field"
                    v-model="model.formData.extraDetails.expected_participants_launch"/>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="field-label">{{$t("userDetails.location")}}</div>
              </v-col>
              <v-col cols="9">
                <div class="field-container">
                  <input 
                    class="input-field"
                    v-model="model.formData.extraDetails.location"/>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="field-label">{{$t("userDetails.expected_participants_whole")}}</div>
              </v-col>
              <v-col cols="9">
                <div class="field-container">
                  <input 
                    class="input-field"
                    v-model="model.formData.extraDetails.expected_participants_whole"/>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="field-label">{{$t("userDetails.promotion_plan")}}</div>
              </v-col>
              <v-col cols="9">
                <div class="field-container">
                  <textarea 
                    class="input-field"
                    v-model="model.formData.extraDetails.promotion_plan"/>
                </div>
              </v-col>
            </v-row>
          </div>
          <v-row>
            <v-col>
              <OwnedDevices
                :ownedDevices="userOwnedDevices"
                v-on:update-user-devices="loadDetails()"
                v-on:device-changes="userDeviceChanged"
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
                      ><v-icon class="mr-1">mdi-content-save</v-icon>{{$t("generic.btn.save")}}</v-btn>
                  </div>
                  <v-btn 
                      v-if="isNewRecord" 
                      class="btn cancel-btn"
                      @click="backAction()"
                  >{{$t("generic.btn.cancel")}}</v-btn>
                  <v-btn
                      v-else-if="canDelete"
                      @click="deleteConfirmDialog = true"
                      class="btn delete-btn"
                  >{{$t("generic.btn.delete")}}</v-btn>
              </v-col>
          </v-row>
          <v-dialog 
              v-model="deleteConfirmDialog"
              :width="350"
          >
              <template>
                  <div class="confirm-dialog-container">
                      <div class="confirm-dialog">
                          <div>{{$t("userList.confirmDeleteUser")}}</div>
                          <div class="btn-group">
                              <v-btn @click="resetConfirmDelete">{{$t("generic.btn.cancel")}}</v-btn>
                              <v-btn color="error" @click="confirmDelete">{{$t("generic.btn.confirm")}}</v-btn>
                          </div>
                      </div>
                  </div>
              </template>
          </v-dialog>
        </div>
    </v-container>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import BackButton from '../components/BackButton'

import User from '@/models/User'
import UserDevices from '@/models/UserDevices'
import OwnedDevices from '@/components/Users/Details/OwnedDevices'

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import moment from 'moment-timezone'

const { forEach } = require('p-iteration');

export default {
  name: 'UserDetails',
  components: {
    Loading,
    BackButton,
    OwnedDevices,
    VueCtkDateTimePicker
  },
  computed:{
    isAdmin: function(){
      return true
    },
    showBackButton: function(){
      return this.$store.getters.isAdmin
    }
  },
  watch:{
      "$route.params.id": async function(){
          this.isNewRecord = this.$route.params.id == undefined ? true: false
      }
  },
  async created(){
    this.isLoading = true
    
    if(this.$route.name == "userProfile"){
      this.canDelete = false
    }

    await this.loadDetails()    
    if(!this.isNewRecord){
      console.log(this.$route.params.id);
      console.log(this.model.formData);
      this.expected_completion_date = this.model.formData.extraDetails.expected_completion_date
      this.expected_date_launch_ceremony = this.model.formData.extraDetails.expected_date_launch_ceremony

      this.userDevice = await UserDevices.create()
    }

    this.isLoading = false
  },
  data(){
    return {
      canDelete: true,
      recordId: 0,
      isNewRecord: this.$route.params.id == undefined ? true: false,
      isSaving: false,
      isLoading: false,
      userOwnedDevices: {},
      updatedUserOwnedDevices: [],
      deleteConfirmDialog: false,
      dateTimePickerOption:{
        // 2020-07-09T09:31:34.000Z
          // format: "YYYY-MM-DD'T'HH:mm:ss'Z'",
          dateOnly: "YYYY-MM-DD",
          dateOnlyFormatted: "YYYY-MM-DD",
          format: "YYYY-MM-DD HH:mm",
          formatted: "YYYY-MM-DD HH:mm",
          minDate: moment().format('YYYY-MM-DD'),
          minuteInterval: "15"
      },
      password: "",
      expected_completion_date: moment().format('YYYY-MM-DD'),
      expected_date_launch_ceremony: moment().format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    backAction: function(){
        this.$router.push({name: 'users'})
    },
    loadDetails: async function(){
      this.model = await User.create()
      if(!this.isNewRecord){
        await this.model.loadDetails(this.$route.params.id)
        this.recordId = parseInt(this.model.id)
        await this.model.getUserDevices()
        this.userOwnedDevices = await this.model.getNestedDeviceByType()
      }
    },
    submitForm: async function(){
      this.isLoading = true

      this.model.formData.extraDetails.expected_completion_date = this.expected_completion_date
      this.model.formData.extraDetails.expected_date_launch_ceremony = this.expected_date_launch_ceremony

      if(this.password !== ""){
        this.model.formData.password = this.password
      }

      if(this.isNewRecord){
        try{
          let result = await this.model.create()
          this.recordId = result.id
          this.$router.push({name: 'userDetails', params: {id: this.recordId}})
        }catch(error){
          this.$noty.error(error.response.data.message)
        }
        
      } else {
        try{
          await this.model.update()
          await this.addNewDevices()
          await this.loadDetails()
        } catch(error){
          this.$noty.error(error.response.data.message)
        }
      }

      this.isLoading = false
    },
    getNeedRegisteredDevices: async function(){
      let tmp = []
      let tmpDeviceTypeId = 0
      Object.keys(this.updatedUserOwnedDevices).forEach((key) =>{
        tmpDeviceTypeId = this.updatedUserOwnedDevices[key].deviceType.id
        this.updatedUserOwnedDevices[key].userDevice.forEach((device) => {
          if(device.id == 0){
            tmp.push({deviceTypeId: tmpDeviceTypeId, deviceName: device.deviceName})
          }
        })

      })
      return tmp
    },
    addNewDevices: async function(){
      let newDevices = await this.getNeedRegisteredDevices()
      await forEach(newDevices, (device) => {
        this.userDevice.addDevice(this.$route.params.id, device.deviceTypeId, device.deviceName)
      })
      return true
    },
    resetConfirmDelete: function(){
      this.deleteConfirmDialog = false
    },
    confirmDelete: async function(){
      try{
        await this.model.delete()
        this.$noty.success("Successful Delete User")
        this.$router.push({name: 'users'})
      }catch(error){        
          this.$noty.error(error.response.data.message)
      }
    },
    userModifiedDevice: function(){

    },
    userDeviceChanged: function(userDevices){
      this.updatedUserOwnedDevices = userDevices
    }
  }
}
</script>
<style lang="sass" scoped>
.details-container
    padding: 0 63px
    font-family: Avenir
    font-weight: 500
    font-stretch: normal
    font-style: normal
    line-height: normal
    letter-spacing: normal
    .user-profile-username, .user-profile-password
        padding:14px 0
        font-family: Avenir
        font-size: 24px
        font-weight: 500
        font-stretch: normal
        font-style: normal
        line-height: normal
        letter-spacing: normal
        color: #324e4f
        &.input
          font-size: 16px
          border: 1px solid #d0d0d0
          height: 40px
          border-radius: 10px
          margin: 10px 0
          padding: 10px 0 10px 10px
    .user-profile-title
        color: #324e4f
        font-family: Avenir
        font-size: 28px
        font-weight: 300
        font-stretch: normal
        font-style: normal
        line-height: normal
        letter-spacing: normal
    .user-section-title
        font-family: Avenir
        font-size: 18px
        font-weight: 900
        font-stretch: normal
        font-style: normal
        line-height: normal
        letter-spacing: normal
    .field-title
        opacity: 0.4
        font-family: Avenir
        font-size: 14px
        font-weight: 900
        font-stretch: normal
        font-style: normal
        line-height: normal
        letter-spacing: normal
        color: #222222
        text-align:right
    .field-label
        text-align:right
    .user-details-container
        padding: 10px 0
        border-radius: 10px
        border: solid 1px #e9e9e9
        background-color: white
        .field-label
          position: relative
          top: 50%
          transform: translateY(-50%)
        .field-container
          text-align: left
        .input-field
          border: 1px solid #d0d0d0
          border-radius: 10px
          padding: 10px 20px
          width: 90%
        .datetime-field
          width: 90%
          margin: 0
          .field-input
            border-radius: 10px
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
                color: white
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
</style>
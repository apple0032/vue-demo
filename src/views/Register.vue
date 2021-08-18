<style>
.login-background{
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url('~@/assets/bg-main.png');
  background-position: top;
  background-repeat: no-repeat;
  background-size: contain;
  left: 0;
  background-color: #F8FAF7;
  overflow:hidden;
}
</style>

<template>
  <v-container fill-height>
    <div class="login-background"></div>
    <div>
      <router-link to="/trainings">
        <div>
          <v-img
              class="header-icon"
              src="@/assets/company_logo.svg"
              contain></v-img>
        </div>
      </router-link>
    </div>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <template>
          <v-form :lazy-validation="lazy">
            <v-card class="registration-form-container mx-auto" max-width="800" min-height="800" outlined>
              <v-list-item three-line>
                <v-list-item-content>

                  <div>
                    <div class="d-inline">
                      <BackButton
                          title="Back"
                          @back-action="backAction"
                      />
                    </div>
                    <div class="d-inline">
                        <div class="login-title text-center">{{$t('user.registration')}}</div>
                    </div>
                  </div>



                </v-list-item-content>
              </v-list-item>

              <v-container class="showStep-container">
                <div class="step-status-container">
                  {{$t('userCreate.reg_step1')}}. <span>{{$t('userCreate.account_credentials')}} </span>
                  <div class="step-status" :style="activeBgColor(1)"></div>
                </div>
                <div class="step-status-container">
                  {{$t('userCreate.reg_step2')}}. <span>{{$t('userCreate.contractor_details')}} </span>
                  <div class="step-status" :style="activeBgColor(2)"></div>
                </div>
                <div class="step-status-container">
                  {{$t('userCreate.reg_step3')}}. <span>{{$t('userCreate.supporting_documents')}} </span>
                  <div class="step-status" :style="activeBgColor(3)"></div>
                </div>
              </v-container>

              <v-stepper v-model="step" class="flat-stepper">
                <v-stepper-items>
                  <v-stepper-content step="1" flat>
                    <v-container class="reg-container-step1">
                      <div class="label-left">{{$t('userCreate.username')}}</div>
                      <v-text-field class="form-input-box login-email" v-model="registrationForm.username"
                                    :rules="[rules.required, rules.name_min]" :label="$t('userCreate.username_label')" required solo></v-text-field>

                      <div class="label-left">{{$t('userCreate.password')}}   <span class="label-remark">{{$t('userCreate.password_min')}}</span></div>
                      <v-text-field class="form-input-box login-email" :rules="[rules.required, rules.min]" :type="pwshow ? 'text' : 'password'" v-model="registrationForm.password" :append-icon="pwshow ? 'mdi-eye' : 'mdi-eye-off'" @click:append="pwshow = !pwshow"
                                    :label="$t('userCreate.password_label')" required solo></v-text-field>
                      <v-text-field class="form-input-box login-email" :rules="[rules.required, rules.min]" :type="pwshow ? 'text' : 'password'" v-model="registrationForm.confirmPassword" :append-icon="pwshow ? 'mdi-eye' : 'mdi-eye-off'" @click:append="pwshow = !pwshow"
                                    :label="$t('userCreate.password_confirm')" required solo></v-text-field>
                    </v-container>

                  </v-stepper-content>
                  <v-stepper-content step="2">

                    <v-container class="reg-container">
                      <v-row no-gutters>
                        <v-col cols="12" sm="6">
                          <div class="label-left-step2">{{$t('userCreate.contract_number')}}</div>
                          <v-text-field class="form-input-box step2-input" v-model="registrationForm.contract_number" :label="$t('userCreate.contract_number')" solo></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="label-left-step2">{{$t('userCreate.contract_title')}}</div>
                          <v-text-field class="form-input-box step2-input" v-model="registrationForm.contract_title" :label="$t('userCreate.contract_title')" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>

                    <v-container class="reg-container">
                      <v-row no-gutters>
                        <v-col cols="12" sm="6">
                          <div class="label-left-step2">{{$t('userCreate.address')}}</div>
                          <v-text-field class="form-input-box step2-input" v-model="registrationForm.address" :label="$t('userCreate.address')"  solo></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="label-left-step2">{{$t('userCreate.user_email_address')}}</div>
                          <v-text-field class="form-input-box step2-input" v-model="registrationForm.user_email_address" :rules="[rules.isEmail]" type="email" :label="$t('userCreate.user_email_address')"  solo></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>

                    <v-container class="reg-container">
                      <v-row no-gutters>
                        <v-col cols="12" sm="6">
                          <div class="label-left-step2">{{$t('userCreate.expected_completion_date')}}</div>

                          <div class="field-container">
                            <VueCtkDateTimePicker
                                id="expected_completion_date"
                                class="datetime-field"
                                v-model="registrationForm.completion_date"
                                :format="'YYYY-MM-DD'"
                                :formatted="'YYYY-MM-DD'"
                                :minute-interval="dateTimePickerOption.minuteInterval"
                                input-size="lg"
                                only-date	autoClose noHeader noButtonNow
                                :label="$t('userCreate.expected_completion_date_label')"
                            ></VueCtkDateTimePicker>
                          </div>

                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="label-left-step2">{{$t('userCreate.contract_sum')}}</div>
                          <v-text-field class="form-input-box step2-input" v-model="registrationForm.contract_sum" :label="$t('userCreate.contract_sum')"  solo></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>

                    <v-container class="reg-container">
                      <v-row no-gutters>
                        <v-col cols="12" sm="6">
                          <div class="label-left-step2">{{$t('userCreate.contact_person_zh')}}</div>
                          <v-text-field class="form-input-box step2-input" v-model="registrationForm.contact_person_zh" :label="$t('userCreate.contact_person_zh')" solo></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="label-left-step2">{{$t('userCreate.contact_person_en')}}</div>
                          <v-text-field class="form-input-box step2-input" v-model="registrationForm.contact_person_en" :label="$t('userCreate.contact_person_en')"  solo></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>

                    <v-container class="reg-container">
                      <v-row no-gutters>
                        <v-col cols="12" sm="6">
                          <div class="label-left-step2">{{$t('userCreate.user_contact_number')}}</div>
                          <v-text-field class="form-input-box step2-input" v-model="registrationForm.user_contact_number" :label="$t('userCreate.user_contact_number')" solo></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="label-left-step2">{{$t('userCreate.company_contact_number')}}</div>
                          <v-text-field class="form-input-box step2-input" v-model="registrationForm.company_contact_number" :label="$t('userCreate.company_contact_number')"  solo></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>


                  </v-stepper-content>
                  <v-stepper-content step="3">

                    <div class="label-left">{{$t('userCreate.lists_of_documents')}}</div>
                    <v-container class="reg-container-step3">

                      <div v-for="(document, index) in registrationForm.documents" :key="index">
                        <v-row no-gutters>
                          <v-col cols="12" sm="6">
                            <v-text-field class="form-input-box step2-input" v-model="document.url" :label="$t('userCreate.document_url')" solo></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field class="form-input-box step2-input" v-model="document.desc" :label="$t('userCreate.document_desc')" solo></v-text-field>
                          </v-col>
                        </v-row>
                      </div>

                      <div class="label-left-step2">
                        <v-btn @click="addDoc" class="add-btn">
                          +  {{$t('userCreate.add_url')}}
                        </v-btn>
                      </div>
                    </v-container>

                    <v-container class="notice_container">
                      <span>
                        {{$t('userCreate.register_notice')}}
                      </span>
                    </v-container>

                    <div class="label-left">{{$t('userCreate.remarks')}}   <span class="label-remark">{{$t('userCreate.remarks_notice')}}</span></div>
                    <v-container class="remark-container">
                      <v-textarea v-model="registrationForm.remarks" :label="$t('userCreate.remarks')" no-resize></v-textarea>
                    </v-container>

                  </v-stepper-content>
                </v-stepper-items>

              </v-stepper>
              <v-card-actions>
                <v-btn :disabled="!btnStatus" :loading="loading" text class="next-btn" @click="RegistrationHandler">{{btn}}</v-btn>
              </v-card-actions>
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
  </v-container>
</template>

<script>

import { createUser, checkExistedUser, checkExistedEmail} from "@/apis/User";
import BackButton from '../components/BackButton';
import moment from "moment-timezone";
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

export default {
  name: "registrationForm",
  props: {},
  components: {
    BackButton,
    VueCtkDateTimePicker
  },
  data() {
    return {
      btn: "next",
      step: 1,
      pwshow: false,
      rules: {
        name_min: (v) => v.length >= 4 || "Min 4 characters",
        required: (v) => !!v || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match",
        isEmail: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      },
      validForm: true,
      lazy: false,
      registrationForm: {
        remember: false,
        username: "",
        password: "",
        confirmPassword: "",

        contract_number: "",
        contract_title: "",
        address: "",
        user_email_address: "",
        completion_date: "",
        contract_sum: "",
        contact_person_zh: "",
        contact_person_en: "",
        user_contact_number: "",
        company_contact_number: "",
        remarks: "",
        documents: [
          {url: ""}
        ],
        doc_description: [
          {desc: ""}
        ]
      },
      userId: null,
      loading: false,
      errors: [],
      dateTimePickerOption:{
        dateOnly: "YYYY-MM-DD",
        dateOnlyFormatted: "YYYY-MM-DD",
        format: "YYYY-MM-DD HH:mm",
        formatted: "YYYY-MM-DD HH:mm",
        minDate: moment().format('YYYY-MM-DD'),
        minuteInterval: "15"
      },
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.loginForm.email.$dirty) return errors;
      !this.loginForm.email.email && errors.push("Must be valid e-mail");
      !this.loginForm.email.required && errors.push("E-mail is required");
      return errors;
    },
    redirectUrl() {
      return process.env.VUE_APP_SAFTYWEEK_RESETPASSWORD_DOMAIN;
    },
    btnStatus() {
      let _status = false;
      switch (this.step) {
        case 1:
          _status = false;
          if (this.registrationForm.username && this.registrationForm.password === this.registrationForm.confirmPassword) {
            _status = true;
          }
          break;
        case 2:
            _status = true;
          break;
        case 3:
            _status = true;
          break;
        default:
          break;
      }
      return _status;
    },
  },
  methods: {
    addDoc()
    {
      this.registrationForm.documents.push({ url: '' });
      this.registrationForm.doc_description.push({ desc: '' });
    },
    activeBgColor(step){
      if(this.step === step) {
        return  "background-color: #9FCB3D";
      } else {
        return  "background-color: #EDFFC5";
      }
    },
    isActive(step){
      if(this.step === step) {
        return  "active";
      } else {
        return  "";
      }
    },
    backAction: function(){
      if(this.step == 1) {
        this.$router.push({name: 'users'})
      } else {
        this.step--;
      }

      if(this.step === 3) { this.btn = "finish"; } else { this.btn = "next"; }
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async RegistrationHandler() {
      this.errors = [];
      switch (this.step) {
          case 1: {
            this.loading = true;
            var pass = true;

            if((this.registrationForm.username).length < 4){
              this.errors.push("Min 4 characters for username.");
              pass = false;
            }

            let response = await checkExistedUser(this.registrationForm.username);
            if(response.data.result === "EXISTED"){
              this.errors.push("This username is not unique.");
              pass = false;
            }

            if(this.registrationForm.password !== this.registrationForm.confirmPassword){
              this.errors.push("Password should be same.");
              pass = false;
            }

            if(pass === true) {
              this.step++;
            }
            //this.step++;
          this.loading = false;
          break;
        }
        case 2: {
          this.loading = true;
          try{
            if (this.registrationForm.user_email_address) {
              let email_pass = true;
              let response2 = await checkExistedEmail(this.registrationForm.user_email_address);
              if (response2.data.result === "EXISTED") {
                email_pass = false;
                this.errors.push("This email is not unique.");
              }

              if (email_pass === true) {
                if (this.validEmail(this.registrationForm.user_email_address) === false) {
                  this.errors.push("Invalid Email.");
                } else {
                  this.step++;
                }
              }
            } else {
              this.errors.push("Please input Email Address.");
            }
          }catch(error){
            this.errors.push(error.response.message);
            this.errors.push("The provided information is incorrect");
          }
          this.loading = false;

          break;
        }
        case 3: {
          this.loading = true;
          try{

            var documents = JSON.parse(JSON.stringify(this.registrationForm.documents))

            let response = await createUser({
              username: this.registrationForm.username,
              password: this.registrationForm.password,

              contract_number: this.registrationForm.contract_number,
              contract_title: this.registrationForm.contract_title,
              address: this.registrationForm.address,
              user_email_address: this.registrationForm.user_email_address,
              completion_date: this.registrationForm.completion_date,
              contract_sum: this.registrationForm.contract_sum,
              contact_person_zh: this.registrationForm.contact_person_zh,
              contact_person_en: this.registrationForm.contact_person_en,
              user_contact_number: this.registrationForm.user_contact_number,
              company_contact_number: this.registrationForm.company_contact_number,
              remarks: this.registrationForm.remarks,
              documents: documents,

              method : "home_reg",
              role: "NormalUser"
            });
            console.log(response);
            this.$noty.success(this.$t("generic.createUserSuccess"));
            this.$router.push("register-success");

          }catch(error){
            this.errors.push(error.response.data.message);
          }
          this.loading = false;
          break;
        }
        default:
          break;
      }
      if(this.step === 3) { this.btn = "finish"; } else { this.btn = "next"; }
    },
  },
};
</script>

<style scoped>
.flat-stepper {
  box-shadow: none !important;
}

.login-title {
  font-size: 28px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  padding: 0;
  padding-top: 20px;
  display: inline-block;
}

.form-input-box {
  font-size: 28px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  border-radius: 10px;
}

.v-text-field.v-text-field--enclosed {
  margin: 0 45px;
}

.v-text-field--outlined.v-input--is-focused fieldset {
  border: 1px solid #d0d0d0;
}

.next-btn {
  font-size: 15px !important;
  color: white !important;
  width: 132px;
  background-color: #9fcb3d;
  border: 1px solid #7ed321;
  border-radius: 27px;
  padding: 16px !important;
  height: 54px !important;
  margin: 14px 200px 21px;
  font-weight: bold;
  box-shadow: 0px 13px 5px #edffda;
}

.login-forgot-password {
  width: 147px;
  height: 18px;
  font-size: 13.1px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #324e4f;
  margin-bottom: 10px;
}

.login-keep-signed-in {
  margin: 0 45px;
}

.v-card__actions {
  padding: 0 !important;
}

.login-error {

  width: 270px;
  margin: 0 auto;
  color: red;
  font-size: 12px;
}

.label-left{
  text-align: left;
  margin: 0 49px;
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

.step2-input{
  margin: 0 10px !important;
}

.label-left-step2{
  text-align: left;
  margin: 0 0 10px 10px;
  font-weight: bold;
}

.reg-container{
  padding :0
}

.reg-container-step1{
  padding: 0 120px;
}

.datetime-field {
  width: 96%;
  margin: 0
}

.field-container{
  padding-left: 10px;
}

.remark-container{
  border: 1px solid #d2d2d2;
  border-radius: 15px;
  width: 87%;
  padding: 40px 15px 15px 15px;
  height: 150px;
}
</style>

<style>
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

  .step-status-container span{
    display: none;
  }

  .showStep-container{
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}

@media(max-width: 700px) {
  .reg-container-step1{
    padding: 0 !important;
  }

  .v-text-field.v-text-field--enclosed{
    margin: 0 !important;
  }

  .label-left{
    margin: 0 5px!important;
  }

  .next-btn{
    margin: 14px 150px 21px !important;
  }

  #expected_completion_date-wrapper{
    margin-bottom: 20px;
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

.showStep-container{
  padding-left: 50px;
  padding-right: 50px;
  font-size: 13px;
  font-weight: bold;
}

.step-status{
  width: 98%;
  height: 10px;
  margin-top: 5px;
  border-radius: 3px;
}

.step-status-container{
  width: 30%;
  display: inline-block;
}

.datetimepicker .datepicker{
  bottom: auto !important;
}

.reg-container-step3{
  padding-left: 30px;
  padding-right: 30px;
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

.registration-form-container{
  padding-bottom: 40px;
  margin-bottom: 20px;
}

.notice_container{
  text-align: left;
  font-size: 13px;
  margin: 0 35px 30px 40px;
  background: #F8FAF7;
  width: 90%;
}

@media(max-width: 700px) {
  .notice_container{
    margin: 0 0 30px;
    background: #F8FAF7;
  }
}

#expected_completion_date-input{
  height: 56px;
  border-radius: 10px;
}

.login-error{
  text-align: left;
  padding-left: 30px;
}

.login-error ul{
  text-align: left;
}

.login-error li{
  list-style-type: disc !important;
}

.registration-form-container .v-input__slot{
  height: 55px !important;
}
</style>
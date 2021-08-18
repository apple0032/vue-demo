
<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <template>
          <v-form :lazy-validation="lazy">
            <v-card class="admin-registration-form-container mx-auto" max-width="1050" min-height="850" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="page-header">
                    <div class="d-inline">
                      <BackButton
                          title="Back"
                          @back-action="backAction"
                      />
                    </div>
                    <div class="d-inline">
                        <div class="login-title text-center" v-if="$store.getters.isAdmin">{{$t("userCreate.title")}}</div>
                    </div>
                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-container>

                <v-container class="form-container">
                  <v-row no-gutters>
                    <v-col cols="12" sm="6">
                      <div class="label-left">{{$t("userCreate.username")}}</div>
                      <v-text-field class="form-input-box" v-model="creationForm.username"
                                    :rules="[rules.required, rules.name_min]" :label="$t('userCreate.username_label')"  required solo></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="label-left">{{$t("userCreate.password")}}   <span class="label-remark">{{$t("userCreate.password_min")}}</span></div>
                      <v-text-field class="form-input-box" v-model="creationForm.password"
                                    :rules="[rules.required, rules.name_min]" :label="$t('userCreate.password_label')" required solo></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>

                <v-container class="form-container">
                  <v-row no-gutters>
                    <v-col cols="12" sm="6">
                      <div class="label-left">{{$t('userCreate.contract_title')}}</div>
                      <v-text-field class="form-input-box" v-model="creationForm.contract_title" :label="$t('userCreate.contract_title')" solo></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="label-left">{{$t('userCreate.user_email_address')}}</div>
                      <v-text-field class="form-input-box" v-model="creationForm.user_email_address" :rules="[rules.isEmail]" type="email" :label="$t('userCreate.user_email_address')"  required solo></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>

                <v-container class="form-container">
                  <v-row no-gutters>
                    <v-col cols="12" sm="6">
                      <div class="label-left">{{$t('userCreate.contact_person_zh')}}</div>
                      <v-text-field class="form-input-box" v-model="creationForm.contact_person_zh" :label="$t('userCreate.contact_person_zh')" solo></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="label-left">{{$t('userCreate.contact_person_en')}}</div>
                      <v-text-field class="form-input-box" v-model="creationForm.contact_person_en" :label="$t('userCreate.contact_person_en')"  solo></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>

                <v-container class="form-container">
                  <v-row no-gutters>
                    <v-col cols="12" sm="6">
                      <div class="label-left">{{$t('userCreate.user_contact_number')}}</div>
                      <v-text-field class="form-input-box" v-model="creationForm.user_contact_number" :label="$t('userCreate.user_contact_number')" solo></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="label-left">{{$t('userCreate.company_contact_number')}}</div>
                      <v-text-field class="form-input-box" v-model="creationForm.company_contact_number" :label="$t('userCreate.company_contact_number')"   solo></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <br>

                <v-container class="form-container">
                  <v-row no-gutters>
                    <v-col cols="12" sm="6">
                      <div class="form-input">
                        <v-checkbox v-model="creationForm.activate" :label="$t('userCreate.user_activate')"></v-checkbox>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                          <v-select v-model="creationForm.role" :items="userRole" :label="$t('userCreate.user_role')" outlined></v-select>
                    </v-col>
                  </v-row>
                </v-container>

              </v-container>


              <v-card-actions>
                <v-btn :loading="loading" text class="create-btn" @click="creationHandler">{{$t('userCreate.create')}}</v-btn>
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

export default {
  name: "creationForm",
  pwshow: false,
  props: {},
  components: {
    BackButton,

  },
  beforeMount() {
    if(this.$store.getters.isAdmin === false){
      this.$router.push({name: 'Login'})
    }
  },
  data() {
    return {
      rules: {
        name_min: (v) => v.length >= 4 || "Min 4 characters",
        required: (v) => !!v || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match",
        isEmail: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      },
      userRole: ['General User', 'Construction Contractor User', 'CIC User'],
      validForm: true,
      lazy: false,
      creationForm: {
        activate: true,
        remember: false,
        username: "",
        password: "",
        user_email_address: "",
        contract_title: "",
        contact_person_zh: "",
        contact_person_en: "",
        user_contact_number: "",
        company_contact_number: "",
        role: 'General User',
      },
      userId: null,
      loading: false,
      errors: [],
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
    }
  },
  methods: {
    backAction: function(){
        this.$router.push({name: 'users'})
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async creationHandler() {
      let pass = true;
      this.errors = [];
      let lang = this.$store.state.userInfo.language;

      if(!this.creationForm.username){
        pass = false;
        if(lang === "en"){
          this.errors.push("Please input login username");
        } else {
          this.errors.push("請輸入登入用戶名稱");
        }
      } else {
        let response = await checkExistedUser(this.creationForm.username);
        if(response.data.result === "EXISTED"){
          pass = false;
          if(lang === "en"){
            this.errors.push("This username is not unique.");
          } else {
            this.errors.push("此帳號名稱已被使用");
          }
        }
      }

      if(!this.creationForm.password || (this.creationForm.password).length < 8){
        pass = false;
        if(lang === "en"){
          this.errors.push("Please input password");
        } else {
          this.errors.push("請輸入登入密碼");
        }
      }

      if(!this.creationForm.user_email_address){
        pass = false;
        if(lang === "en"){
          this.errors.push("Please input email address");
        } else {
          this.errors.push("請輸入電郵地址");
        }
      } else {
        let response2 = await checkExistedEmail(this.creationForm.user_email_address);
        if(response2.data.result === "EXISTED"){
          pass = false;
          if(lang === "en"){
            this.errors.push("This email address is not unique.");
          } else {
            this.errors.push("此電郵地址已被使用");
          }
        }
      }

      if (this.validEmail(this.creationForm.user_email_address) === false) {
        pass = false;
        if(lang === "en"){
          this.errors.push("Invalid Email.");
        } else {
          this.errors.push("請輸入正確電郵地址");
        }
      }



      if(pass === true) {
        console.log(this.creationForm);

        let response = await createUser({
          username: this.creationForm.username,
          password: this.creationForm.password,
          contract_title: this.creationForm.contract_title,
          user_email_address: this.creationForm.user_email_address,
          contact_person_zh: this.creationForm.contact_person_zh,
          contact_person_en: this.creationForm.contact_person_en,
          user_contact_number: this.creationForm.user_contact_number,
          company_contact_number: this.creationForm.company_contact_number,
          documents: "",

          method : "admin_creation",
          role:  this.creationForm.role,
          active : this.creationForm.activate
        });
        console.log(response);
        console.log(response.data.response_code);

        if(response.data.response_code === 200) {
          this.$noty.success(this.$t("generic.createUserSuccess"));
          this.$router.push({name: 'users'})
        } else {
          this.$noty.error("Fail to create user.");
        }
      }

    },
  },
};
</script>

<style scoped>
.page-header{
  text-align: left;
  padding-left: 40px;
  margin-bottom: 20px;
}

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
}


.v-text-field.v-text-field--enclosed , .form-input{
  margin: 0 45px;
}

.v-text-field--outlined.v-input--is-focused fieldset {
  border: 1px solid #d0d0d0;
}

.create-btn {
  font-size: 13px !important;
  color: white !important;
  width: 120px;
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
  padding :0
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


}

@media(max-width: 700px) {
  .create-btn{
    margin: 14px 150px 21px !important;
  }

  .admin-registration-form-container{
    padding: 0 !important;
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



.admin-registration-form-container .v-text-field input{
  padding: 24px 12px !important;
}

.admin-registration-form-container{
  padding: 0 60px;
  margin-bottom: 30px;
}
</style>
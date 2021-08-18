<template>
    <v-form id="forgetForm" :lazy-validation="lazy">
        <v-card class="login-form-container mx-auto" max-width="422" min-height="520" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="mb-1">
                        <v-img class="mx-auto" width="240" src="@/assets/CIC_Logo.svg" contain></v-img>
                        <v-card-text class="login-title text-center">{{this.$t("user.forget_password")}}</v-card-text>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-stepper v-model="step" class="flat-stepper">
                <v-stepper-items>
                    <v-stepper-content step="1" flat>
                        <v-text-field class="form-input-box login-email" v-model="forgetPasswordForm.username"
                            :rules="[rules.required]" :label="$t('userCreate.username')" required solo></v-text-field>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <v-text-field class="form-input-box login-email" v-model="forgetPasswordForm.userEmail"
                            :rules="[rules.required, rules.isEmail]" :label="$t('user.registered_email')" type="email" required solo></v-text-field>
<!--                        <v-text-field class="form-input-box login-email" v-model="forgetPasswordForm.userMobile"-->
<!--                            :rules="[rules.required]" :label="$t('user.registered_mobile')" required solo></v-text-field>-->

                      <div class="text-left forget-password-notice">
                        {{ $t('user.forget_password_notice') }}
                      </div>

                    </v-stepper-content>

                </v-stepper-items>
            </v-stepper>

            <v-card-actions>
                <v-btn :disabled="!btnStatus" :loading="loading" text class="login-btn" @click="forgetPasswordHandler">
                  {{btn}}</v-btn>
            </v-card-actions>
            <p class="login-error" v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                </ul>
            </p>
            <router-link to="/" class="login-forgot-password">{{$t('user.back_to_login')}}</router-link>
        </v-card>
    </v-form>
</template>

<script>
import {
  checkExistedUser,
  sendResetPwdEmail
} from "@/apis/User";
export default {
  name: "forgetPasswordForm",
  props: {},
  data() {
    return {
      btn : "next",
      step: 1,
      pwshow: false,
      rules: {
        required: (v) => !!v || "Required.",
        emailMatch: () => "The email and password you entered don't match",
        isEmail: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      },
      validForm: true,
      lazy: false,
      forgetPasswordForm: {
        remember: false,
        username: "",
        userEmail: "",
        userMobile: "",
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
    },
    btnStatus() {
      let _status = false;
      switch (this.step) {
        case 1:
          _status = false;
          if (this.forgetPasswordForm.username) {
            _status = true;
          }
          break;
        case 2:
          _status = false;
          if (
            this.forgetPasswordForm.userEmail
          ) {
            _status = true;
          }
          break;
        default:
          break;
      }
      return _status;
    },
  },
  methods: {
    async forgetPasswordHandler() {
      this.errors = [];
      let response;
      switch (this.step) {
        case 1: {
          this.loading = true;
          try{

            response = await checkExistedUser(this.forgetPasswordForm.username);
            if(response.data.result === "EXISTED"){
              this.step++;
            } else {
              this.errors.push("Username not found.");
            }

            this.loading = false;
            this.btn = "CONFIRM";

          }catch(error){
            this.errors.push(error.response.message);
          }
          break;
        }
        case 2: {

          this.loading = true;
          try{

            let res2 = await checkExistedUser(this.forgetPasswordForm.username);
            if(res2.data.userInfo.user_email_address !== this.forgetPasswordForm.userEmail){
              this.errors.push("The user email is not match with the username");
            } else {

              //Send email to reset password
              console.log("Send reset email with refresh token.");
              let res3 = await sendResetPwdEmail({ receiver : this.forgetPasswordForm.userEmail , domain : process.env.VUE_APP_RESET_PW_DOMAIN });
              if(res3.data.response_code === 200){
                this.$noty.success("Reset password email has been sent.");
                this.$router.push("Login");
              }

            }

          }catch(error){
            this.errors.push("The provided information is incorrect");
          }
          this.loading = false;
          break;
        }
        default:
          break;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
}

.form-input-box {
  font-size: 28px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}

.v-text-field.v-text-field--enclosed {
  margin: 0 45px;
}

.v-text-field--outlined.v-input--is-focused fieldset {
  border: 1px solid #d0d0d0;
}

.login-btn {
  font-size: 13px !important;
  color: white !important;
  margin: 0 auto;
  width: 332px;
  background-color: #9fcb3d;
  border: 1px solid #7ed321;
  border-radius: 27px;
  padding: 16px !important;
  height: 54px !important;
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
  text-align: left;
  width: 270px;
  margin: 0 auto;
  color: red;
  font-size: 12px;
}

.forget-password-notice{
  padding: 10px 20px;
}
</style>
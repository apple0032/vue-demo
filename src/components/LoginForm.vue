<template>
  <div>
    <v-form
        id="loginForm"
        v-model="validForm"
        :lazy-validation="lazy"
        @submit.prevent="login"
    >
        <v-card
        class="login-form-container mx-auto"
        max-width="420"
        min-height="490"
        outlined
        >
        <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="mb-1">
                    <v-img
                        class="mx-auto"
                        width="240"
                        src="@/assets/CIC_Logo.svg"
                        contain></v-img>
                <v-card-text class="login-title">VR Cloud Platform</v-card-text>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-text-field
            class="form-input-box login-email"
            v-model="loginForm.username"
            :rules="[rules.required]"
            :label="$t('userDetails.username')"
            required
            solo
        ></v-text-field>

        <v-text-field
            class="form-input-box login-password"
            :type="pwshow ? 'text' : 'password'"
            v-model="loginForm.password"
            :append-icon="pwshow ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :label="$t('userDetails.password')"
            required
            solo
            @click:append="pwshow = !pwshow"
        ></v-text-field>
          <v-card-actions>
            <v-btn
                type="submit"
                :disabled="!validForm"
                :loading="loading"
                text
                class="login-btn"
            >{{$t('user.sign_in')}}</v-btn>
          </v-card-actions>
        <v-checkbox
            class="login-keep-signed-in"
            v-model="loginForm.remember"
            color="#9fcb3d"
            :label="$t('user.keep_sign')"
        ></v-checkbox>
          <div class="forget-password">
            <router-link to="/forget-password" class="login-forgot-password">{{$t('user.forgot_password')}}</router-link>
          </div>

        <p
            class="login-error"
            v-if="errors.length">
            <b>{{$t('userCreate.submit_alert')}}</b>
            <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
        </p>
        <router-link to="/register" class="register-new">{{$t('user.register')}}</router-link>
        </v-card>
    </v-form>



    <v-dialog
        v-model="InactiveUser"
        :width="450"
    >
      <template>
        <div class="confirm-dialog-container">
          <div class="confirm-dialog">
            <div class="inactive-left"><svg width="27" height="35" viewBox="0 0 27 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0)">
                <g opacity="0.140672" filter="url(#filter0_f)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0 21.55C0 14.6465 5.59644 9.05005 12.5 9.05005C19.4036 9.05005 25 14.6465 25 21.55C25 28.4536 19.4036 34.05 12.5 34.05C5.59644 34.05 0 28.4536 0 21.55Z" fill="#D32121"/>
                </g>
                <rect x="0.55" y="0.55" width="25.9" height="25.9" rx="12.95" fill="#CB3D3D" stroke="#D32121" stroke-width="1.1"/>
                <path d="M14.94 15.32H11.94V5.84H14.94V15.32ZM11.6 18.28C11.6 18.0267 11.6467 17.7867 11.74 17.56C11.8333 17.3333 11.96 17.14 12.12 16.98C12.2933 16.8067 12.4933 16.6733 12.72 16.58C12.9467 16.4867 13.1867 16.44 13.44 16.44C13.6933 16.44 13.9333 16.4867 14.16 16.58C14.3867 16.6733 14.58 16.8067 14.74 16.98C14.9133 17.14 15.0467 17.3333 15.14 17.56C15.2333 17.7867 15.28 18.0267 15.28 18.28C15.28 18.5333 15.2333 18.7733 15.14 19C15.0467 19.2267 14.9133 19.4267 14.74 19.6C14.58 19.76 14.3867 19.8867 14.16 19.98C13.9333 20.0733 13.6933 20.12 13.44 20.12C13.1867 20.12 12.9467 20.0733 12.72 19.98C12.4933 19.8867 12.2933 19.76 12.12 19.6C11.96 19.4267 11.8333 19.2267 11.74 19C11.6467 18.7733 11.6 18.5333 11.6 18.28Z" fill="white"/>
              </g>
              <defs>
                <filter id="filter0_f" x="-21.7463" y="-12.6962" width="68.4925" height="68.4925" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="10.8731" result="effect1_foregroundBlur"/>
                </filter>
                <clipPath id="clip0">
                  <rect width="27" height="35" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            </div>
              <div class="inactive-right">{{$t("userDetails.inactive")}}</div>
            <v-btn
                text
                class="confirm-btn"
                @click="resetConfirmDelete"
            >{{$t("generic.btn.confirm")}}</v-btn>
          </div>
        </div>
      </template>
    </v-dialog>
  </div>

</template>


<script>
export default {
  name: "LoginForm",
  props: {},
  data() {
    return {
      pwshow: false,
      rules: {
        required: (v) => !!v || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match",
        isEmail: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      },
      validForm: true,
      lazy: false,
      loginForm: {
        remember: false,
        username: "",
        password: "",
      },
      loading: false,
      errors: [],
      InactiveUser: false
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
  },
  methods: {
    login() {
      this.errors = [];
      this.loading = true;
      this.$store
        .dispatch("auth/login", this.loginForm)
        .then(() => {
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          if(error.response.data.key === "INACTIVE_USER"){
            this.InactiveUser = true;
          } else {
            let message = error.response.data.message;
            this.errors.push(message);
          }
        });
    },
    resetConfirmDelete(){
      this.InactiveUser = false
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-title {
  font-size: 27px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  padding: 0;
  padding-top: 20px;
  text-align: center;
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
  color: white !important;
  margin: 0 auto;
  width: 332px;
  background-color: #9fcb3d;
  border: 1px solid #7ed321;
  border-radius: 27px;
  padding: 16px !important;
  height: 54px !important;
}

.login-btn .v-btn__content{
  font-size: 24px !important;
}

.login-forgot-password {
  width: 147px;
  height: 18px;
  font-size: 13.1px;
  font-weight: normal !important;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #324e4f;
  margin-bottom: 10px;
  text-decoration-line: none;
}

.login-keep-signed-in {
  margin: 0 0 0 20px;
  width: 40%;
  display: inline-block;
}

.forget-password{
  display: inline-block;
  width: 45%;
  vertical-align: top;
  padding-top: 4px;
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

.confirm-dialog{
  line-height: 29px;
  font-size: 18px;
}

.confirm-dialog-container{
  padding: 50px 50px;
  background-color: white;
  font-weight: bold;
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

.confirm-btn {
  font-size: 13px !important;
  color: white !important;
  margin: 0 auto;
  width: 120px;
  background-color: #9fcb3d;
  border: 1px solid #7ed321;
  border-radius: 27px;
  padding: 16px !important;
  height: 54px !important;
  margin-top: 30px !important;
  font-weight: bold;
}

.inactive-left, .inactive-right{
  display: inline-block;
}

.inactive-left{
  width: 15%;
}

.inactive-right{
  width: 80%;
  vertical-align: top;
  text-align: left;
}

.register-new{
  text-decoration: none;
  color: #324e4f;
  font-weight: bold;
  display: block;
}

.login-form-container{
  box-shadow: 0px 0px 5px 2px rgba(126, 211, 33, 0.2) !important;
}

.login-form-container .v-input__slot{
  height: 55px !important;
}
</style>
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
    <v-row align="center" justify="center">
      <v-col cols="12">
        <template>
          <v-form :lazy-validation="lazy">
            <v-card class="login-form-container mx-auto" max-width="800" min-height="550" outlined>
              <v-list-item three-line>
                <v-list-item-content>

                  <div>
                    <div class="d-inline">
                        <div class="login-title text-center">{{$t('user.reset_password')}}</div>
                    </div>
                  </div>

                </v-list-item-content>
              </v-list-item>


              <div class="reset-container">

                <div class="label-left">{{$t('userCreate.password')}}   <span class="label-remark">{{$t('userCreate.password_min')}}</span></div>
                <v-text-field class="form-input-box login-email" :rules="[rules.required, rules.min]" :type="pwshow ? 'text' : 'password'" v-model="password" :append-icon="pwshow ? 'mdi-eye' : 'mdi-eye-off'" @click:append="pwshow = !pwshow"
                              :label="$t('userCreate.password_label')" required solo></v-text-field>
                <v-text-field class="form-input-box login-email" :rules="[rules.required, rules.min]" :type="pwshow ? 'text' : 'password'" v-model="confirmPassword" :append-icon="pwshow ? 'mdi-eye' : 'mdi-eye-off'" @click:append="pwshow = !pwshow"
                              :label="$t('userCreate.password_confirm')" required solo></v-text-field>

              </div>

              <p class="login-error" v-if="errors.length">
                <b>{{$t('userCreate.submit_alert')}}</b>
              <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
              </p>

              <v-card-actions>
                <v-btn :disabled="!btnStatus" text class="next-btn" @click="ResetPasswordHandler">{{$t('generic.btn.confirm')}}</v-btn>
              </v-card-actions>


            </v-card>
          </v-form>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {resetPassword} from "@/apis/User";

export default {
  name: "resetPasswordForm",
  props: {},
  components: {

  },
  data() {
    return {
      lazy: false,
      loading: false,
      errors: [],
      pwshow: false,
      rules: {
        name_min: (v) => v.length >= 4 || "Min 4 characters",
        required: (v) => !!v || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match",
        isEmail: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      },
      password : "",
      confirmPassword : ""
    };
  },
  async created(){
    //console.log( this.$route.params.token );
  },
  computed: {
    btnStatus() {
      let _status = false;
      if( this.password && this.confirmPassword) {
        if (this.password === this.confirmPassword) {
          _status = true;
        }
      }
      return _status;
    },
  },
  methods: {
    async ResetPasswordHandler() {

      let response = await resetPassword({
        token: this.$route.params.token,
        password : this.password
      });
      console.log(response.data.response_code);
      console.log(response);

      if(response.data.response_code === 401){
        this.errors.push(this.$t("user.invalid_token"));
      } else {
        this.$noty.success(this.$t("user.reset_password_success"));
        this.$router.push("../Login");
      }

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

.next-btn {
  font-size: 18px !important;
  color: white !important;
  width: 162px;
  background-color: #9fcb3d;
  border: 1px solid #7ed321;
  border-radius: 27px;
  padding: 16px !important;
  height: 54px !important;
  margin: 14px 200px 21px;
}
</style>

<style>

.v-card__actions {
  padding: 0 !important;
  justify-content: center;
}

.reset-container{
  padding: 50px 110px;
}

@media(max-width: 550px) {
  .reset-container{
    padding: 90px 30px;
  }
}

.login-error {
  text-align: left;
  width: 270px;
  margin: 0 auto;
  color: red;
  font-size: 12px;
}
</style>
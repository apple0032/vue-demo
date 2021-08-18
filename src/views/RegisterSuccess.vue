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
    <v-row align="center" justify="center" style="margin-top: -150px">
      <v-col cols="12">
        <template>
          <v-form :lazy-validation="lazy">
            <v-card class="login-form-container mx-auto" max-width="800" min-height="550" outlined>
              <v-list-item three-line>
                <v-list-item-content>

                  <div>
                    <div class="d-inline">
                        <div class="login-title text-center">{{$t('user.registration')}}</div>
                    </div>
                  </div>

                </v-list-item-content>
              </v-list-item>


              <div class="success-container">
                <div class="success-title">{{$t('userCreate.success-title')}}</div>
                <div class="success-content">{{$t('userCreate.success-content')}}</div>
              </div>


              <v-card-actions>
                <v-btn text class="next-btn" @click="RegistrationHandler">{{$t('generic.btn.confirm')}}</v-btn>
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



export default {
  name: "registrationForm",
  props: {},
  components: {

  },
  data() {
    return {
      lazy: false,
      loading: false,
      errors: [],
    };
  },
  computed: {

  },
  methods: {
    async RegistrationHandler() {
      this.$router.push("Login");
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

.success-container{
  padding: 90px 110px;
}

@media(max-width: 550px) {
  .success-container{
    padding: 90px 30px;
  }
}

.success-title{
  color: #9FCB3D !important;
  font-size: 30px;
}

.success-content{
  margin-top: 20px;
}
</style>
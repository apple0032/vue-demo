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
    <v-container
        fill-height
    >
      <div class="login-background"></div>
        <v-row
            align="center"
            justify="center"
        >
            <v-col cols="12">
                <LoginForm />
            </v-col>
            <div class="lang-switch">
              <div class="lang-btn lang-en" :class="isAcitveLang('en')" @click="switchLanguage('en')">ENG</div>
              /
              <div class="lang-btn lang-zh" :class="isAcitveLang('zh')" @click="switchLanguage('zh')">繁中</div>
            </div>
        </v-row>
    </v-container>
</template>

<script>
import LoginForm from '../components/LoginForm'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  data(){
      return {
        alignmentsAvailable: [
            'start',
            'center',
            'end',
            'baseline',
            'stretch',
        ],
        alignment: 'center',
        dense: false,
        justifyAvailable: [
            'start',
            'center',
            'end',
            'space-around',
            'space-between',
        ],
        justify: 'center',
      }
  },
  methods: {
    isAcitveLang: function(lang){
      if(lang == this.$i18n.locale){
        return "isActive"
      }
      return ""
    },
    switchLanguage: async function(lang){
      this.$i18n.locale = lang
      this.$store.commit("setLanguage", lang)
    }
  }
}
</script>
<style>
.lang-switch{
  z-index: 1;
}
.lang-btn{
  width: 45px;
  height: 24px;
  display: inline-block;
  border-radius: 30px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  vertical-align: middle;
  padding-top: 1px;
  margin: 0 3px;
  cursor: pointer;
}

.isActive{
  background-color:#9fcb3d;
  color: white;
  pointer-events: none;
}
</style>
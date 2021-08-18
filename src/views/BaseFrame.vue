<style>
.v-application--wrap{
  background-image: none;
}
</style>
<template>
    <v-container 
        fluid
        class="mx-0 pa-0 main-container"
        style="height: 100%;"
        >
        <div class="header">
            <router-link to="/trainings">
                <div v-bind:class="showMainMenuButton">
                <v-img
                    class="header-icon"
                    v-bind:width="getLogoWidth"
                    src="@/assets/company_logo.svg" 
                    contain></v-img>
                    </div>
            </router-link>
            <div v-bind:class="showMainMenuLang">
                <div class="lang-btn lang-en" :class="isAcitveLang('en')" @click="switchLanguage('en')">ENG</div>
                /
                <div class="lang-btn lang-zh" :class="isAcitveLang('zh')" @click="switchLanguage('zh')">繁中</div>
            </div>
            <dropdown-menu
                v-bind:class="showMainMenuUser"
                v-model="showUserDropDown"
                :right="true"
            >
                <button class="btn btn-primary dropdown-toggle user-name ">

                  <div class="user_avatar" v-if="(userAvatar !== null)" :style="displayAvatar(userAvatar)"></div>
                  <div class="user_avatar default-avatar" v-else></div>

                  <div class="hidden-md-and-down user_displayName">{{userDisplayName}}</div>
                </button>
                <div slot="dropdown">
                    <a class="dropdown-item" @click="toProfile()">{{$t("user.profile")}}</a>
                    <a class="dropdown-item" @click="logout()">{{$t("user.logout")}}</a>
                </div>
            </dropdown-menu>
        </div>
            <div v-if="$store.getters.isAdmin || $store.getters.isContractor">
                <v-icon class="hidden-md-and-up main-menu-position" @click="mainMenuChange()" >mdi-menu</v-icon>
                <div v-bind:class="showMainMenu" >
                    <div class="d-flex flex-column flex-md-row justify-center" >
                    <div class="close-mobile-menu">
                      <div class="close-mobile-menu-btn" @click="closeMenu">
                        <svg width="20" height="20" viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.82 18.12L31.4122 4.39615C31.7886 3.9853 32 3.42807 32 2.84704C32 2.266 31.7886 1.70877 31.4122 1.29792C31.0358 0.887064 30.5253 0.65625 29.9931 0.65625C29.4608 0.65625 28.9503 0.887064 28.5739 1.29792L16.0017 15.0436L3.42948 1.29792C3.0531 0.887064 2.54263 0.656251 2.01035 0.656251C1.47808 0.656251 0.967606 0.887064 0.591231 1.29792C0.214856 1.70877 0.00341157 2.266 0.00341157 2.84704C0.00341156 3.42807 0.214856 3.9853 0.591231 4.39615L13.1834 18.12L0.591231 31.8439C0.40389 32.0468 0.255194 32.2881 0.153719 32.5539C0.0522447 32.8198 0 33.105 0 33.393C0 33.6811 0.0522447 33.9663 0.153719 34.2321C0.255194 34.498 0.40389 34.7393 0.591231 34.9422C0.777042 35.1467 0.998108 35.309 1.24168 35.4198C1.48524 35.5305 1.74649 35.5875 2.01035 35.5875C2.27421 35.5875 2.53546 35.5305 2.77903 35.4198C3.0226 35.309 3.24367 35.1467 3.42948 34.9422L16.0017 21.1965L28.5739 34.9422C28.7597 35.1467 28.9808 35.309 29.2244 35.4198C29.4679 35.5305 29.7292 35.5875 29.9931 35.5875C30.2569 35.5875 30.5182 35.5305 30.7617 35.4198C31.0053 35.309 31.2264 35.1467 31.4122 34.9422C31.5995 34.7393 31.7482 34.498 31.8497 34.2321C31.9512 33.9663 32.0034 33.6811 32.0034 33.393C32.0034 33.105 31.9512 32.8198 31.8497 32.5539C31.7482 32.2881 31.5995 32.0468 31.4122 31.8439L18.82 18.12Z" fill="#9FCB3D"/>
                        </svg>
                      </div>
                    </div>

                    <router-link to="/trainings" style="text-decoration:none !important;">
                        <div class="menu-main-pop" @click="closeMainMenu()"><span>{{$t("navigation.records")}}</span></div>
                    </router-link>
                    <router-link to="/dashboard" style="text-decoration:none !important;">
                        <div class="menu-main-pop" @click="closeMainMenu()"><span>{{$t("navigation.dashboard")}}</span></div>
                    </router-link>
                    <router-link to="/users" style="text-decoration:none !important;" v-if="$store.getters.isAdmin">
                        <div class="menu-main-pop" @click="closeMainMenu()"><span>{{$t("navigation.userList")}}</span></div>
                    </router-link>
                    </div>

                  <div class="switch-lang-mobile">
                    <div class="lang-btn lang-en lang-mobile" :class="isAcitveLang('en')" @click="switchLanguage('en')">ENG</div>/
                    <div class="lang-btn lang-zh lang-mobile" :class="isAcitveLang('zh')" @click="switchLanguage('zh')">繁中</div>
                  </div>

                </div>
            </div >
            <div v-else>-</div>


            <div class="adm-nav-container adm-nav hidden-sm-and-down" v-if="$store.getters.isAdmin || $store.getters.isContractor">
            <div class="adm-nav">
                <div class="d-flex flex-column flex-md-row justify-center" >
                    <router-link to="/trainings">
                        <div class="nav-btn">{{$t("navigation.records")}}</div>
                    </router-link>
                    <router-link to="/dashboard">
                        <div class="nav-btn">{{$t("navigation.dashboard")}}</div>
                    </router-link>
                    <router-link to="/users" v-if="$store.getters.isAdmin">
                        <div class="nav-btn">{{$t("navigation.userList")}}</div>
                    </router-link>
                </div>
            </div>
        </div>

        <div v-bind:class="showContentBackground">
            <router-view 
                class="content-container"
                default="listing"
            ></router-view>
        </div>
    </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import DropdownMenu from '@innologica/vue-dropdown-menu'
import User from '@/models/User'
export default {
    name: "BaseFrame",
    mounted(){
        if(!window.sessionStorage.getItem("CSW2020")){
            this.logout();
        }
    },
    components:{
        DropdownMenu
    },
    computed:{
        ...mapGetters({
            userDisplayName: "username",
            userAvatar : "userAvatar"
        }),
        showMenu() {
                return this.toggleMenu || this.$vuetify.breakpoint.mdAndUp
            },
        showMainMenu()
        {
            if (this.mainMenuDropdown)
                return "main-menu-active-class hidden-md-and-up"
            else
                return "main-menu-class hidden-md-and-up"
        },
        showMainMenuButton()
        {
            if (!this.$vuetify.breakpoint.mdAndUp)
                return "main-menu-button-mobile"
            else
                return "main-menu-button"
        },
        showMainMenuUser()
        {
            if (!this.$vuetify.breakpoint.mdAndUp)
                return "user-dropdown-option-mobile"
            else
                return "user-dropdown-option"
        },
        showMainMenuLang()
        {
            if (!this.$vuetify.breakpoint.mdAndUp)
                return "lang-switch-mobile"
            else
                return "lang-switch"
        },
        getLogoWidth()
        {
            if (!this.$vuetify.breakpoint.mdAndUp)
                return "200"
            else
                return "300"
        },
        showContentBackground()
        {

            if (!this.$vuetify.breakpoint.mdAndUp)
                if(this.mainMenuDropdown === true) {
                  return "content-background-mobile blur"
                } else {
                  return "content-background-mobile"
                }
            else
                return "content-background"
        },
        showLeftMenu()
        {
            if (!this.$vuetify.breakpoint.mdAndUp)
                return "left-menu-mobile"
            else
                return "left-menu"
        }
        
    },
    watch:{
            "$i18n.locale":function(){
                //this.userDisplayName = this.$store.getters.username
            }
                
    },
    data(){
        return {
            toggleMenu: true,
            mainMenuDropdown:false,
            //userDisplayName: this.$store.getters.username,
            showUserDropDown: false
        }
    },
    methods:{
        displayAvatar : function (url){

          let host = process.env.VUE_APP_IMAGE_DOMAIN;
          
          //let host = backend.replace("api", "");
          let avatar = host + url;

          return "background: url('"+avatar+"')";
        },
        closeMainMenu: function(){
           this.mainMenuDropdown = !this.mainMenuDropdown
        },
        toProfile: function(){
            // window.location = `/user/${this.$auth.user().id}`
            this.$router.push({
                name: "userView",
                params: {
                    id: this.$store.state.userInfo.id
                }
            })
        },
        logout: async function(){
            this.$store.commit('resetState')
            this.$auth.logout()
            this.$noty.success(this.$t("generic.logoutSuccess"))
            this.$router.push({name: 'Login'})
        },
        isAcitveLang: function(lang){
            if(lang == this.$i18n.locale){
                return "isActive"
            }
            return ""
        },
        switchLanguage: async function(lang){
            this.$i18n.locale = lang
            this.$store.commit("setLanguage", lang)

            let user =  await User.create()
            user.id = this.$store.state.userInfo.id
            await user.updateLanguage(lang)
        },
        mainMenuChange: function(){
            return this.mainMenuDropdown = !this.mainMenuDropdown
        },
        closeMenu: function(){
          this.mainMenuDropdown = false;
        },
    }
}
</script>
<style lang="scss">
:root {
    --header-height: 180px;
    --leftmenu-width:251px;
}
.header{
    position: absolute;
    width:100%;
    top:0;
    left: 0;
//  background-image: url('~@/assets/bg-main.png');
    background-image: url('~@/assets/top-menu-bg.png');
    background-size: 100% 100%;
    height: 320px;
}
.header-icon{
    margin-top: px;
    margin-left: 0px;
}




.content-background{
    background-color:transparent;
    position: relative;
    margin-top: 220px;
    height: calc(100% - var(--header-height));
    
//    margin-left: 251px;
    margin-left: 0px;
    z-index: 1000;
    border-radius: 10px;
    margin-right: 25px;
//    box-shadow: 0px 0px 5px 2px rgba(126, 211, 33, 0.2)
//    margin-left: 25px;

}

.content-background-mobile{
    margin-left: 0px;
    background-color:transparent;
    position: relative;
    top: var(--header-height);
    height: calc(100% - var(--header-height));
    z-index: 1000;
    border-radius: 10px;
    margin-right: 0px;
    padding-left:8px;
    padding-right:8px;
//    box-shadow: 0px 0px 5px 2px rgba(126, 211, 33, 0.2)
}

.main-container{
  background-color: #F8FAF7;
}


.user-dropdown-option{
    position: absolute;
    right: 0;
    top: 120px;
    margin-right: 49px;
    text-align:left;
    z-index: 1001;
}

.user-dropdown-option-mobile{
    position: absolute;
    right: 0;
    top: 80px;
    margin-right: 20px;
    text-align:left;
    z-index: 1001;
}


.user-name{
    outline: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 18px;font-weight: 500;
}
.user-name::after{
    content: url('~@/assets/icon-expand.svg');
    top: -2px;
    position: relative;
    margin-left: 7px;
}
.dropdown-menu{
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 10001;
    display: none;
    float: left;
    padding: .5rem 0;
    margin: .125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 4px;
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}
.dropdown-menu.show{
    display: block;
}
.dropdown-item{
    display: block;
    width: 100%;
    padding: .25rem 1.5rem;
    clear: both;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
    text-align: right;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: normal;
}
a.dropdown-item{
    color: #475f7b;
}
.dropdown-item:hover{
    background-color: #eeffe2;
    color: #5e9c1a;
}
/*translate fade (top to down)*/
.translate-fade-down-enter-active, .translate-fade-down-leave-active {
    transition: all 150ms;
    transition-timing-function: cubic-bezier(.53,2,.36,.85);
}
.translate-fade-down-enter, .translate-fade-down-leave-active {
    opacity: 0;
}
.translate-fade-down-enter, .translate-fade-down-leave-to {
    position: absolute;
}

.translate-fade-down-enter {
    transform: translateY(-10px);
}
.translate-fade-down-leave-active {
    transform: translateY(10px);
}

.adm-nav-container{
    position: absolute;
    width: 100%;
    top: 104px;
    height: 50px;
    z-index: 101;
    font-family: Avenir-Heavy, Helvetica, Arial, sans-serif;
}

.adm-nav-non-position{
    width: 100%;
    top: calc(var(--header-height) - 30px);
    height: 50px;
    z-index: 101;
    font-family: Avenir-Heavy, Helvetica, Arial, sans-serif;
}


.adm-nav-container .adm-nav{
    width: 500px;
    background-color: white;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    //background: #9fcb3d;
    //border: 1px solid #7ed321;
    padding: 10px;
    border-radius: 30px;
    margin: 0 auto;
    box-shadow: 0px 0px 10px #c8d92d;
}
.nav-btn{
  width: 130px;
  padding: 3px 18px;
  color: #324E4F;
  //background-color: #9fcb3d;
  //border-radius: 27px;
  margin-left: 27px;
  font-weight: 800;
  font-size: 14px;
  line-height: 15px;
  letter-spacing: 0.19px;
  display: inline-block;
  margin-left: unset;
  margin: 0 10px;
  contain: none;
  border: none;
  font-family: 'Avenir-Medium';

  &:hover{
    //background-color: #5e9c1a
    border-bottom: 2px solid #9FCB3D;
    color: black;
  }
}

.menu-main-pop{
  //width: 200px;
  padding: 3px 0px;
  color: #324E4F;
  //background-color: #9fcb3d;
  //border-radius: 27px;
  //margin-left: 27px;
  font-weight: 800;
  font-size: 28px;
  line-height: 25px;
  letter-spacing: 0.19px;
  margin-left: unset;
  margin: 25px 15px;
  contain: none;
  border: none;
  //&:hover{
    //background-color: #5e9c1a
    //border-bottom: 2px solid #9FCB3D;
  //}
 }
 


.main-menu-active-class .router-link-active > div{
    //background-color: #5e9c1a
    box-shadow: seagreen;
    color: black;
}

.main-menu-active-class .router-link-active > div > span{
  border-bottom: 5px solid #9FCB3D;
}

.adm-nav-container .router-link-active > div{
    //background-color: #5e9c1a
    border-bottom: 2px solid #9FCB3D;
    box-shadow: seagreen;
    color: black;
}
.lang-switch{
    position: absolute;
    right: 35px;
    top: 60px;
    display: flex
}

.lang-switch-mobile{
    display: none;
    position: absolute;
    right: 35px;
    top: 60px;
}


.lang-btn{
    width: 45px;
    height: 24px;
    //display: inline-block;
    border-radius: 30px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 14px;
    vertical-align: middle;
    line-height: 19.12px;
    padding-top: 1px;
    margin: 0 3px;
    cursor: pointer;
    letter-spacing: 0.96px;
    &.isActive{
        background-color:#324E4F;
        color: white;
        pointer-events: none;
    }
}
.main-menu-active-class{
    /*motion: ;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 14px;
    vertical-align: middle;
    line-height: 19.12px;
    padding-top: 1px;
    margin: 0 3px;
    cursor: pointer;
    letter-spacing: 0.96px;
    */
    border-radius: 10px;
    position: absolute;
    left: 20px;
    top: 60px;
    z-index: 1002;
    //background-color: white;
    //border: 1px solid #8d8b8b;
    box-shadow: #8d8b8b;
    width: 92%;
    //max-height: 260px;
    text-align: center;
    padding: 150px 0;
    height: 500px;
}

.main-menu-class{
    display: none;
}

.main-menu-position{
    position: absolute;left:20px;top:50px;background-color: transparent;
    display: inherit !important;
    font-size: 32px !important;
}

.main-menu-button-mobile{
    width: 100%;   
    text-align: -webkit-center;
    margin-top: 40px;
    //margin-left: 0px;
    padding-left: 0px;
}

.main-menu-button{
    width: 100%;  ;
    margin-top: 40px;
    padding-left: 40px;
    //margin-left: 40px;
}
.left-menu{
    margin: 0px;
}
.left-menu-mobile{
    display: none;
}
.search-field-user-wrapper{
    text-align: left;
}
.search-field-wrapper{
    text-align: left;
}

.chart-card {
  border-radius: 10px;
  box-shadow: 0 0 10px 0 #e8e8e8;
  border: solid 1px #e9e9e9;
  background-color: var(--white);
  position: relative;
  margin-left: 25px;
  box-shadow: 0px 0px 5px 2px rgb(126 211 33 / 20%);
}



#app .only-desktop{ display:block !important;}
#app .only-mobile{ display:none !important;}
@media screen and (max-width:900px){
    #app .only-desktop{ display:none !important;}
    #app .only-mobile{ display:block !important;}

    #app .chart-card {
    border-radius: 10px;
    box-shadow: 0 0 10px 0 #e8e8e8;
    border: solid 1px #e9e9e9;
    background-color: var(--white);
    position: relative;
    margin-left: 0px;
    }


    .content-background-mobile{
        top:100px;
    }
    #app .records-container{
        margin-left:21px;
        margin-right:21px;
    }
    #app .search-filter-container{
        margin-left:21px;
        margin-right:21px;

        .search-field-wrapper{
            .search-field{
                width: calc(100% - 50px);
            }
        }

        .search-field-user-wrapper{
            .search-field{
                width: 90%;
            }
        }


        .create-record-wrapper{
            justify-content: space-between;
            display: flex;
            flex-wrap: wrap;
        }

        .create-record-user-wrapper{
            justify-content: space-between;
            display: flex;
            flex-wrap: wrap;
            margin-top: 40px;
        }

        .create-record{
            margin-right: 10px;
        }
    }
}
@media screen and (max-width:480px){
    #app .search-filter-container{
        .create-record{
            margin-right: 0;
        }
        .filter-dropdown{
            margin-left:50%;
        }
    }

    #app .chart-card {
    border-radius: 10px;
    box-shadow: 0 0 10px 0 #e8e8e8;
    border: solid 1px #e9e9e9;
    background-color: var(--white);
    position: relative;
    margin-left: 0px;
    }

}

/*
.lang-zh{
    background-image:  url('~@/assets/button-chinese-inactive.svg');
}
.lang-zh.isActive, .lang-zh:hover{
    background-image:  url('~@/assets/button-chinese-active.svg');
}
.lang-en{
    background-image:  url('~@/assets/button-english-inactive.svg');
}
.lang-en.isActive, .lang-en:hover{
    background-image:  url('~@/assets/button-english-active.svg');
}*/


.user_avatar{
  width: 30px;
  height: 30px;
  display: inline-block;
  border-radius: 50%;
  background-size: cover !important;
  margin-right: 10px;
  margin-bottom: -7px;
}

.user_displayName{
  display: inline-block;
}

.default-avatar{
  background-image: url("~@/assets/default_avatar.png");
}

.close-mobile-menu{
  text-align: right;
  margin-top: -40px;
}

.close-mobile-menu-btn{
  padding-top: 5px;
  padding-right: 5px;
  cursor: pointer;
}

.lang-mobile{
  display: inline-block;
}

.blur{
  filter: blur(24px);
  pointer-events: none;
}

.switch-lang-mobile{
  margin-top: 60px;
}
</style>
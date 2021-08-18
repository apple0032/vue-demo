import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from './auth.js';
import _ from 'lodash'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

const initialState  = () => ({
    userInfo:{},
    accessToken: "",
    refreshToken: null,
    tokenExpiresIn: 0,
    language: "en",
    options:{
      // based on moment js
      displayFullDateTimeFormat: 'YYYY-MM-DD h:mm A',
      displayDateFormat: 'YYYY-MM-DD',
      displayTimeFormat: 'h:mm A',
      acceptedExtensions: process.env.NODE_ENV == "development" ? "" : ".exe,.apk,.zip,.tar,.tar.gz",
    },
    dashBoardData:{
        playCounts:10,
        downloadCounts:20,
        totalUsers:30,
        playData:[
            {
                    recordsDate:"2021-06-01",
                    count:5
                },
                {
                    recordsDate:"2021-06-02",
                    count:10
                },
                {
                    recordsDate:"2021-06-03",
                    count:20
                },
                {
                    recordsDate:"2021-06-04",
                    count:1
                },
                {
                    recordsDate:"2021-06-05",
                    count:5
                },
                {
                    recordsDate:"2021-06-06",
                    count:8
                },
                {
                    recordsDate:"2021-06-07",
                    count:25
                },
                {
                    recordsDate:"2021-06-08",
                    count:3
                }
            ]
        ,
        dowloadData:[{
                    recordsDate:"2021-06-01",
                    count:3
                },
                {
                    recordsDate:"2021-06-02",
                    count:7
                },
                {
                    recordsDate:"2021-06-03",
                    count:10
                },
                {
                    recordsDate:"2021-06-04",
                    count:13
                },
                {
                    recordsDate:"2021-06-05",
                    count:25
                },
                {
                    recordsDate:"2021-06-06",
                    count:4
                },
                {
                    recordsDate:"2021-06-07",
                    count:2
                },
                {
                    recordsDate:"2021-06-08",
                    count:10
                }
            ]
            
        
        
    }
})

export default new Vuex.Store({
    strict: debug,
    modules: {
        auth
    },
    plugins: [
        createPersistedState({
            key: process.env.VUE_APP_STATE_KEY,
            storage: window.sessionStorage
        })
    ],
    state: initialState,
    mutations: {
        setAccessToken(state, token){
            state.accessToken = token
        },
        setExpiresIn(state, expires_in){
            state.tokenExpiresIn = expires_in
        },
        setRefreshToken(state, token){
            state.refreshToken = token
        },
        setUserInfo(state, userInfo){
            state.userInfo = userInfo
        },
        resetState (state) {
          const initial = initialState()
          Object.keys(initial).forEach(key => { state[key] = initial[key] })
        },
        setLanguage(state, language){
            state.language = language
            state.userInfo.language = language
        }
    },
    actions: {
    },
    getters:{
        userID : state => {
            return state.userInfo.id
        },
        userInfo: state => {
            return state.userInfo
        },
        isContractor: state => {
            //return state.userInfo
            let isContractor = false
            if (state.userInfo.v2Info != null)
            {
                if(state.userInfo.v2Info.data.result.user_info.is_contractor_user == "1"){
                    isContractor = true
                }
            }
            return isContractor
        },
        currentLang: state => {
            return state.userInfo.lang ?? "en"
        },
        isAdmin: state => {

            let isAdmin = false;

            if(state.userInfo.v2Info.data.result.policy.v1 == "SuperAdmin"){
                isAdmin = true
            }

            return isAdmin
        },
        username: state => {
            let defaultLang = "en"
            if (state.userInfo.v2Info == null)
                return "" ;
            if(_.has(state, "language")){
                defaultLang = state.language 
            }
            let displayName = defaultLang == "en" ? state.userInfo.v2Info.data.result.user_info.contact_person_en : state.userInfo.v2Info.data.result.user_info.contact_person_zh

            // Use Chinese as first fallback
            if(displayName == ""){
                displayName = state.userInfo.v2Info.data.result.user_info.contact_person_zh;
            }

            // Use Chinese as second fallback
            if(displayName == ""){
                displayName = state.userInfo.v2Info.data.result.user_info.contact_person_en;
            }


            //console.log(state.userInfo.v2Info.data.result.user_info.contact_person_en);
            return displayName
        },
        dashboardData: state => {
            return state.dashBoardData
        },
        userAvatar : state => {
            if (state.userInfo.v2Info == null)
                return "" ;

            let avatar = state.userInfo.v2Info.data.result.user_info.user_avatar;
            //console.log(avatar);
            return avatar
        }
    }
}) 

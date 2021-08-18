import Vue from 'vue';
import {decodeToken} from '../lib/jwt'
import store from '../store'
import _ from 'lodash'
import {getV2UserInfoAPI} from '../apis/User';
const scope = "profile offline_access read:user create:user update:user delete:user read:device create:device update:device delete:device read:version create:version update:version delete:version read:training create:training update:training delete:training read:download create:download update:download delete:download read:dashboard create:dashboard update:dashboard delete:dashboard read:files upload:files"

export default {
    namespaced: true,

    state() {
        return {
            
        };
    },
    actions: {
        login(ctx, loginForm) {
            let data = {
                "grant_type": "password",
                "client_id": process.env.VUE_APP_CLIENT_ID,
                "client_secret": process.env.VUE_APP_CLIENT_SECRET,
                "username": loginForm.username,
                "password": loginForm.password,
                "audience": process.env.VUE_APP_JWT_AUDIENCE,
                "scope": scope
            }
            return new Promise((resolve, reject) => {
                Vue.auth.login({
                    url: process.env.VUE_APP_LOGIN_API,
                    data,
                    redirect: null,
                    staySignedIn: false,
                    fetchUser: false
                })
                .then(async(res) => {
                    let jwt = res.data.access_token

                    await decodeToken(jwt)
                        .then((decoded) => {
                            Vue.auth.token(null, jwt, false)
                            store.commit('setAccessToken', jwt)

                            let userInfo = decoded.userInfo;
                            let userID = userInfo.id;

                            async function getV2UserInfo() {
                                let v2Info = await getV2UserInfoAPI(userID);

                                userInfo.v2Info = v2Info;
                                store.commit('setUserInfo', userInfo);

                                if (_.has(res.data, "refreshToken")) {
                                    let refreshToken = res.data.refreshToken
                                    if (loginForm.remember) {
                                        window.localStorage.setItem('refreshToken', refreshToken)
                                    } else {
                                        window.localStorage.removeItem('refreshToken')
                                        store.commit('setRefreshToken', refreshToken)
                                    }
                                }
                                store.commit('setLanguage', decoded.userInfo.language)
                                store.commit('setExpiresIn', res.data.expires_in)
                            }
                            getV2UserInfo();

                        })
                        .catch((error) => {
                            reject(error)
                        })

                    Vue.router.push({
                         name: "trainings"
                    });

                    resolve(res);
                }, reject)
                .catch((err) => {
                    console.log('catch:', err)
                    reject(err)
                });
            });
        },
        logout() {
            Vue.auth.logout();
            Vue.router.push({
                 name: "Login"
            });
            return 
        },
    },

    getters: {
        isAdmin(){
            return true
        },
    }
}
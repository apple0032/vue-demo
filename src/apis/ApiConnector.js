import axios from 'axios';
import store from '../store'
import {
    clearStoredState,
    hasRefreshToken,
    getRefreshToken
} from '@/middlewares/authCheck'
import Vue from 'vue';
 
function getAccessToken(){
    return store.state.accessToken
}

// Create Axios Object
var ApiConnector = axios.create()

ApiConnector.interceptors.request.use(request => {
    request.headers['Authorization'] = `Bearer ${getAccessToken()}`;
    return request;
});

ApiConnector.interceptors.response.use((response) => {
    return response
}, function(error){
    const originalRequest = error.config;
    let refreshTokenRoute = process.env.VUE_APP_LOGIN_API
    if (
        error.response.status === 500
        || (error.response.status === 401 && originalRequest.url === refreshTokenRoute)
        || !hasRefreshToken()
    ) {
        clearStoredState()
        Vue.router.push({name: "Login"})
        return false
    }
 
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken =  getRefreshToken()
        return ApiConnector.post(refreshTokenRoute,{
            "grant_type" : "refresh_token",
            "client_id" : process.env.VUE_APP_CLIENT_ID,
            "client_secret" : process.env.VUE_APP_CLIENT_SECRET,
            "refresh_token": refreshToken,
        })
        .then(res => {
            if (res.status === 200) {
                store.commit('setAccessToken', res.data.access_token)
                store.commit('setExpiresIn', res.data.expires_in)
                ApiConnector.defaults.headers.common['Authorization'] = 'Bearer ' + getAccessToken();
                return ApiConnector(originalRequest);
            } else if(res.status === 401){
                window.location.href = "/login"
            }
        })
    }
    return Promise.reject(error);
})

export default ApiConnector

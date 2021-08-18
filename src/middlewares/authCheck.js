/**
 *  Authenticate
 */
import store from '@/store'
// import router from '@/router'
import {decodeToken} from '@/lib/jwt'
import _ from 'lodash'

export function hasJWT(){
    return store.state.accessToken !== ""
}

export async function isValidJWT(){
    return await decodeToken(store.state.accessToken)
    .then((decoded) => {
        console.log("isValidJWT.decoded", decoded)
    })
    .catch((error) => {
        console.log(error)
        return false
    })
}

export function getRefreshToken(){
    let token = null

    token = window.localStorage.getItem("refreshToken")

    if(token == null || token == ""){
        token = store.state.refreshToken
    }
    
    return token
}

export function hasRefreshToken(){
    let token = null

    token = window.localStorage.getItem("refreshToken")

    if(token == null || token == ""){
        token = store.state.refreshToken
    }
    
    return (token == null || token == "") ? false : true
}

/**
 * Check If User Has Required Scope
 * 
 * @param {String[]} requiredScope  String array for checking
 * @param {Boolean=true} matchAll   Control If all required scope need to match, default true 
 */
export async function userHasScope(requiredScope, matchAll = true){
    if(!hasJWT()){
        return false
    }

    let userScope = store.state.user.scope
    if(_.isEmpty(userScope)){
        userScope = await decodeToken(store.state.accessToken)
        .then((decoded) => {
            store.commit("setUserInfo", decoded)
            return decoded.scope.split(" ")
        })
    }
    let userHasRequiredScope = _.intersection(userScope, requiredScope)
    if(matchAll){
        let valid = true
        requiredScope.forEach((scope) => {
            if(!valid){ return }
            if(_.indexOf(userHasRequiredScope, scope) === -1){
                valid = false
            }
        })
        return valid
    } else {
        if(!_.isEmpty(userHasRequiredScope)){
            return true
        } else {
            return false
        }
    }
}

export function clearStoredState(){
    window.sessionStorage.clear()
    window.localStorage.clear()
    store.commit('setAccessToken', '')
    store.commit('setRefreshToken', '')
    // store.reset()
}

// function tokenIsExpired(expiredAt){
//     let expired = false
//     let currentTime = Math.floor(new Date().getTime() / 1000)
//     if(currentTime >= expiredAt){
//         expired = true
//     }
    
//     return expired
// }
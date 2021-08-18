<template>
    <div class="user-device-container">
        <div v-if="userHasNoDevices" @click="toProfile()">
            <div class="no-user-device">
                <p v-html="$t('trainingDetails.userHasNoRegisteredDevice')"></p>
            </div>
        </div>
        <div
            style="display:inline-block;"
            v-else
            :key="index"
            v-for="(device, index) in userDevices"
            >
            <div 
                class="user-device"
                @click="selectDevice(index, $event)"
            >{{device.deviceSerial}}</div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash'
//import UserDevices from '@/models/UserDevices'

export default {
    name: "UserDevices",
    props:{
        userDevices: Array
    },
    computed:{
        userHasNoDevices(){
            return _.isEmpty(this.userDevices)
        }
    },
    data(){
        return{}
    },
    methods:{
        selectDevice: function(index, event){
            this.removeAllSelectedDevice()
            event.target.classList.add("selected-device")
            this.$emit('select-device', {
                index,
                userDeviceId: this.userDevices[index].id,
                deviceTypeId: this.userDevices[index].deviceId
            })
        },
        removeAllSelectedDevice: function(){
            let elements = document.querySelectorAll(".selected-device")
            elements.forEach((element) => {
                element.classList.remove('selected-device');
            })
        },
        toProfile: function(){
            this.$router.push({
                name: "userDetails",
                params: {
                    id: this.$store.state.userInfo.id
                }
            })
        },
    }

}
</script>
<style scoped>
.user-device-container{
    text-align: left;
    margin-bottom: 16px;
}
.no-user-device{
    width: 474px;
    padding: 26px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(255, 101, 101, 0.33);
    background-color: white;
    -webkit-transition: box-shadow 150ms ease-in-out;
    -moz-transition: box-shadow 150ms ease-in-out;
    -ms-transition: box-shadow 150ms ease-in-out;
    -o-transition: box-shadow 150ms ease-in-out;
    transition: box-shadow 150ms ease-in-out;
}
.no-user-device:hover{
    cursor: pointer;
    box-shadow: 0 0 10px 0 rgba(255, 101, 101, 0.63);
}
.no-user-device p{
    margin: 0;
}
.no-user-device span{
    color: #cb3d3d;
}
.user-device{
    border-radius: 10px;
    border: solid 1px rgba(151, 151, 151, 0.26);
    background-color: white;
    padding: 15px 17px;
    margin: 0 10px 5px 10px;
}
.user-device:hover{
    cursor: pointer;
    border: solid 1px #9fcb3d;
}
.device-disabled{
    cursor: not-allowed !important;
    border: solid 1px rgba(151, 151, 151, 0.26) !important;
    background-color: #efefef;
    color: #c3c3c3 !important;
}
.selected-device{
    border: solid 1px #9fcb3d;
    background-color: rgba(159, 203, 61, 0.12);
}
</style>
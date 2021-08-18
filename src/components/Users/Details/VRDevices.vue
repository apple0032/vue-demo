<template>
    <div class="user-owned-devices-container">
        <v-row
        :key="index"
        v-for="(device, index) in userOwnedDevices"
        >
        <v-col
            :key="index2"
            v-for="(registeredDevice, index2) in device.userDevice"
            ><input :value="registeredDevice.deviceName"/>
            </v-col>
        
        </v-row>     
    </div>
</template>
<script>
// import _ from 'lodash'
import DeviceType from '@/models/DeviceType'
export default {
    name: "OwnedDevices",
    props:{
        ownedDevices: Array,
    },
    computed:{
    },
    async mounted(){},
    data(){
        return{
            isLoading: true,
            allDevices: [],
        }
    },
    methods:{
    }

}
</script>
<style scoped>
</style>
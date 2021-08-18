<template>
    <div class="user-owned-devices-container">
        <div
            class="device-group-container"
            :key="index"
            v-for="(device, index) in userDevices"
        >
            <div class="device-group">
                <div class="title">{{$t("userDetails.VRDeviceGroupTitle")}}</div>
                <v-select
                    v-model="device.deviceType.id"
                    :disabled="disableDeviceSelection(device.deviceType)"
                    outlined
                    class="select-device fields-width"
                    :items="defaultDevices.list"
                    item-disabled="disabled"
                    :item-text="deviceListText"
                    item-value="id"
                    dense
                    :width="242"
                    v-on:change="removeAddedDeviceFromDefaultDeviceList()"
                >
                </v-select>
                <div
                    class="add-quantity button-addNew"
                    @click="addQuantity(index)"
                >{{$t("userDetails.addQuantity")}}</div>
                <div
                    :key="index2"
                    v-for="(registeredDevice, index2) in device.userDevice"
                >
                    <div class="owned-device fields-width">
                        <div>Device {{(index2+1)}} Name (ID:{{registeredDevice.id}})</div>
                        <v-text-field
                            class="text-field d-inline-block"
                            dense
                            outlined
                            v-model="registeredDevice.deviceName"
                        ></v-text-field>
                        <div class="delete-icon-container">
                            <v-hover
                            v-slot:default="{ hover }"
                            >
                            <v-img
                                v-if="hover"
                                class="delete-icon"
                                :height="24"
                                :contain="true"
                                src="@/assets/icon-delete-green.svg"
                                @click="openConfirmDeleteDialog(index, index2, registeredDevice.id)"
                            ></v-img>
                            <v-img
                                v-else
                                class="delete-icon"
                                :height="24"
                                :contain="true"
                                src="@/assets/icon-delete.svg"
                            ></v-img>
                            </v-hover>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-left">
            <div 
                class="add-new-device-group button-addNew"
                @click="addNewDeviceGroup"
            >{{$t("userDetails.addNewDevice")}}</div>
        </div>
        <v-dialog 
            v-model="confirmDelete"
            :width="350"
        >
            <template>
                <div class="confirm-dialog-container">
                    <div class="confirm-dialog">
                        <div>{{$t("userDetails.confirmDeleteDevice")}}</div>
                        <div class="btn-group">
                            <v-btn @click="resetConfirmDelete">{{$t("generic.btn.cancel")}}</v-btn>
                            <v-btn color="error" @click="confirmDeleteDevice">{{$t("generic.btn.confirm")}}</v-btn>
                        </div>
                    </div>
                </div>
            </template>
        </v-dialog>
        <v-dialog 
            v-model="addNewDevice"
            :width="350"
        >
            <template>
                <div class="addNewDevice-dialog-container">
                    <div class="addNewDevice-dialog">
                        <v-text-field
                            v-model="newDeviceName"
                        >
                        </v-text-field>
                        <div class="btn-group">
                            <v-btn @click="resetAddNewDevice">{{$t("generic.btn.cancel")}}</v-btn>
                            <v-btn color="error" @click="confirmAddNewDevice">{{$t("generic.btn.confirm")}}</v-btn>
                        </div>
                    </div>
                </div>
            </template>
        </v-dialog>
    </div>
</template>
<script>
// import _ from 'lodash'
import DeviceType from '@/models/DeviceType'
import UserDevices from '@/models/UserDevices'
import _ from 'lodash'
export default {
    name: "OwnedDevices",
    props:{
        ownedDevices: Object,
    },
    computed:{
        deviceListText: function(){
            return "deviceNameEn"
        }
    },
    watch:{
        "ownedDevices": {
            deep: true,
            handler: function(){
                this.userDevices = this.ownedDevices
                console.log(this.userDevices)
            }
        },
        "userDevices":{
            deep: true,
            handler: function(){
                this.$emit("device-changes", this.userDevices)
            }
        }
    },
    async mounted(){
        this.model = await UserDevices.create()
        this.userDevices = this.ownedDevices
        this.defaultDevices = await DeviceType.create()
        this.removeAddedDeviceFromDefaultDeviceList()
    },
    data(){
        return{
            userDevices: [],
            isLoading: true,
            defaultDevices: [],
            defaultDevicesDropdown: [],
            allDevices: [],
            confirmDelete: false,
            deleteDeviceTypeIndex: 0,
            deleteOwnedDeviceId: 0,
            needDeleteDeviceId: [],
            addNewDevice: false,
            newDeviceTypeId: 0,
            newDeviceName: "",
            newDeviceTypeIndex: 0,
        }
    },
    methods:{
        removeAddedDeviceFromDefaultDeviceList: function(){
            let tmp = []
            Object.keys(this.userDevices).forEach((key) =>{
                if(!tmp.includes(this.userDevices[key].deviceType.id)){
                    tmp.push(this.userDevices[key].deviceType.id)
                }
            })

            if(!_.isEmpty(tmp)){
                Object.keys(this.defaultDevices.list).forEach((key) =>{
                    this.defaultDevices.list[key].disabled = false
                    if(tmp.includes(this.defaultDevices.list[key].id)){
                        this.defaultDevices.list[key].disabled = true
                    }
                    this.defaultDevicesDropdown.push(this.defaultDevices.list[key])
                })
            }

        },
        disableDeviceSelection: function(deviceType){
            if(_.has(deviceType, "isNew") && deviceType.isNew){
                return false
            }
            return true
        },
        openConfirmDeleteDialog: function(deviceTypeIndex, deviceIndex, deviceId){
            if(deviceId == 0){
                let tmpArray = this.userDevices[deviceTypeIndex].userDevice
                tmpArray.splice(deviceIndex, 1)
                this.$delete(this.userDevices[deviceTypeIndex], 'userDevice')
                this.$set(this.userDevices[deviceTypeIndex], 'userDevice', tmpArray)
            } else {
                this.deleteDeviceTypeIndex = deviceTypeIndex
                this.deleteDeviceIndex = deviceIndex
                this.deleteOwnedDeviceId = deviceId
                this.confirmDelete = true
            }
        },
        resetConfirmDelete: function(){
            this.confirmDelete = false
            this.deleteOwnedDeviceId = 0
        },
        confirmDeleteDevice: async function(){
            await this.model.deleteDevice(this.deleteOwnedDeviceId)
            let tmpArray = this.userDevices[this.deleteDeviceTypeIndex].userDevice
            tmpArray.splice(this.deleteDeviceIndex, 1)
            this.$delete(this.userDevices[this.deleteDeviceTypeIndex], 'userDevice')
            this.$set(this.userDevices[this.deleteDeviceTypeIndex], 'userDevice', tmpArray)

            this.confirmDelete = false
            this.deleteDeviceTypeIndex = 0
            this.deleteOwnedDeviceId = 0
            this.deleteDeviceIndex = 0
        },
        addQuantity: function(index){
            let tmpArray = this.userDevices[index].userDevice
            tmpArray.push({id: 0, deviceName:""})
            this.$delete(this.userDevices[index], 'userDevice')
            this.$set(this.userDevices[index], 'userDevice', tmpArray)
            this.userDevices[index].userDevice.splice()
        },
        resetAddNewDevice: function(){
            this.addNewDevice = false
            this.newDeviceTypeId = 0
            this.newDeviceName = ""
        },
        confirmAddNewDevice: async function(){
            await this.model.addDevice(this.newDeviceTypeId, this.newDeviceName)
            this.resetAddNewDevice()
            // this.$emit('update-user-devices')
        },
        addNewDeviceGroup: function(){
            let keyName = `new_device_${this.newDeviceTypeIndex}`
            this.$set(this.userDevices, keyName, {deviceType: {id: 0, isNew: true}, userDevice: []})
            this.newDeviceTypeIndex+=1
        }
    }

}
</script>
<style scoped>
.device-group-container{
    border: 1px solid #e9e9e9;
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 20px;
}
.device-group{
    width: 560px;
    text-align: left;
}
.device-group .title{
    opacity: 0.4;
    font-size: 14px;
    font-weight: 900;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #222222;
}
.fields-width{
    width: 350px;
}
.device-group .select-device{
    display: inline-block;
    margin-right: 20px;
}

.delete-icon-container{
    display:inline-block;
    height: 39px;
    margin-left:7px;
    cursor: pointer;
}
.delete-icon{
    top: 45%;
    position: relative;
    transform: translateY(-50%);
}
.delete-icon:hover{
    cursor: pointer;
}

.button-addNew{
    width: 170px;
    display: inline-block;
    border: 2px solid #9fcb3d;
    padding: 8px 20px;
    border-radius: 30px;
    color: #9fcb3d;
    font-size: 14px;
    font-weight: 900;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    cursor: pointer;
    position: relative;
}
.button-addNew:before{
    content: "+";
    position:absolute;
    left:14px;
}
.button-addNew:hover{
    color: #94bd38;
    border: 2px solid #94bd38;
}
</style>
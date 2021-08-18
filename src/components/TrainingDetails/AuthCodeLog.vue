<template>
    <v-card class="auth-code-log">
        <div class="header-container">
            <div class="title">{{$t("trainingDetails.authCodeLog")}}</div>
        </div>
        <v-data-table
            :headers="headers"
            :items="items"
            multi-sort
            :no-data-text="noData"
            :footer-props="{
                itemsPerPageOptions: [5,10,20,40],
                itemsPerPageText: rowsPerPage,
            }"
            class="elevation-1"
        >
            <template v-slot:item.createdAt="{item}">
                <div>{{$displayDateTime(item.createdAt, "long")}}</div>
            </template>
            <template v-slot:item.authenticationCode="{item}">
                <div class="auth-code">{{popupAuthCode(item.authenticationCode)}}</div>
            </template>
        </v-data-table> 
    </v-card>
</template>
<script>
import UserDevices from '@/models/UserDevices'
export default {
    name: "AuthCodeLog",
    props:{
        updateKey: {
            type: Number,
            default: 0
        },
        trainingRecordId: {
            type: Number,
            default: 0
        },
        selectedUserDeviceId: {
            type: Number,
            default: 0
        }
    },
    watch:{
        updateKey: async function(){
            await this.updateList()
        },
        selectedUserDeviceId: async function(){
            this.model.trainingRecordId = this.trainingRecordId
            this.model.selectedUserDeviceId = this.selectedUserDeviceId
            await this.updateList()
        },
        "$i18n.locale":function(){
            this.headers = this.loadHeaders()
        }
    },
    computed: {
        createVRVersion: function(){
            return `/training/edit/${this.$route.params.id}`
        },
        noData: function(){
            return this.$t("dataTable.noData")
        },
        rowsPerPage: function (){
            return this.$t("dataTable.rowsPerPage")
        }
    },
    async mounted(){
        this.model = await UserDevices.create()
    },
    data(){
        return {
            test:"ADS",
            headers: this.loadHeaders(),
            items:[]
        }
    },
    methods:{
        loadHeaders: function(){
            return [
                {
                    text: this.$t("dataTable.authCode.dateNTime"),
                    value: "createdAt"
                },
                {
                    text: this.$t("dataTable.authCode.versionEn"),
                    value: "Version.versionNameEn"
                },
                {
                    text: this.$t("dataTable.authCode.deviceName"),
                    value: "Device.deviceNameEn"
                },
                {
                    text: this.$t("dataTable.authCode.code"),
                    value: "authenticationCode"
                },
            ]
        },
        updateList: async function(){
            await this.model.getAuthCodeLog()
            this.items = this.model.authCodeLog
        },
        popupAuthCode: function(authCode){
            let code = authCode
            let middle = Math.floor(code.length / 2)
            let p1 = code.substring(0, middle)
            let p2 = code.substring(middle)

            return `${p1}-${p2}`
        }
    }
}
</script>
<style lang="sass" scoped>
.auth-code-log
    .header-container
        position: relative
        height: 92px
        width: 100%
        .title
            font-size: 20px
            position: absolute
            left: 0
            margin: 30px 16px
    .auth-code
        font-size: 24px
        color: #9fcb3d
</style>
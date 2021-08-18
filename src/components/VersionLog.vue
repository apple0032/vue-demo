<template>
    <div v-if="doneInitialize">
        <v-card class="version-log">
            <div class="header-container">
                <div class="title">{{$t("editTrainingDetails.versionLogTitle")}}</div>
                <!--<router-link :to="createVRVersion">
                    <div class="create-new-version">Create New Version</div>
                </router-link>-->
            </div>
            <v-data-table
                :headers="headers"
                :items="versionsModel.lists"
                :loading="isLoading"
                hide-default-footer
                :no-data-text="noData"
                :footer-props="{
                    itemsPerPageOptions: [5,10,20,40],
                    itemsPerPageText: rowsPerPage,
                }"
                class=""
            >
                <template v-slot:item.publishDate="{item}">
                    <div>{{$displayDateTime(item.publishDate, "long")}}</div>
                </template>
                <template v-slot:item.remarks="{item}">
                    <div v-html="versionRemarks(item.remarks)"></div>
                </template>
                <template v-slot:item.id="{item}">
                    <v-img
                        class="text-left"
                        :height="24"
                        :contain="true"
                        src="@/assets/icon-delete.svg"
                        @click="openConfirmDeleteDialog(item.id)"
                    ></v-img>
                </template>
            </v-data-table> 
        </v-card>
        <v-dialog 
            v-model="confirmDelete"
            :width="350"
        >
            <template>
                <div class="confirm-dialog-container">
                    <div class="confirm-dialog">
                        <div>{{$t("editTrainingDetails.confirmDeleteVersion")}}</div>
                        <div class="btn-group">
                            <v-btn @click="resetConfirmDelete">{{$t("generic.btn.cancel")}}</v-btn>
                            <v-btn color="error" @click="confirmDeleteVersion">{{$t("generic.btn.confirm")}}</v-btn>
                        </div>
                    </div>
                </div>
            </template>
        </v-dialog>
    </div>
</template>
<script>
import Versions from '@/models/Versions'
export default {
    name: "VersionLog",
    props:{
        deviceTypeId: {
            type: Number,
            default: 0
        },
        trainingRecordId: {
            type: Number,
            default: 0
        },
        needReloadTable:{
            type: Boolean,
            default: false,
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
    watch:{
        deviceTypeId: async function(){
            await this.reloadDataTable()
        },
        needReloadTable: async function(){
            await this.reloadDataTable()
        },
    },
    async mounted(){
        this.versionsModel = await Versions.create()
        this.doneInitialize = true
    },
    data(){
        return {
            doneInitialize: false,
            isLoading: false,
            confirmDelete: false,
            deletingVersionID: 0,
            headers: this.loadHeaders(),
            // headers: [
            //     {
            //         text: "Publish Date",
            //         value: "publishDate"
            //     },
            //     {
            //         text: "Version",
            //         value: "versionNameEn"
            //     },
            //     {
            //         text: "Remarks",
            //         value: "remarks"
            //     },
            //     {
            //         text: "",
            //         align: "center",
            //         sortable: false,
            //         filterable: false,
            //         value: "id"
            //     },
            // ],
        }
    },
    methods:{
        loadHeaders: function(){
            return [
                {
                    text: this.$t("dataTable.versionLog.dateNTime"),
                    value: "publishDate"
                },
                {
                    text: this.$t("dataTable.versionLog.versionEn"),
                    value: "versionNameEn"
                },
                {
                    text: this.$t("dataTable.versionLog.remarks"),
                    value: "remarks"
                },
                {
                    text: "",
                    align: "center",
                    sortable: false,
                    filterable: false,
                    value: "id"
                },
            ]
        },
        versionRemarks(remarks){
            if(remarks == undefined){
                return ""
            }
            return remarks.replace("\n", "<br />")
        },
        async reloadDataTable(){
            this.isLoading = true
            this.versionsModel = await Versions.create()
            this.versionsModel.deviceTypeId = this.deviceTypeId
            this.versionsModel.recordId = this.trainingRecordId
            await this.versionsModel.getVersionByDeviceIdAndTrainingRecordId(true)
            this.$emit("version-count", this.versionsModel.lists.length)
            this.$emit("done-reload")
            this.isLoading = false
        },
        openConfirmDeleteDialog(versionId){
            this.confirmDelete = true
            this.deletingVersionID = versionId
        },
        resetConfirmDelete(){
            this.confirmDelete = false
        },
        async confirmDeleteVersion(){
            try{
                await this.versionsModel.delete(this.deletingVersionID)
                this.deletingVersionID = 0
                await this.reloadDataTable()
                this.confirmDelete = false
            } catch(error){
                alert(error)
            }
        }
    }
}
</script>
<style lang="sass" scoped>
.version-log
    .header-container
        position: relative
        height: 92px
        width: 100%
        .title
            font-size: 20px
            position: absolute
            left: 0
            margin: 30px 16px
        .create-new-version
            color: white
            font-size: 20px
            position: absolute
            right: 0
            margin: 24px 18px
            background-color: #9fcb3d
            padding: 8px 27px
            border-radius: 27px
            border: 1px solid #7ed321
            cursor: pointer
            &:hover
                background-color: #b4e644
.confirm-dialog-container
    padding: 8px
    background-color: white
    .confirm-dialog
        min-height: 90px
        .btn-group
            margin-top: 20px
        .v-btn
            margin: 0 8px
</style>
<template>
  <div>
    <loading 
      :active.sync="isLoading"
      :is-full-page="false" 
      :z-index="100"
    />

    <div class="header-container">
      <BackButton
        title="Back"
        @back-action="backAction"
      />
      <div class="header_title">
        {{$t("dataTable.userlist.pending_apps")}}
      </div>
      <div class="header_approve_container">
      <div class="header_approve_btn" @click="openConfirmBatchDialog()">  {{$t("userList.BatchApprove")}} </div>
    </div>

    </div>
    <div v-if="!isLoading">

      <v-row 
        class="records-container"
        dense>
        <v-col>
            <v-data-table
                :headers="tableOptions.headers"
                :items="userList"
                item-key="id"
                :no-data-text="noData"
                :footer-props="{
                    itemsPerPageOptions: [5,10,20,40],
                    itemsPerPageText: rowsPerPage,
                }"
                class=""
                :search="search"

                show-expand
                >


                <template v-slot:item.user_info.is_contractor_user="{item}">
                  <div> {{ displayUserType( item )}} </div>
                </template>

                <template v-slot:item.active="{item}">
                  <div v-bind:class=" 'user_status_logo TR-'+displayStatus( item )"> {{ displayStatus( item )}} </div>
                </template>

                <template v-slot:item.action="{item}">

                  <div class="table_action">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" @click="openConfirmApproveDialog(item.id)">
                      <path d="M15.6335 0.5184C15.5276 0.411693 15.4017 0.326996 15.263 0.269197C15.1243 0.211398 14.9755 0.181641 14.8252 0.181641C14.6749 0.181641 14.5261 0.211398 14.3873 0.269197C14.2486 0.326996 14.1227 0.411693 14.0168 0.5184L5.53519 9.01144L1.97176 5.43662C1.86187 5.33047 1.73215 5.24701 1.59 5.19099C1.44786 5.13497 1.29607 5.1075 1.14331 5.11014C0.990548 5.11279 0.839803 5.14549 0.699681 5.20639C0.559559 5.26729 0.432805 5.3552 0.326655 5.46509C0.220505 5.57497 0.137038 5.70469 0.0810208 5.84684C0.0250032 5.98898 -0.00246884 6.14077 0.000174094 6.29353C0.00281703 6.44629 0.035523 6.59704 0.0964241 6.73716C0.157325 6.87728 0.245229 7.00404 0.355117 7.11019L4.72687 11.4819C4.83271 11.5886 4.95862 11.6733 5.09736 11.7311C5.23609 11.7889 5.3849 11.8187 5.53519 11.8187C5.68548 11.8187 5.83429 11.7889 5.97302 11.7311C6.11176 11.6733 6.23767 11.5886 6.34351 11.4819L15.6335 2.19196C15.749 2.08535 15.8413 1.95596 15.9044 1.81195C15.9674 1.66793 16 1.51241 16 1.35518C16 1.19796 15.9674 1.04243 15.9044 0.898417C15.8413 0.7544 15.749 0.62501 15.6335 0.5184Z" fill="#9FCB3D"/>
                    </svg>
                  </div>
                  <div class="table_action">
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" @click="openConfirmRejectDialog(item.id)">
                      <path d="M8.23373 6.99925L13.7428 1.4989C13.9075 1.33424 14 1.11091 14 0.878038C14 0.645168 13.9075 0.421835 13.7428 0.257171C13.5782 0.0925073 13.3548 0 13.122 0C12.8891 0 12.6658 0.0925073 12.5011 0.257171L7.00075 5.76627L1.5004 0.257171C1.33573 0.0925073 1.1124 2.06752e-07 0.87953 2.08487e-07C0.64666 2.10222e-07 0.423328 0.0925073 0.258664 0.257171C0.0939997 0.421835 0.00149256 0.645168 0.00149256 0.878038C0.00149256 1.11091 0.0939997 1.33424 0.258664 1.4989L5.76776 6.99925L0.258664 12.4996C0.176702 12.5809 0.111647 12.6776 0.0672522 12.7842C0.022857 12.8907 0 13.005 0 13.1205C0 13.2359 0.022857 13.3502 0.0672522 13.4568C0.111647 13.5633 0.176702 13.66 0.258664 13.7413C0.339956 13.8233 0.436672 13.8884 0.543233 13.9327C0.649794 13.9771 0.764091 14 0.87953 14C0.994969 14 1.10927 13.9771 1.21583 13.9327C1.32239 13.8884 1.4191 13.8233 1.5004 13.7413L7.00075 8.23224L12.5011 13.7413C12.5824 13.8233 12.6791 13.8884 12.7857 13.9327C12.8922 13.9771 13.0065 14 13.122 14C13.2374 14 13.3517 13.9771 13.4583 13.9327C13.5648 13.8884 13.6615 13.8233 13.7428 13.7413C13.8248 13.66 13.8898 13.5633 13.9342 13.4568C13.9786 13.3502 14.0015 13.2359 14.0015 13.1205C14.0015 13.005 13.9786 12.8907 13.9342 12.7842C13.8898 12.6776 13.8248 12.5809 13.7428 12.4996L8.23373 6.99925Z" fill="#EB5757"/>
                    </svg>
                  </div>

                </template>

              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <div class="expand-container">
                    <v-container class="form-container">
                      <v-row no-gutters class="row-container">
                        <v-col cols="12" sm="3">
                          <div class="expand-title"> {{$t("userCreate.contract_number")}} </div>
                          <div class="expand-value"> {{ item.user_info.contract_number }} </div>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <div class="expand-title"> {{$t("userCreate.contract_title")}} </div>
                          <div class="expand-value"> {{ item.user_info.contract_title }} </div>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <div class="expand-title"> {{$t("userCreate.expected_completion_date")}} </div>
                          <div class="expand-value">
                            <div v-if="item.user_info.completion_date != null">
                              {{ $displayDateTime(item.user_info.completion_date, "long") }}
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <div class="expand-title"> {{$t("userCreate.contract_sum")}} </div>
                          <div class="expand-value"> {{ item.user_info.contract_sum }} </div>
                        </v-col>
                      </v-row>
                      <v-row no-gutters class="row-container">
                        <v-col cols="12" sm="12">
                          <div class="expand-title"> {{$t("userCreate.address")}} </div>
                          <div class="expand-value"> {{ item.user_info.address }} </div>
                        </v-col>
                      </v-row>
                      <v-row no-gutters class="row-container">
                        <v-col cols="12" sm="6">
                          <div class="expand-title"> {{$t("userCreate.contact_person_zh")}} </div>
                          <div class="expand-value"> {{ item.user_info.contact_person_zh }} </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="expand-title"> {{$t("userCreate.contact_person_en")}} </div>
                          <div class="expand-value"> {{ item.user_info.contact_person_en }} </div>
                        </v-col>
                      </v-row>
                      <v-row no-gutters class="row-container">
                        <v-col cols="12" sm="6">
                          <div class="expand-title"> {{$t("userCreate.company_contact_number")}} </div>
                          <div class="expand-value"> {{ item.user_info.company_contact_number }} </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="expand-title"> {{$t("userCreate.user_contact_number")}} </div>
                          <div class="expand-value"> {{ item.user_info.user_contact_number }} </div>
                        </v-col>
                      </v-row>
                      <v-row no-gutters class="row-container">
                        <v-col cols="12" sm="12">
                          <div v-for="(document, index) in item.user_docs" :key="'info-'+ index" class="document-each">
                            <div class="doc_first_line">
                              {{$t("user.document")}} {{index+1}}
                              <span class="doc_link">
                          <a :href="document.url" target="_blank">
                            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 12C7.73478 12 7.48043 12.1054 7.29289 12.2929C7.10536 12.4804 7 12.7348 7 13V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V13C9 12.7348 8.89464 12.4804 8.70711 12.2929C8.51957 12.1054 8.26522 12 8 12ZM8.38 9.08C8.19898 8.99607 7.99698 8.9682 7.8 9L7.62 9.06L7.44 9.15L7.29 9.27C7.19489 9.3658 7.12016 9.47987 7.07032 9.60533C7.02048 9.73079 6.99656 9.86505 7 10C6.99924 10.1316 7.02446 10.2621 7.07423 10.3839C7.12399 10.5057 7.19732 10.6166 7.29 10.71C7.3851 10.801 7.49725 10.8724 7.62 10.92C7.73868 10.976 7.86882 11.0034 8 11C8.13161 11.0008 8.26207 10.9755 8.38391 10.9258C8.50574 10.876 8.61656 10.8027 8.71 10.71C8.80268 10.6166 8.87601 10.5057 8.92577 10.3839C8.97554 10.2621 9.00076 10.1316 9 10C9.00076 9.86839 8.97554 9.73793 8.92577 9.61609C8.87601 9.49426 8.80268 9.38344 8.71 9.29C8.6128 9.20167 8.50119 9.13064 8.38 9.08ZM16 6.94C15.9896 6.84813 15.9695 6.75763 15.94 6.67V6.58C15.8919 6.47718 15.8278 6.38267 15.75 6.3L9.75 0.3C9.66734 0.222216 9.57282 0.158081 9.47 0.11H9.37C9.27276 0.058003 9.16826 0.020922 9.06 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V7C16 7 16 7 16 6.94ZM10 3.41L12.59 6H11C10.7348 6 10.4804 5.89464 10.2929 5.70711C10.1054 5.51957 10 5.26522 10 5V3.41ZM14 17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H8V5C8 5.79565 8.31607 6.55871 8.87868 7.12132C9.44129 7.68393 10.2044 8 11 8H14V17Z" fill="#9FCB3D"/></svg>
                            Go to Link
                          </a>
                        </span>
                            </div>
                            <div class="doc_sec_line">
                              Note: {{ document.desc }}
                            </div>
                          </div>

                        </v-col>
                      </v-row>
                      <v-row no-gutters class="row-container">
                        <v-col cols="12" sm="12">
                          <div class="expand-title"> {{$t("userCreate.remarks")}} </div>
                          <div class="expand-value"> {{ item.user_info.remarks }} </div>
                        </v-col>
                      </v-row>
                    </v-container>

                  </div>
                </td>
              </template>

            </v-data-table>
        </v-col>
      </v-row>
      <v-dialog 
          v-model="confirmApprove"
          :width="350"
      >
          <template>
              <div class="confirm-dialog-container">
                  <div class="confirm-dialog">
                      <div>{{$t("userList.confirmApproveUser")}}</div>
                      <div class="btn-group">
                          <v-btn @click="resetConfirmDelete">{{$t("generic.btn.cancel")}}</v-btn>
                          <v-btn color="error" @click="confirmApproveUser">{{$t("generic.btn.confirm")}}</v-btn>
                      </div>
                  </div>
              </div>
          </template>
      </v-dialog>

      <v-dialog
          v-model="confirmReject"
          :width="350"
      >
        <template>
          <div class="confirm-dialog-container">
            <div class="confirm-dialog">
              <div>{{$t("userList.confirmRejectUser")}}</div>
              <div class="btn-group">
                <v-btn @click="resetConfirmReject">{{$t("generic.btn.cancel")}}</v-btn>
                <v-btn color="error" @click="confirmRejectUser">{{$t("generic.btn.confirm")}}</v-btn>
              </div>
            </div>
          </div>
        </template>
      </v-dialog>

      <v-dialog
          v-model="confirmBatch"
          :width="350"
      >
        <template>
          <div class="confirm-dialog-container">
            <div class="confirm-dialog">
              <div>{{$t("userList.confirmBatchApprove")}}</div>
              <div class="btn-group">
                <v-btn @click="resetBatch">{{$t("generic.btn.cancel")}}</v-btn>
                <v-btn color="error" @click="confirmBatchApprove">{{$t("generic.btn.confirm")}}</v-btn>
              </div>
            </div>
          </div>
        </template>
      </v-dialog>

    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import BackButton from '../components/BackButton'
import UserList from '@/models/UserList'
import {activateUser, approveUser, rejectUser , batchApproveUser} from "@/apis/User";

export default {
  name: 'UserList',
  components: {
    Loading,
    BackButton
  },
  computed:{
    isAdmin: function(){
      return true
    },
    noData: function(){
        return this.$t("dataTable.noData")
    },
    rowsPerPage: function (){
        return this.$t("dataTable.rowsPerPage")
    }
  },
  async mounted(){
    this.isLoading = true
    this.model = await UserList.create("pending")
    this.userList = this.model.listData
    this.pending = this.model.pending
    this.isLoading = false

    console.log(this.userList);
  },
  data(){
    return {
      pending : "",
      isLoading: false,
      search: '',
      filter:{
        search: "",
      },
      list: [],
      pagination:{},
      userList: [],
      tableOptions: {
          headers: this.loadHeaders(),
      },
      confirmApprove: false,
      confirmReject : false,
      confirmBatch : false,
      selectedUserID: 0,
      deletingStatus : ""
    }
  },
  methods: {
    displayUserType : function ( item ){
        if(item.user_info.is_contractor_user === 1){
          return "Contractor User";
        } else {
          if(item.policy.v1 === "SuperAdmin"){
            return "CIC User";
          } else {
            return "General User";
          }
        }
    },
    displayStatus: function ( item ){
      if(item.user_info != null) {

        if(item.pending === 1){
          return "PENDING";
        }

        if(item.active === 1){
          return "ACTIVE";
        } else {
          return "INACTIVE";
        }

      } else {
        return null;
      }
    },
    loadHeaders: function(){
        return [
              {
                text: this.$t("dataTable.userlist.status"),
                align: 'start',
                sortable: false,
                value: 'active',
              },
              {
                text: this.$t("dataTable.userlist.userID"),
                sortable: false,
                value: 'id',
              },
              {
                text: this.$t("dataTable.userlist.usertype"),
                sortable: false,
                value: 'user_info.is_contractor_user',
              },
              {
                text: this.$t("dataTable.userlist.userNameHK"),
                sortable: false,
                value: 'user_info.contact_person_zh',
              },
              {
                text: this.$t("dataTable.userlist.userNameEN"),
                sortable: false,
                value: 'user_info.contact_person_en',
              },
              {
                text: this.$t("dataTable.userlist.email"),
                sortable: false,
                value: 'user_info.user_email_address',
              },
              {
                text: '',
                sortable: false,
                value: 'action',
              },
          ]
    },
    updatelist: async function(status = null){
      this.isLoading = true
      await this.model.updateList(status)
      this.userList = this.model.listData
      this.isLoading = false
    },
    clearSearch: async function(){
      this.search.query = ""
      this.searchList()
    },
    searchList: async function(){
      if(this.search.query == ""){
        this.model.filter = {}
      } else {
        this.model.filter = {
          q: this.search.query
        }
      }
      await this.updatelist()
    },
    editUser: function(selectedUser){
      this.$router.push({
          name: "userView",
          params: {
              id: selectedUser
          }
      })
    },
    approveOneUser: async function(selectedUser){
      console.log ("approve-"+selectedUser);

      let response = await approveUser({
        user_id: selectedUser,
      });

      console.log(response);
      this.$noty.success(this.$t("generic.updateUserSuccess"));

      this.updatelist("pending");
    },

    rejectOneUser: async function(selectedUser){
      console.log ("approve-"+selectedUser);

      let response = await rejectUser({
        user_id: selectedUser,
      });

      console.log(response);
      this.$noty.success(this.$t("generic.updateUserSuccess"));

      this.updatelist("pending");
    },

    activeUser: async function(selectedUser){
      console.log ("activate-"+selectedUser);

      let response = await activateUser({
        user_id: selectedUser,
      });

      console.log(response);
      this.$noty.success(this.$t("generic.updateUserSuccess"));

      this.updatelist();
    },
    openConfirmApproveDialog(userID){
      this.confirmApprove = true
      this.selectedUserID = userID
    },
    resetConfirmDelete(){
        this.confirmApprove = false
    },
    async confirmApproveUser(){
      this.approveOneUser(this.selectedUserID);
      this.confirmApprove = false;
    },

    openConfirmRejectDialog(userID){
      this.confirmReject = true
      this.selectedUserID = userID
    },
    resetConfirmReject(){
      this.confirmReject = false
    },
    async confirmRejectUser(){
      this.rejectOneUser(this.selectedUserID);
      this.confirmReject = false;
    },

    openConfirmBatchDialog(){
      this.confirmBatch = true
    },
    resetBatch(){
      this.confirmBatch = false
    },
    async confirmBatchApprove(){

      let userObj = {};
      userObj.users = [];

      for (const user of this.userList) {
        (userObj.users).push(user.id);
      }

      if( (userObj.users).length > 0) {
        let userJSonString = JSON.stringify(userObj);
        let response = await batchApproveUser({
          users: userJSonString,
        });

        console.log(response);
        this.$noty.success(this.$t("generic.updateUserSuccess"));
        this.updatelist("pending");
      }

      this.confirmBatch = false
    },


    backAction: function(){
      this.$router.push({name: 'users'})
    }
  }
}
</script>
<style>
.theme--light.v-data-table tbody tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
  cursor: pointer;
}
.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--outlined .v-input__append-inner{
  margin-top: 4px;
}
.v-text-field .v-input__control .v-input__slot,
.v-text-field.v-text-field--solo .v-input__control
{
  min-height: 31px !important;
}
.v-application--is-ltr .v-text-field .v-input__append-inner{
  margin-top: 3px;
}
.v-list .v-list-item--active{
  background-color: #eeffe2 !important;
  color: #5e9c1a !important;
}
.v-list-item--dense, .v-list--dense .v-list-item:hover{
  background-color: #eeffe2 !important;
  color: #5e9c1a !important;
}
/* .search-filter-container{
  margin: 0 42px;
  padding-top: 30px;
}
.search-field{
  width: 303px; 
  display:inline-block; 
  left:0; 
  position: relative;
  border-radius: 10px !important;
}
.search-button{
  text-align: left;
  padding-left: 20px;
  padding-top: 41px;
}
.search-button-image{
  width: 38px;
  height: 38px;
  display: inline-block;
  background-image: url('~@/assets/icon-search.svg');
  top: 17px;
  margin-left: 9px;
} */
.filter-dropdown{
  max-width: 210px;
  float: right;
}

.record{
  margin-bottom: 20px;
}
.record:nth-child(1),
.record:nth-child(5n){
  padding-left: 0;
}
.record:nth-child(4n){
  padding-right: 0;
}

.vspButton {
  height: 22px;
  padding: 2px 7px;
  font-size: 12px;
  display: inline-block;
  margin: 0 8px;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: transparent;
  outline: none;
}
.vspButton:nth-child(1)::after{
  content: " Back"
}
.vspButton:last-child::before{
  content: "Next "
}
button[class="vspButton"]:not(:first-child):not(:last-child):hover{
  border-radius: 12px;
  border: 1px solid #7ed321;
}
.vspButton-selected{
  background-color: #7ed321;
  border-radius: 12px;
  color: white;
  }
.vspButtonFast{
  background-color: #f4f8fb;
  color: #b5b9bc;
}
.confirm-dialog-container{
  padding: 8px;
  background-color: white;
}
.confirm-dialog-container .confirm-dialog{
  min-height: 90px;
}
.confirm-dialog-container .confirm-dialog .btn-group{
  margin-top: 20px;
}
.confirm-dialog-container .confirm-dialog .v-btn{
  margin: 0 8px;
}
</style>


<style>
  .table_action{
    display: inline-block;
    margin-left: 15px;
  }

  .records-container{
    padding-bottom: 150px;
  }

  .TR-ACTIVE{
    background-color: #6FCF97;
  }

  .TR-INACTIVE{
    background-color: #324E4F;
  }

  .TR-PENDING{
    background-color: #7B61FF;
  }

  .user_status_logo{
    width: 100px;
    color: white;
    text-align: center;
    border-radius: 20px;
    padding: 5px 5px;
  }

  .v-data-table tbody tr.v-data-table__expanded__content{
    box-shadow: none !important;
    background: rgba(244, 249, 233, 0.5);
  }

  .expand-container{
    padding: 10px 80px;
  }

  @media(max-width: 500px) {
    .expand-container{
      padding: 5px 0;
    }
    .header_approve_container{
      float: none !important;
    }
  }

  .row-container{
    text-align: left;
    margin-bottom: 10px;
  }

  .expand-title{
    color: gray;
  }

  .expand-value{
    color: #324E4F;
    font-weight: bold;
  }

  .document-each {
    margin-bottom: 10px;
    font-weight: bold;
  }

  .doc_first_line{
    color: #324E4F;
  }

  .doc_sec_line{
    color: gray;
  }

  .doc_link{
    margin-left: 20px;
  }

  .header-container{
    padding-top: 20px;
    margin: 0 42px;
    text-align: left;
  }

  .back-button{
    margin-left: 10px;
  }

  .header_title{
    font-style: normal;
    font-weight: 100;
    font-size: 30px;
    color: #324E4F;
    margin-left: 10px;
    display: inline-block;
  }

  .header_pending{
    position: relative;
    display: inline-block;
    border: 1px solid #324E4F;
    color : #324E4F;
    border-radius:  30px;
    padding: 5px 20px;
    margin-left: 20px;
    cursor: pointer;
  }

  .header_pending span{
    position: absolute;
    top: -13px;
    left: 8px;
    background: #EB5757;
    padding: 2px;
    border-radius: 50%;
    color: white;
    width: 30px;
    text-align: center;
    zoom: 0.7;
  }

  .header_approve_container{
    display: inline-block;
    float: right;
  }

  .header_approve_btn{
    background-color: #9FCB3D;
    color: white;
    padding: 7px 30px;
    border-radius: 20px;
    cursor: pointer;
  }
</style>
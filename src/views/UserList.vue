<template>
  <div>
    <loading 
      :active.sync="isLoading"
      :is-full-page="false" 
      :z-index="100"
    />

    <div v-if="!isLoading"  class="layout-main">
      <div  v-bind:class="showLeftMenu" >
        <div>
          <v-row style="height: 40px">
            <v-col cols="12">
              <div class="left-menu-font" style="position: relative">
                {{ $t("trainingList.supportUserTypes") }}
              </div>
            </v-col>
          </v-row>
          <div class="left-menu-line"></div>
          <div>
          <ul >
            <li v-for="(item, index) in userTypes" :key="index">
                <v-checkbox class="left-menu-data-font"
                v-model="item.check"
                :label="item.userTypes_name"
                @change="reloadUserList();"
                ></v-checkbox>
            </li>
          </ul>          

          </div>    

          
        </div>


        <div style="margin-top:40px">
          <v-row style="height: 40px">
            <v-col cols="12">
              <div class="left-menu-font" style="position: relative">
                {{ $t("trainingList.supportAccountStatus") }}
              </div>
            </v-col>
          </v-row>
          <div class="left-menu-line"></div>
          <div>
          <ul >
            <li v-for="(item, index) in accountStatus" :key="index">
                <v-checkbox class="left-menu-data-font" 
                v-model="item.check"
                :label="item.accountStatus_name"
                @change="reloadUserList();"
                ></v-checkbox>
            </li>
          </ul>          

          </div>    

          
        </div>

      </div>

      

      <div v-bind:class="showRigthMenu" >

        <div class="header-container">
          <div class="header_title">
            {{$t("dataTable.userlist.title")}}
          </div>

          <div class="header_pending" @click="viewPending()">
            <span v-if="(this.pending > 0)">{{ this.pending }}</span>
            <div class="">{{ $t("dataTable.userlist.pending_apps") }}</div>
          </div>
        </div>
        <v-row
          class="search-filter-container"
          style=""
          >
          <v-col
                class="mx-0 px-0 search-field-user-wrapper"
                cols="12"
                md="6"
                sm="12"
              >
            <div style="width:100%">
              <v-text-field
                style=""
                class="user_listPage search-field shrink mx-0"
                :placeholder='$t("userList.searchPlaceHolder")'
                :clearable="true"
                outlined
                :hide-details="true"
                color="#9fcb3d"
                v-model="search"
                append-icon="mdi-magnify"
              ></v-text-field>
            </div>
          </v-col>
          <v-col
                class="mx-0 px-0 create-record-user-wrapper"
                cols="12"
                md="6"
                sm="12"
              >
              <v-img  
                  class="filter-button-image only-mobile"
                  @click="filterList()"
              ></v-img>
              <v-card v-bind:class="showFilterLeftMenu" >
              <div v-bind:class="showFilterLeftMenuContent">
                <v-img  
                    class="menu-filter-button-image"
                ></v-img>
                <div class="menu-filter-title-font">{{$t("trainingList.menuFilter")}}</div>
                <v-img
                    class="menu-filter-cancel-button-image"  @click="filterList()"
                ></v-img>

                <div>
                  <v-row style="height: 40px">
                    <v-col cols="10">
                      <div class="left-menu-font" style="position: relative">
                        {{ $t("trainingList.supportUserTypes") }}
                      </div>
                    </v-col>
                    <v-col cols="2">
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="#324E4F"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </v-col>
                  </v-row>
                  <div class="left-menu-line"></div>
                  <div>
                  <ul >
                    <li v-for="(item, index) in userTypes" :key="index">
                        <v-checkbox class="left-menu-data-font"
                        v-model="item.check"
                        :label="item.userTypes_name"
                        @change="reloadUserList();"
                        ></v-checkbox>
                    </li>
                  </ul>          

                  </div>    

                  
                </div>


                <div style="margin-top:40px">
                  <v-row style="height: 40px">
                    <v-col cols="10">
                      <div class="left-menu-font" style="position: relative">
                        {{ $t("trainingList.supportAccountStatus") }}
                      </div>
                    </v-col>
                    <v-col cols="2">
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="#324E4F"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </v-col>
                  </v-row>
                  <div class="left-menu-line"></div>
                  <div>
                  <ul >
                    <li v-for="(item, index) in accountStatus" :key="index">
                        <v-checkbox class="left-menu-data-font" 
                        v-model="item.check"
                        :label="item.accountStatus_name"
                        @change="reloadUserList();"
                        ></v-checkbox>
                    </li>
                  </ul>          

                  </div>    

                  
                </div>



              </div>
              </v-card>  
              <div 
                v-if="isAdmin"
                class="create-record"
                >
                <router-link to="/user/create">
                  <div class="cic-btn--secondary">{{$t("userList.createUser")}}</div>
                </router-link>
              </div>
          </v-col>
        </v-row>
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

                  <template v-slot:item.user_info.contact_person_zh="{item}">
                    <div class="user_avatar" v-if="(item.user_info.user_avatar !== null)" > <img :src="displayAvatar(item)"> </div>
                    <div class="user_avatar" v-else >  <img src="@/assets/default_avatar.png"> </div>
                    {{item.user_info.contact_person_zh}}
                  </template>

                  <template v-slot:item.action="{item}">

                    <div class="table_action">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" style="zoom: 1.1" @click="editUser(item.id)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.44635 9.33973L5.3033 13.1967L13.9814 4.51855C14.7802 3.71975 14.7802 2.42464 13.9814 1.62584L13.0172 0.6616C12.2184 -0.1372 10.9233 -0.1372 10.1245 0.6616L1.44635 9.33973ZM3.00969 14.643C3.49676 14.643 3.96592 14.4693 4.33433 14.1562L0.486853 10.3087C0.173722 10.6771 0 11.1463 0 11.6333V14.3021C0 14.4904 0.15263 14.643 0.340909 14.643H3.00969Z" fill="#9FCB3D"/>
                      </svg>
                    </div>
                    <div class="table_action">
                      <div v-if="displayStatus( item ) != 'PENDING'">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" style="zoom: 1.1" @click="activeUser(item.id)">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.12355 5.6862C3.07494 5.82595 2.98379 5.89583 2.85011 5.89583H1.03631C0.957315 5.89583 0.888956 5.86697 0.83123 5.80924C0.773504 5.75152 0.744641 5.68316 0.744641 5.60417V5.54036C1.13961 3.91189 1.95992 2.5918 3.20558 1.58008C4.45124 0.568359 5.90957 0.0625 7.58058 0.0625C8.46773 0.0625 9.33058 0.23112 10.1691 0.568359C11.0077 0.905599 11.752 1.38108 12.4022 1.99479L13.5871 0.81901C13.7025 0.703559 13.8393 0.645833 13.9972 0.645833C14.1552 0.645833 14.292 0.703559 14.4074 0.81901C14.5229 0.934462 14.5806 1.07118 14.5806 1.22917V5.3125C14.5806 5.47049 14.5229 5.6072 14.4074 5.72266C14.292 5.83811 14.1552 5.89583 13.9972 5.89583H9.91391C9.75593 5.89583 9.61921 5.83811 9.50376 5.72266C9.3883 5.6072 9.33058 5.47049 9.33058 5.3125C9.33058 5.15451 9.3883 5.0178 9.50376 4.90234L10.7616 3.64453C9.86226 2.81207 8.80193 2.39583 7.58058 2.39583C6.76634 2.39583 6.00679 2.59332 5.30193 2.98828C4.59707 3.38325 4.03197 3.92708 3.60662 4.61979C3.53978 4.72309 3.37876 5.07856 3.12355 5.6862ZM11.9009 12.5449C10.6613 13.5566 9.20904 14.0625 7.54411 14.0625C6.65696 14.0625 5.79867 13.8954 4.96924 13.5612C4.13981 13.227 3.40001 12.75 2.74984 12.1302L1.57406 13.306C1.4586 13.4214 1.32189 13.4792 1.1639 13.4792C1.00591 13.4792 0.869195 13.4214 0.753743 13.306C0.638292 13.1905 0.580566 13.0538 0.580566 12.8958V8.8125C0.580566 8.65452 0.638292 8.5178 0.753743 8.40235C0.869195 8.2869 1.00591 8.22917 1.1639 8.22917H5.24723C5.40522 8.22917 5.54194 8.2869 5.65739 8.40235C5.77284 8.5178 5.83057 8.65452 5.83057 8.8125C5.83057 8.97049 5.77284 9.10721 5.65739 9.22266L4.40869 10.4714C4.84011 10.8724 5.32926 11.1823 5.87614 11.401C6.42301 11.6198 6.99116 11.7292 7.58057 11.7292C8.3948 11.7292 9.15435 11.5317 9.85921 11.1367C10.5641 10.7418 11.1292 10.1979 11.5545 9.50521C11.6214 9.40191 11.7824 9.04644 12.0376 8.43881C12.0862 8.29905 12.1774 8.22917 12.311 8.22917H14.061C14.14 8.22917 14.2084 8.25803 14.2661 8.31576C14.3238 8.37348 14.3527 8.44184 14.3527 8.52084C14.3527 8.55122 14.3497 8.57249 14.3436 8.58464C13.9547 10.2131 13.1405 11.5332 11.9009 12.5449Z" fill="#9FCB3D"/>
                        </svg>
                      </div>
                      <div v-else>
                        <div style="width: 17px;"></div>
                      </div>
                    </div>
                    <div class="table_action">
                      <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg" @click="openConfirmDeleteDialog(item.id, displayStatus( item ))">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3306 2.5H12.9743C13.8368 2.5 14.5306 3.19375 14.5306 4.05625C14.5306 4.2625 14.3618 4.43125 14.1556 4.43125H0.955566C0.749316 4.43125 0.580566 4.2625 0.580566 4.05625C0.580566 3.19375 1.27432 2.5 2.13682 2.5H4.78057V1.91875C4.78057 0.8875 5.62432 0.0625 6.63682 0.0625H8.47432C9.50557 0.0625 10.3306 0.90625 10.3306 1.91875V2.5ZM6.63682 1.525C6.41182 1.525 6.22432 1.7125 6.22432 1.9375V2.51875H8.88682V1.9375C8.88682 1.7125 8.69932 1.525 8.47432 1.525H6.63682Z" fill="#9FCB3D"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.31807 17.9374C3.32432 17.9374 2.48057 17.1499 2.40557 16.1562L1.58057 5.43115H13.1118L12.2868 16.1562C12.2118 17.1687 11.3868 17.9374 10.3743 17.9374H4.31807ZM9.77432 7.83115C9.49307 7.83115 9.28682 8.05615 9.28682 8.31865V15.0499C9.28682 15.3312 9.51182 15.5374 9.77432 15.5374C10.0556 15.5374 10.2618 15.3124 10.2618 15.0499V8.31865C10.2618 8.0374 10.0368 7.83115 9.77432 7.83115ZM6.86807 8.31865C6.86807 8.05615 7.07432 7.83115 7.35557 7.83115C7.61807 7.83115 7.84307 8.0374 7.84307 8.31865V15.0499C7.84307 15.3124 7.63682 15.5374 7.35557 15.5374C7.09307 15.5374 6.86807 15.3312 6.86807 15.0499V8.31865ZM4.95557 7.83115C4.67432 7.83115 4.46807 8.05615 4.46807 8.31865V15.0499C4.46807 15.3312 4.69307 15.5374 4.95557 15.5374C5.23682 15.5374 5.44307 15.3124 5.44307 15.0499V8.31865C5.44307 8.0374 5.21807 7.83115 4.95557 7.83115Z" fill="#9FCB3D"/>
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
      </div>  
      <v-dialog 
          v-model="confirmDelete"
          :width="350"
      >
          <template>
              <div class="confirm-dialog-container">
                  <div class="confirm-dialog">
                      <div>{{$t("userList.confirmDeleteUser")}}</div>
                      <div class="btn-group">
                          <v-btn @click="resetConfirmDelete">{{$t("generic.btn.cancel")}}</v-btn>
                          <v-btn color="error" @click="confirmDeleteUser">{{$t("generic.btn.confirm")}}</v-btn>
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

import UserList from '@/models/UserList'
import {activateUser, deleteUser} from "@/apis/User";

export default {
  name: 'UserList',
  components: {
    Loading
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
    },
    showLeftMenu()
    {
            if (!this.$vuetify.breakpoint.mdAndUp)
                return "left-menu-mobile"
            else
                return "left-menu"
    },
    showFilterLeftMenu()
    {
            if (this.showLeftMenuFitler && !this.$vuetify.breakpoint.mdAndUp)
                return "left-menu-filter-user-mobile"
            else
                return "left-menu-filter"
    },
    showFilterLeftMenuContent(){
            if (!this.showLeftMenuFitler)
                return "left-menu-filter-show"
            else
                return "left-menu-filter-not-show"
    },
    showRigthMenu(){
            if (!this.$vuetify.breakpoint.mdAndUp)
                return "right-content-mobile"
            else
                return "right-content"
    }

  },
  async created(){

    if( (this.$store.getters.isAdmin) === false ){
      this.$noty.error("No permission.");
      this.$router.push({name: 'trainings'})
    }

  },
  async mounted(){
    this.isLoading = true
    this.model = await UserList.create()
    this.userList = this.model.listData
    this.pending = this.model.pending
    this.isLoading = false

    this.sourceUserList = this.userList;
    console.log(this.userList);
    //console.log(this.pending);
  },
  data(){
    return {
      showLeftMenuFitler:false,
      pending : "",
      isLoading: false,
      search: '',
      filter:{
        search: "",
      },
      list: [],
      pagination:{},
      userList: [],
      sourceUserList : [],
      tableOptions: {
          headers: this.loadHeaders(),
      },
      confirmDelete: false,
      deletingUserID: 0,
      deletingStatus : "",
      userTypes:[
        {
          userTypes_name: "CONTRACTOR USER",
          id: "1",
          check:1,
        },
        {
          userTypes_name: "CIC USER",
          id: "2",
          check:1,
        },
        {
          userTypes_name: "GENERAL USER",
          id: "3",
          check:1,
        }
      ],
      accountStatus:[
        {
          accountStatus_name: "ACTIVE",
          id: "ACTIVE",
          check:1,
        },
        {
          accountStatus_name: "INACTIVE",
          id: "INACTIVE",
          check:1,
        },
        {
          accountStatus_name: "PENDING",
          id: "PENDING",
          check:1,
        }
      ]      

    }
  },
  methods: {
    reloadUserList:function(){
      let userTypeArr = [];
      let userStatusArr = [];
      var userTypes = JSON.parse(JSON.stringify(this.userTypes));
      var userStatus = JSON.parse(JSON.stringify(this.accountStatus));

      (userTypes).forEach(function (v) {
        if(v.check !== false) {
          userTypeArr.push(v.id);
        }
      });
      (userStatus).forEach(function (v) {
        if(v.check !== false) {
          userStatusArr.push(v.id);
        }
      });

      //let filterUserObj = {userType : userTypeArr , userStatus : userStatusArr};
      //console.log(filterUserObj.userType);
      //this.updatelist(this.userTypes,this.accountStatus);
      //this.updatelist(filterUserObj);

      let tempArr = [];
      let newUserList = [];
      (this.sourceUserList).forEach(function (v) {


        if(userTypeArr.includes("1") ) {
          if( (v.user_info.is_contractor_user === 1) && (!tempArr.includes(v.id)) ){
            newUserList.push(v);
            tempArr.push(v.id);
          }
        } else {
          if( (v.user_info.is_contractor_user === 1) && (tempArr.includes(v.id)) ) {
            let c = 0;
            (newUserList).forEach(function (v2) {
              if (v.id === v2.id) {
                newUserList.splice(c, 1);
              }
              c++;
            });
          }
        }

        if(userTypeArr.includes("2") ) {
          if( (v.policy.v1 === "SuperAdmin") && (!tempArr.includes(v.id)) ){
            newUserList.push(v);
            tempArr.push(v.id);
          }
        } else {
          if( (v.policy.v1 === "SuperAdmin") && (tempArr.includes(v.id)) ){
            let c = 0;
            (newUserList).forEach(function (v2) {
              if (v.id === v2.id) {
                newUserList.splice(c, 1);
              }
              c++;
            });
          }
        }


        if(userTypeArr.includes("3") ) {
          if( (v.policy.v1 !== "SuperAdmin") && (v.user_info.is_contractor_user === 0) && (!tempArr.includes(v.id)) ){
            newUserList.push(v);
            tempArr.push(v.id);
          }
        } else {
          if( (v.policy.v1 !== "SuperAdmin") && (v.user_info.is_contractor_user === 0) && (tempArr.includes(v.id)) ){
            let c = 0;
            (newUserList).forEach(function (v2) {
              if (v.id === v2.id) {
                newUserList.splice(c, 1);
              }
              c++;
            });
          }
        }


        if(!userStatusArr.includes("PENDING") ) {
          if (v.pending === 1) {
            let c = 0;
            (newUserList).forEach(function (v2) {
              if (v.id === v2.id) {
                newUserList.splice(c, 1);
              }
              c++;
            });
          }
        }

        if(!userStatusArr.includes("ACTIVE") ) {
          if (v.active === 1  ) {
            let c = 0;
            (newUserList).forEach(function (v2) {
              if (v.id === v2.id) {
                newUserList.splice(c, 1);
              }
              c++;
            });
          }
        }

        if(!userStatusArr.includes("INACTIVE") ) {
          if (v.pending === 0 && v.active === 0 ) {
            let c = 0;
            (newUserList).forEach(function (v2) {
              if (v.id === v2.id) {
                newUserList.splice(c, 1);
              }
              c++;
            });
          }
        }


        //console.log(tempArr);
      });


      this.userList = newUserList;
    },
    filterList: function(){
      this.showLeftMenuFitler = !this.showLeftMenuFitler
    },
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
    displayAvatar : function (item){

      let host = process.env.VUE_APP_IMAGE_DOMAIN;
      
      //let host = backend.replace("api", "");

      let avatar = host+item.user_info.user_avatar;

      return avatar;
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
              // {
              //   text: this.$t("dataTable.userlist.lastUpdate"),
              //   sortable: false,
              //   value: 'updatedAt',
              // },
              {
                text: '',
                sortable: false,
                value: 'action',
              },
          ]
    },
    updatelist: async function(){
      this.isLoading = true
      await this.model.updateList()
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
    viewPending : function (){
      this.$router.push({
        path: '/users-pending'
      })
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
    openConfirmDeleteDialog(userID,status){
      this.confirmDelete = true
      this.deletingUserID = userID
      this.deletingStatus = status
    },
    resetConfirmDelete(){
        this.confirmDelete = false
    },
    async confirmDeleteUser(){

      let deleteRes = await deleteUser(this.deletingUserID);
      console.log(deleteRes);
      if(this.deletingStatus === "PENDING"){
        this.pending--;
      }

      this.confirmDelete = false
      this.updatelist();
    },
    isAcitveLang: function(lang){
            if(lang == this.$i18n.locale){
                return "isActive"
            }
            return ""
    },    
  }
}
</script>


<style>
  .table_action{
    display: inline-block;
    margin-left: 15px;
    cursor: pointer;
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

  .right-content{
    background-color: #fcfcfd;
                    border-radius: 10px;
                    box-shadow: 0px 0px 5px 2px rgb(146 158 193 / 20%);
                    width: 95%;
                    margin-left: 50px;
  }
  .right-content-mobile{
    background-color: #fcfcfd;
                    border-radius: 10px;
                    box-shadow: 0px 0px 5px 2px rgb(146 158 193 / 20%);
                    width: 100%;
  }


  .left-menu{
    width:256px;
  }

  .left-menu-mobile{
    width:0px;
    display: none;
  }

  .left-menu-filter-user-mobile{
    display: display;
    position: absolute;
    z-index: 1003;
    width: 376px;
    height: 500px;
  }

  .left-menu-filter{
    display: none;
  }

  .left-menu-filter-show{
    display: display;

  }
  .left-menu-filter-show{
    display: none;
  }

  .left-menu-line{
    position: static;
    left: 32px;

    mix-blend-mode: normal;
    opacity: 0.2;

    border: 1px solid #324E4F;
    width: 210px;
    flex: none;
    order: 1;
    flex-grow: 0;
    margin-top: 10px;
    margin-left: 25px;
  }



  ul {
    list-style-type: none;
  }

  .user_avatar{
    text-align: center;
  }

  .user_avatar img{
    width: 25px;
    height: 25px;
    display: inline-block;
    border-radius: 50%;
    background-size: cover;
    margin-bottom: -7px;
  }

  @media(max-width: 700px) {
    .header-container {
      margin: 0 10px !important;
    }

    .header_pending{
      float: right;
    }

    .create-record-user-wrapper{
      margin-top: 0 !important;
    }

    .search-filter-container{
      padding-top: 0 !important;
    }

    #app .search-filter-container .search-field-user-wrapper .search-field{
      width: 100% !important;
    }

  }

 .user_listPage .v-input__slot
  {
    min-height: 25px !important;
  }

  .user_listPage .v-input__append-inner{
    margin-top: 3px !important;
  }
</style>
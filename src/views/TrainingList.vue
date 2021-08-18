<template>
  <div>
    <loading :active.sync="isLoading" :is-full-page="false" :z-index="100" />
    <div v-if="!isLoading" class="layout-main">
      <div v-bind:class="showLeftMenu">
        <div>
          <v-row style="height: 40px">
            <v-col cols="12">
              <div class="left-menu-font" style="position: relative">
                {{ $t("trainingList.supportDevices") }}
              </div>
            </v-col>
          </v-row>
          <div class="left-menu-line"></div>

          <div class="devicesList-container">
            <ul>
              <li v-for="(item, index) in devices" :key="index">
                <v-checkbox
                  v-if="isAcitveLang('en')"
                  class="left-menu-data-font"
                  v-model="item.check"
                  :label="item.device_name_en"
                  @change="reloadRecordList();"
                ></v-checkbox>
                <v-checkbox
                  v-if="isAcitveLang('zh')"
                  class="left-menu-data-font"
                  v-model="item.check"
                  :label="item.device_name_zh"
                  @change="reloadRecordList();"
                ></v-checkbox>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-bind:class="showRigthMenu">
        <v-row class="search-filter-container" style="">
          <v-col
            class="mx-0 px-0 search-field-wrapper"
            cols="12"
            md="6"
            sm="12"
          >
            <div style="xposition: absolute">
              <v-text-field
                style=""
                class="search-field shrink mx-0"
                :placeholder="$t('trainingList.searchPlaceHolder')"
                :clearable="true"
                outlined
                :hide-details="true"
                color="#9fcb3d"
                v-model="search.query"
                @click:clear="clearSearch()"
                @keydown.enter="searchList()"
              ></v-text-field>
              <v-img class="search-button-image" @click="searchList()"></v-img>
            </div>
          </v-col>
          <v-col
            class="mx-0 px-0 create-record-wrapper"
            cols="12"
            md="6"
            sm="12"
          >
            <v-img
              class="filter-button-image only-mobile"
              @click="filterList()"
            ></v-img>
            <v-card v-bind:class="showFilterLeftMenu">
              <div v-bind:class="showFilterLeftMenuContent">
                <v-img class="menu-filter-button-image"></v-img>
                <div class="menu-filter-title-font">
                  {{ $t("trainingList.menuFilter") }}
                </div>
                <v-img
                  class="menu-filter-cancel-button-image"
                  @click="filterList()"
                ></v-img>
                <ul>
                  <li
                    v-for="(item, index) in devices"
                    :key="index"
                  >
                    <v-checkbox
                      v-if="isAcitveLang('en')"
                      class="left-menu-data-font"
                      v-model="item.check"
                      :label="item.device_name_en"
                      @change="reloadRecordList();"
                    ></v-checkbox>
                    <v-checkbox
                      v-if="isAcitveLang('zh')"
                      class="left-menu-data-font"
                      v-model="item.check"
                      :label="item.device_name_zh"
                      @change="reloadRecordList();"
                    ></v-checkbox>
                  </li>
                </ul>
              </div>
            </v-card>

            <div v-if="$store.getters.isAdmin" class="create-record">
              <router-link to="/record/create">
                <div class="cic-btn--secondary">
                  {{ $t("trainingList.createTraining") }}
                </div>
              </router-link>
            </div>
            <div style="width: 100%">
              <v-select
                height="31"
                class="filter-dropdown"
                v-model="filter.order"
                :items="orderDropdown"
                :hide-details="true"
                item-value="key"
                :item-text="dropdownLanguage"
                dense
                prepend-inner-icon="mdi-sort-variant"
                color="#9fcb3d"
                @change="updateSort($event)"
              ></v-select>
            </div>
          </v-col>
        </v-row>
        <v-row class="records-container" dense>
          <v-col
            class="record"
            v-for="item in list"
            :key="item.id"
            cols="12"
            md="4"
          >
            <ListingCard :item="item" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-pagination
              v-model="pagination.current"
              :length="pagination.total"
            />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import ListingCard from "../components/ListingCard";
import TrainingList from "@/models/TrainingList";
import {getDevicesV2} from "@/apis/Device";


export default {
  name: "TrainingList",
  components: {
    Loading,
    ListingCard,
  },
  computed: {
    showRigthMenu() {
      if (!this.$vuetify.breakpoint.mdAndUp) return "right-content-mobile";
      else return "right-content";
    },
    showLeftMenu() {
      if (!this.$vuetify.breakpoint.mdAndUp) return "left-menu-mobile";
      else return "left-menu";
    },
    showFilterLeftMenu() {
      if (this.showLeftMenuFitler && !this.$vuetify.breakpoint.mdAndUp)
        return "left-menu-filter-mobile";
      else return "left-menu-filter";
    },
    showFilterLeftMenuContent() {
      if (!this.showLeftMenuFitler) return "left-menu-filter-show";
      else return "left-menu-filter-not-show";
    },
  },
  watch: {
    "pagination.current": function (newVal) {
      this.switchPage(newVal);
    },
    "$i18n.locale": function () {
      if (this.$i18n.locale == "zh") {
        this.dropdownLanguage = "textZh";
      } else {
        this.dropdownLanguage = "textEn";
      }
    },
  },
  beforeCreate() {
    //console.log(this.$store.getters.userID);
  },
  async mounted() {

    this.isLoading = true;
    this.model = await TrainingList.create();
    this.list = this.model.listData;

    this.model.paginationParms.pageSize = this.model.pageSize;

    this.pagination = {
      current: 1,
      total: this.model.totalPage
    };

    this.isLoading = false;

    let devices = await getDevicesV2();
    this.devices = devices.result;

    let deviceArr = [];
    (this.devices).forEach(function (v) {
        deviceArr.push(v.id);
    });
    this.searchDevice = deviceArr;

    // let records = await getRecordsV2();
    // console.log(records.result);

    console.log(this.list);

  },
  
  data() {
    return {
      isLoading: false,
      showLeftMenuFitler: false,
      search: {
        query: "",
      },
      filter: {
        search: "",
        order: "latest",
      },
      dropdownLanguage: "textEn",
      orderDropdown: [
        {
          key: "latest",
          textEn: this.$t("trainingList.sorting.latest", "en"),
          textZh: this.$t("trainingList.sorting.latest", "zh"),
        },
        {
          key: "old",
          textEn: this.$t("trainingList.sorting.oldest", "en"),
          textZh: this.$t("trainingList.sorting.oldest", "zh"),
        },
        // {key: "alpha", text: this.$t("trainingList.sorting.alpha")}
      ],
      list: [],
      pagination: {
        current: 1,
        total: 0,
      },
      searchDevice : [],
      devices: [
        {
          device_name_en: "OCCULUS GO",
          device_name_zh: "testing chinese",
          id: "1",
          check: 0
        },
        {
          device_name_en: "OCCULUS QUEST",
          device_name_zh: "OCCULUS QUEST",
          id: "2",
          check: 1
        },
        {
          device_name_en: "OCCULUS QUEST2",
          device_name_zh: "OCCULUS QUEST2",
          id: "3",
          check: 0
        },
        {
          device_name_en: "OTHER",
          device_name_zh: "OTHER",
          id: "4",
          check: 1
        }
      ],
    };
  },
  methods: {
    updatelist: async function () {
      this.isLoading = true;
      await this.model.updateList();
      this.list = this.model.listData;

      this.pagination = {
        current: this.model.paginationParms.page,
        total: this.model.totalPage
      };

      // console.log("================");
      // console.log(this.model.totalPage);
      // console.log(this.model.paginationParms);
      // console.log("================");

      this.isLoading = false;
    },
    clearSearch: async function () {
      this.search.query = "";
      this.model.filter = {
        device : this.searchDevice
      };
      this.updatelist();
    },
    updateSort: function (sortKey) {
      this.model.sort = sortKey;
      this.model.filter = {
        device : this.searchDevice
      };
      this.updatelist();
    },
    filterList: function () {
      this.showLeftMenuFitler = !this.showLeftMenuFitler;
    },
    searchList: async function () {
      if (this.search.query == "") {
        this.model.filter = {};
      } else {
        this.model.filter = {
          q: this.search.query,
          device : this.searchDevice
        };
      }
      await this.updatelist();
    },
    switchPage: async function (opt) {
      this.model.paginationParms.page = opt;
      await this.updatelist();
    },
    isAcitveLang: function (lang) {
      if (lang == this.$i18n.locale) {
        return "isActive";
      }
      return "";
    },
    reloadRecordList : function (){

      //console.log(this.searchDevice);

      let deviceArr = [];
      (this.devices).forEach(function (v) {
        if(v.check === 1 || v.check === true){
          deviceArr.push(v.id);
        }
      });

      this.searchDevice = deviceArr;


      this.model.filter = {
        device : this.searchDevice,
        q: this.search.query
      };

      this.updatelist();
    }
  },
};
</script>
<style>
.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--outlined
  .v-input__append-inner {
  margin-top: 4px;
}
.layout-main .v-text-field .v-input__control .v-input__slot,
.layout-main .v-text-field.v-text-field--solo .v-input__control {
  min-height: 31px !important;
}
.v-application--is-ltr .v-text-field .v-input__append-inner {
  margin-top: 3px;
}
.v-list .v-list-item--active {
  background-color: #eeffe2 !important;
  color: #5e9c1a !important;
}
.v-list-item--dense,
.v-list--dense .v-list-item:hover {
  background-color: #eeffe2 !important;
  color: #5e9c1a !important;
}

.filter-dropdown {
  max-width: 210px;
  float: right;
}
.record {
  margin-bottom: 20px;
}
.record:nth-child(1),
.record:nth-child(5n) {
  padding-left: 0;
}
.record:nth-child(4n) {
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
.vspButton:nth-child(1)::after {
  content: " Back";
}
.vspButton:last-child::before {
  content: "Next ";
}
button[class="vspButton"]:not(:first-child):not(:last-child):hover {
  border-radius: 12px;
  border: 1px solid #7ed321;
}
.vspButton-selected {
  background-color: #7ed321;
  border-radius: 12px;
  color: white;
}
.vspButtonFast {
  background-color: #f4f8fb;
  color: #b5b9bc;
}
.theme--light.v-pagination .v-pagination__navigation {
  outline: 0;
  box-shadow: none;
}
.theme--light.v-pagination .v-pagination__item {
  border-radius: 27px;
  outline: 0;
}

.left-menu {
  width: 251px;
}

.left-menu-mobile {
  width: 0px;
  display: none;
}

.right-content {
  background-color: #fcfcfd;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgb(126 211 33 / 20%);
  width: 95%;
  margin-left: 50px;
}
.right-content-mobile {
  background-color: #fcfcfd;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgb(126 211 33 / 20%);
  width: 100%;
}

.left-menu-filter-mobile {
  display: display;
  position: absolute;
  z-index: 1003;
  width: 376px;
  height: 350px;
}

.left-menu-filter {
  display: none;
}

.left-menu-line {
  position: static;
  left: 32px;

  mix-blend-mode: normal;
  opacity: 0.2;

  border: 1px solid #324e4f;
  width: 200px;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin-top: 10px;
  margin-left: 25px;
}

ul {
  list-style-type: none;
}

.left-menu-filter-show {
  display: display;
}
.left-menu-filter-show {
  display: none;
}




.devicesList-container .v-label{
  font-size: 13px;
}

.devicesList-container li{
  list-style-type: none !important;
}
</style>

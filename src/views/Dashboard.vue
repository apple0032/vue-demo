<template>
  <div class="chart-card">
    <loading
      :active.sync="isLoading"
      :is-full-page="false"
        :z-index="100"
    />
    <div v-if="!isLoading" >
      <!-- Component content start here -->
      <div class="dashboard_container">
        <div
          class="text-left mb-5"
          style="font-size: 28px; font-weight: 300; height: 38px"
        >
          {{ $t("dashboard.dashboard") }}
        </div>
        <div class="d-flex flex-wrap " >
          <div>
              <v-img  
                  class="filter-button-image only-mobile"
                  @click="filterList()"
              ></v-img>
          </div>
          <div v-bind:class="showSearch" >
          <v-row>
            <v-col 
                class="mx-0 px-5 pa-2"
                cols="12"
                md="2"
                sm="6"
            >
                     <div class="filter-subtitle text-left">
                        {{ $t("dashboard.recordTitle") }}
                      </div>
                      <v-select
                        :items="trainingRecords"
                        item-text="trainingRecordName"
                        item-value="id"
                        :placeholder="placeholder.specificRecord"
                        v-model="filterOptions['trainingRecordId']"
                        @change="getkey($event)"
                      ></v-select>
            </v-col>        
            <v-col 
                class="mx-0 px-5 pa-2"
                cols="12"
                md="2"
                sm="6"
            >
                      <div class="filter-subtitle text-left">
                        {{ $t("dashboard.scenarioName") }}
                      </div>
                      <v-select
                        :items="scenerios"
                        item-text="key"
                        item-value="id"
                        :placeholder="placeholder.specificScenario"
                        v-model="filterOptions['scenerio']"
                      ></v-select>
            </v-col>      
            <v-col 
                class="mx-0 px-5 pa-2"
                cols="12"
                md="2"
                sm="6"
            >
                      <div class="filter-subtitle text-left">
                        {{ $t("dashboard.userName") }}
                      </div>
                      <v-text-field
                        name="s-user"
                        outlined
                        :placeholder="placeholder.specificUser"
                        v-model="filterOptions['userName']"
                        id="s-user"
                        :readonly="userNameReadOnly"
                      ></v-text-field>
            </v-col>
            <v-col 
                class="mx-0 px-5 pa-2"
                cols="12"
                md="3"
                sm="6"
            >
                      <div class="filter-subtitle text-left">
                        {{ $t("dashboard.from") }}
                      </div>
                      <v-menu
                        v-model="isStartDateMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="filterOptions['startDate']"
                            :placeholder="placeholder.startDate"
                            readonly
                            outlined
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="filterOptions['startDate']"
                          color="primary"
                          @input="isStartDateMenu = false"
                        ></v-date-picker>
                      </v-menu>
           
            </v-col>
            <v-col 
                class="mx-0 px-5 pa-2"
                cols="12"
                md="3"
                sm="6"

            >
                      <div class="filter-subtitle text-left">
                        {{ $t("dashboard.to") }}
                      </div>
                      <v-menu
                        v-model="isEndDateMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="filterOptions['endDate']"
                            :placeholder="placeholder.endDate"
                            readonly
                            outlined
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="filterOptions['endDate']"
                          color="primary"
                          @input="isEndDateMenu = false"
                          :min="filterOptions['startDate']"
                          :max="nowDate"
                        ></v-date-picker>
                      </v-menu>
            </v-col>
          </v-row>
          </div>
          <div class="dashboard_stat_container">
          <v-row>
          <v-col
              cols="12" md="4"
          >
            <div min-height="79px" class="data-card pl-4 pt-3 mr-5">
              <div class="text-left data-card-title text-uppercase">
                {{ $t("dashboard.totalPlayCounts") }}
              </div>
              <div class="text-left data-card-data">
                {{ dbdata.playCounts }}
              </div>
            </div>
          </v-col>
          <v-col
              cols="12" md="4"
          >
              <div min-height="79px" class="data-card pl-4 pt-3 mr-5">
                <div class="text-left data-card-title text-uppercase">
                  {{ $t("dashboard.totalDownload") }}
                </div>
                <div class="text-left data-card-data">
                  {{ dbdata.downloadCounts }}
                </div>
              </div>
          </v-col>
          <v-col
              cols="12" md="4"
          >
            <div min-height="79px" class="data-card pl-4 pt-3 mr-5">
              <div class="text-left data-card-title text-uppercase">
                {{ $t("dashboard.totalUsers") }}
              </div>
              <div class="text-left data-card-data">
                {{ dbdata.totalUsers }}
              </div>
            </div>
          </v-col>

          </v-row>
          </div>
        </div>
        <div class="chart-card-chart mt-5 pa-5">
          <highcharts :options="chartOptions" ref="chartComponent"></highcharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import {
  getRecordsV2
} from '@/apis/TrainingList'

import {
  getKey,
  getDashboardData
} from "@/apis/Dashboard";
import store from "@/store";
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
import dataModule from "highcharts/modules/data";
import exportData from "highcharts/modules/export-data";

exportingInit(Highcharts)
dataModule(Highcharts);
exportData(Highcharts);

export default {
  name: "Dashboard",
  components: {
    Loading,
  },
  async mounted() {

    let isContractorUser = (this.$store.getters.userInfo).v2Info.data.result.user_info.is_contractor_user ;

    if( ( (this.$store.getters.isAdmin) === false ) && ( isContractorUser === 0 ) ){
      this.$noty.error("No permission.");
      this.$router.push({name: 'trainings'})
    }

    this.isLoading = true;
    await this.fetchDashboardData();
    await this.fetchTrainRecords();
    //await this.fetchScenerios()
    this.chartDataCreator();
    this.isLoading = false;
    this.scenerios = [];

    if( this.$store.getters.isContractor ) {
      this.userNameReadOnly = true;
      this.filterOptions.userName = this.$store.getters.userID;
    }

  },
  computed: {
     // ...mapGetters({
     //        dbdata: "dashboardData",
     //    }),
    showSearch()
    {
      if (!this.showSearchApplied && this.$vuetify.breakpoint.mdAndUp)
          return "show-search"
      if (this.showSearchApplied && !this.$vuetify.breakpoint.mdAndUp)
          return "show-search-mobile"
      if (!this.showSearchApplied && !this.$vuetify.breakpoint.mdAndUp)
          return "not-show-search"
      return "show-search"
    },
    nowDate: () => {
      return new Date().toISOString().slice(0, 10);
    },
    computedFilters: function () {
      let _filters = {
        ...this.filterOptions,
      };
      if (this.filterOptions.startDate && this.filterOptions.endDate) {
        _filters["dateRange"] = [
          this.filterOptions.startDate,
          this.filterOptions.endDate,
        ];
      }
      return _filters;
    },
  },
  data() {
    return {
      userNameReadOnly : false,
      dashboardData: null,
      scenerios: null,
      trainingRecords:[{
                  trainingRecordName: "ALL",
                  id:-1,
      }] ,
      showSearchApplied:false,
      // totalPlayCounts: 0,
      // filteredTotalDevice: 0, // temp use for filteredTotalDevice
      // filteredTotalDownload: 0, // temp use for filteredTotalDevice
      // filteredTotalPlayCounts: 0, // temp use for filteredTotalPlayCounts

      chartData: null,

      isStartDateMenu: false,
      isEndDateMenu: false,

      //isFilterDownloadApplied: false,

      isFetchingData: false,
      isLoading: false,
      filterOptions: {
        trainingRecordId: -1,
        startDate: "",
        endDate: "",
        scenerio: "",
        userName:"",
      },
      dbdata:{
        playCounts:10,
        downloadCounts:20,
        totalUsers:30,
        playData:[
          {
            recordsDate:"2021-06-01",
            count:5
          },
          {
            recordsDate:"2021-06-02",
            count:10
          },
          {
            recordsDate:"2021-06-03",
            count:20
          },
          {
            recordsDate:"2021-06-04",
            count:1
          },
          {
            recordsDate:"2021-06-05",
            count:5
          },
          {
            recordsDate:"2021-06-06",
            count:8
          },
          {
            recordsDate:"2021-06-07",
            count:25
          },
          {
            recordsDate:"2021-06-08",
            count:3
          }
        ]
        ,
        dowloadData:[{
          recordsDate:"2021-06-01",
          count:3
        },
          {
            recordsDate:"2021-06-02",
            count:7
          },
          {
            recordsDate:"2021-06-03",
            count:10
          },
          {
            recordsDate:"2021-06-04",
            count:13
          },
          {
            recordsDate:"2021-06-05",
            count:25
          },
          {
            recordsDate:"2021-06-06",
            count:4
          },
          {
            recordsDate:"2021-06-07",
            count:2
          },
          {
            recordsDate:"2021-06-08",
            count:10
          }
        ]



      },
      //recordTitleFilter: "",
      chartOptions: {
          exporting:{
            enabled:true,
            csv: {
              itemDelimiter: ';'
            },
            buttons: {
              contextButton : {
                y : -40
              }
            }
          },
          chart: {
                  type: 'spline',
                  zoomType: 'xy',
                  spacingTop:50
              },
              title: {
                  text: ''
              },
              // subtitle: {
              //     text: 'Irregular time data in Highcharts JS'
              // },
              xAxis: {
                  type: 'datetime',
                  dateTimeLabelFormats: { // don't display the dummy year
                      month: '%e %b',
                      year: '%b'
                  },
                  title: {
                      text: 'Date'
                  },
                  // lineWidth: 1,
                  // lineColor: '#8097B1'                  
              },
              credits: {
                enabled: false,
              },
              yAxis: {
                  title: {
                      text: '',
                      style: {
                          color: "#324e4f",
                          fontWeight: "bold",
                      },
                  },
                  min: 0,
                  labels: {
                      style: {
                          color: '#666666'
                      }
                  },
                   lineWidth: 1,
                   lineColor: '#8097B1',
              },
              tooltip: {
                  headerFormat: '<b>{series.name}</b><br>',
                  pointFormat: '{point.x:%e. %b }: {point.y:.0f} '
              },
              legend:{
                //layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                floating: true,
                symbolHeight: 11,
                symbolWidth: 11,
                symbolRadius: 0,
                itemMarginTop: -50,
                itemMarginBottom: -50,
                backgroundColor: '#ffffff',
              },
              plotOptions: {
                  series: {
                      marker: {
                          enabled: true
                      }
                  }
              },
              series: [
                      
                      ],
              colors: ['#9FCB3D', '#3A96FD'],        
              responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        plotOptions: {
                            series: {
                                marker: {
                                    radius: 2.5                                }
                            }
                        }
                    }
                }]
            }
        // chart: {
        //   type: "spline",
        // },
        // credits: {
        //   enabled: false,
        // },
        // title: {
        //   text: "",
        // },
        // xAxis: {
        //   title: {
        //     text: this.$t("dashboard.date"),
        //     margin: 21,
        //     style: {
        //       color: "#324e4f",
        //       fontWeight: "bold",
        //     },
        //   },
        //   allowDecimals: false,
        //   gridLineWidth: 1,
        //   //   min: 0.5,
        //   //   max: cat.length - 1.5,
        //   startOnTick: true,
        //   endOnTick: false,
        //   labels: {
        //     style: {
        //       fontWeight: "800",
        //       textTransform: "uppercase",
        //     },
        //     formatter: function () {
        //       return moment(this.value).format("MMM D"); // clean, unformatted number for year
        //     },
        //   },
        // },
        // yAxis: {
        //   title: {
        //     text: this.$t("dashboard.playcounts"),
        //     margin: 21,
        //     style: {
        //       color: "#324e4f",
        //       fontWeight: "bold",
        //     },
        //   },
        //   labels: {
        //     style: {
        //       fontWeight: "800",
        //       textTransform: "uppercase",
        //     },
        //     formatter: function () {
        //       return this.value;
        //     },
        //   },
        // },
        // legend: { enabled: true },
        // series: [
        //   {
        //     data: [],
        //   },
        // ],
        // plotOptions: {
        //   area: {
        //     fillOpacity: 0.3, // 指定所有面积图的透明度
        //     marker: {
        //       enabled: false,
        //       symbol: "circle",
        //       radius: 2,
        //       states: {
        //         hover: {
        //           enabled: true,
        //         },
        //       },
        //     },
        //   },
        // },
      },
      placeholder: {
        startDate: this.$t("dashboard.filter.startDate"),
        endDate: this.$t("dashboard.filter.endDate"),
        specificRecord: this.$t("dashboard.filter.specificRecord"),
        specificScenario: this.$t("dashboard.filter.specificScenario"),
        specificDevice: this.$t("dashboard.filter.specificDevice"),
        sepecficVersion: this.$t("dashboard.filter.sepecficVersion"),
        specificUser: this.$t("dashboard.filter.specificUser"),
      },
    };
  },
  watch: {
    filterOptions: {
      deep: true,
      async handler() {
        //await this.fetchScenerios();
        await this.fetchDashboardData();
        this.chartDataCreator();
      },
    },
  },
  methods: {
    filterList: function(){
      this.showSearchApplied = !this.showSearchApplied;
    },
    chartDataCreator: function () {
    if (this.dbdata == null)
      return ;
    let chartArray =[ {
                          name: "DOWNLOADS",
                          data:[],
                          marker: {
                            symbol: 'cross',
                            lineColor: null,
                            lineWidth: 4
                          }  
                        },
                        {
                          name: "PLAY-COUNTS",
                          data:[],
                          marker: {
                            symbol: 'cross',
                            lineColor: null,
                            lineWidth: 4
                          }
                        }

      ];


      this.dbdata.playData.forEach(function(items){
            let itemd = new Date(items.recordsDate);
            //console.log( itemd.getFullYear() + "/" + itemd.getMonth() + "/" + itemd.getDate());
            chartArray[1].data.push([Date.UTC(itemd.getFullYear(),itemd.getMonth(),itemd.getDate()),items.count]) ;
      });

      this.dbdata.dowloadData.forEach(function(items){
            let itemd = new Date(items.recordsDate);
            chartArray[0].data.push([Date.UTC(itemd.getFullYear(),itemd.getMonth(),itemd.getDate()),items.count]) ;
      });

      this.chartOptions.series=chartArray;
    },
    async getkey (id){
      this.fetchScenerios(id);
    },
    fetchScenerios: async function (id) {

      let keys = await getKey(id);
      let datatrans = [
        {
          key: "ALL",
          id: ""
        }
      ];
      this.scenerios = [];

      (keys.result).forEach(function (item) {
        datatrans.push({
          key: item.key,
          id:item.key
        });
      });

      this.scenerios = datatrans

    },    
    fetchTrainRecords: async function () {

      this.trainingRecords = [];
      let records = await getRecordsV2();
      let newRecords = [
        {
          trainingRecordName: "ALL",
          id:-1
        }
      ];
      (records.result).forEach(function (v) {
        newRecords.push({
          trainingRecordName: v.training_record_name_en,
          id: v.id,
        })
      });

      this.trainingRecords = newRecords;

      /*
      let response = await getAllRecords();
      let datatrans = [{
                  trainingRecordName: "ALL",
                  id:-1,
      }];
      this.trainingRecords = [];
      if (response.data.data != null)
      {
            let lang = this.$i18n.locale;
            response.data.data.forEach(function (item) {
                let langData = item.trainingRecordNameEn ;
                if ( lang == "zh") 
                  langData = item.trainingRecordNameZh ;
                datatrans.push({
                    trainingRecordName: langData,
                    id:item.id
                });
            });
          this.trainingRecords = datatrans;
      }
       */


    },
    fetchDashboardData: async function () {
      this.isFetchingData = true;
      console.log(this.computedFilters);


      this.dbdata.playData = [];
      this.dbdata.dowloadData = [];


      let response = await getDashboardData(this.computedFilters);
      console.log(response.data);

      this.chartOptions.series = [];
      let newPlayData = [];
      let newDownloadData = [];
      let playCounts = 0;
      let downloadCounts = 0;

      if( (response.data.result).length > 0 ){
          (response.data.result).forEach(function (item) {
            let date =  (moment(item.recordsDate).format(store.state.options.displayDateFormat) )
            let obj = {recordsDate : date, count : item.count }
            var parsedobj = JSON.parse(JSON.stringify(obj))

            if(item.type  === "playCounts") {
              newPlayData.push(parsedobj);
              playCounts += item.count
            }
            if(item.type  === "download") {
              newDownloadData.push(parsedobj);
              downloadCounts += item.count
            }
          });
      }

      this.dbdata.playData = newPlayData;
      this.dbdata.dowloadData = newDownloadData;

      console.log("--------PLAY--------");
      console.log(newPlayData);
      console.log("--------PLAY--------");

      console.log("--------DOWNLOAD--------");
      console.log(newDownloadData);
      console.log("--------DOWNLOAD--------");

      this.dbdata.playCounts = playCounts;
      this.dbdata.downloadCounts = downloadCounts;

      this.dbdata.totalUsers = response.data.totalUser;

      this.isFetchingData = false;
    },
  },
};
</script>

<style scoped>

.data-card {
  height: 79px;
  border-radius: 5px;
  box-shadow: 0 5px 10px -10px rgba(0, 0, 0, 0.2);
  border: solid 1px #eaf0f7;
  background-color: var(--white);
  overflow: hidden;
}
.data-card-title {
  height: 16px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #324E4F;
  white-space: nowrap;
}
.data-card-data {
  height: 33px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #9FCB3D;
}


.chart-title {
  height: 27px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 20px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--dark-grey-blue);
}

.chart-filter-btn {
  width: 37px;
  height: 32px;
  border: solid 1px #e4e5eb;
  background-color: var(--white);
}

.filter-card {
  width: 685px;
  height: 385px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 #e8e8e8;
  border: solid 1px #e9e9e9;
  background-color: var(--white);
}
.filter-subtitle {
  opacity: 0.4;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #222222;
}

.chart-card-chart {
  border-radius: 10px;
  box-shadow: 0 0 10px 0 #e8e8e8;
  border: solid 1px #e9e9e9;
  background-color: var(--white);
  position: relative;
}

.show-search-mobile{
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 #e8e8e8;
    border: solid 1px #e9e9e9;

}

.show-search{
  width:100%;height: 90px; 
}

.not-show-search{
  display: none;
}

.v-application .mr-5 {
  margin-right: 0 !important;
}

.dashboard_container{
  padding: 30px 45px
}

.dashboard_stat_container{
  width:100%;
  margin-left: 10px;
}

@media(max-width: 700px) {
  .dashboard_container{
    padding: 30px 20px !important;
  }

  .dashboard_stat_container{
    margin-left: 0 !important;
  }
}

</style>
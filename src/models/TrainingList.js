import store from '@/store'

import BaseList from '@/models/BaseList'
import {
    getRecordsV2
} from '@/apis/TrainingList'
import _ from 'lodash'
// import {
//     uploadCadImage,
//     updateCadImage,
//     deleteCadImage
// } from '@/apis/cadImages'
// import _ from 'lodash'

class TrainingList extends BaseList{
    constructor(){
        super()
        this.id = store.state.currentContractId

        this.sort = "latest"
        this.filter = {}
        
        this.errors = []
    }
    /**
     * Hack to have async constructor
     */
    static async create(){
      const model = new TrainingList
      await model.init()
      return model
    }

    /**
     * All variable which require async can be assign here
     */
    async init(){
      await this.updateList()
    }

    /**
     * Check if there are any errors, return Boolean
     */
    hasError(){
        return  !_.isEmpty(this.errors)
    }

    async updateList(){
      let filter = this.generateFilter()
        //console.log(filter);
      let response = await getRecordsV2(this.paginationParms, filter)
      this.listData = response.result

        //console.log( (this.listData).length );
        //console.log(this.paginationParms);

        this.pageSize = 12;
        var offset = this.paginationParms.pageSize * (this.paginationParms.page - 1);
        var limit = this.paginationParms.pageSize * this.paginationParms.page;
        if(limit === 100){ limit = this.pageSize; }
        this.totalPage = Math.ceil(((this.listData).length/this.pageSize));

        //console.log(offset);console.log(limit);
        // console.log("--------------");
        // console.log(this.totalPage);
        // console.log("--------------");

        this.listData =  this.listData.slice(offset,limit)

      this.pagination = {
          total: this.totalPage
      }

      this.totalCount = Number(this.pagination.rowCount)
    }

    generateFilter(){
      let filter = {}
      if(this.filter.q !== ""){
        filter.q = this.filter.q
      }
      switch(this.sort){
        case "latest":
          filter.sort = "updated_at"
          filter.sortOrder = "desc"
          break
        case "old":
          filter.sort = "updated_at"
          filter.sortOrder = "asc"
          break
      }

        if(this.filter.device !== ""){
            filter.device = this.filter.device
        }

      return filter
    }
}

export default TrainingList
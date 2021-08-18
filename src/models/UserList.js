import BaseList from '@/models/BaseList'
import {
    getListv2
} from '@/apis/User'
import _ from 'lodash'

class UserList extends BaseList{
    constructor(){
        super()

        this._filter = {}
        
        this.errors = []
    }
    /**
     * Hack to have async constructor
     */
    static async create(status = null){
      const model = new UserList
      await model.init(status)
      return model
    }

    /**
     * All variable which require async can be assign here
     */
    async init(status){
      await this.updateList(status)
    }

    /**
     * Check if there are any errors, return Boolean
     */
    hasError(){
        return  !_.isEmpty(this.errors)
    }

    async updateList(filterUserObj = null){

      let filter = this.generateFilter()
      let response = await getListv2(this.paginationParms, filter, filterUserObj)
      this.listData = response.data.result;
      //this.pagination = response.data.pagination
        this.pagination = {page: 1 , pageSize : 100, rowCount: 20, pageCount :1}

      this.totalCount = response.data.total;
      this.pending =   response.data.pending;
    }

    generateFilter(){
      let filter = {}
      if(_.has(this.filter, "q") && this.filter.q !== ""){
        filter.q = this.filter.q
      }
      filter.active = 1

      return filter
    }
}

export default UserList
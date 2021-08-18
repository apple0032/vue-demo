/**
 * Base class for listing page
 */
class BaseList {
    constructor(){
      this.totalCount = 0
      this.listData = null
      // this.itemPerPage = [10,30,50]
      this.defaultItemsPerPage = 6
      this.options = {}
      this.paginationParms = {
        orderBy: "",   
        orderDirection: "", // "" = asc, "-" = desc
        page: 1,
        //pageSize: this.defaultItemsPerPage,
        pageSize: 100 //default total items
      }
    }
}

export default BaseList
import _ from 'lodash'
/**
 * Generate Order String, Descending should output as -id
 * 
 * @param {string} orderBy 
 * @param {string} [orderDirection=asc]
 */
export function generateOrderString(orderBy, orderDirection="asc"){
    if(typeof orderBy === "undefined" || orderBy === ""){
        return '';
    }

    let direction = "";
    if(orderDirection == "desc"){
        direction = "-";
    }

    let orderString = direction+orderBy

    return orderString
}

export function parsePaginationParams(paginations = {}, options = {}){
    // Define Default Params
    let page = ("page" in paginations) ? paginations["page"] : 1;
    let pageSize = ("pageSize" in paginations) ? paginations["pageSize"] : 10;
    let order = ""
    let orderDirection = ("orderDirection" in paginations) ? paginations["orderDirection"] : "asc"
    if("orderBy" in paginations){
        order = generateOrderString(paginations["orderBy"], orderDirection)
    }

    // Create Params For Paginations
    let params = {
        page,
        pageSize
    }
    if(order !== ""){
        params['order'] = order
    }

    // Set Additional Options To the Params
    if(!_.isEmpty(options)){
        for(var key in options) {
            params[key] = options[key]
        }
    }
    
    return params
}

/**
 * Default Scope, note Auth API will only return valid scope if user has the access rights
 */
export function getUserScope(){
    let scope = [
        "profile",
        "read:role",
        "create:role",
        "delete:role",
        "read:user",
        "create:user",
        "update:user",
        "delete:user",
        "read:company",
        "create:company",
        "update:company",
        "delete:company",        
        "read:contract",
        "create:contract",
        "update:contract",
        "delete:contract",
        "read:nqaa",
        "create:nqaa",
        "update:nqaa",
        "delete:nqaa",
        "archive:nqaa",
        "create:nqaa_inspection",
        "update:nqaa_inspector",
        "create:nqaa_inspection_review",
        "create:nqaa_review",
        "read:disciplines",
        "create:disciplines",
        "update:disciplines",
        "delete:disciplines",
        "read:subdisciplines",
        "create:subdisciplines",
        "update:subdisciplines",
        "delete:subdisciplines",
        "read:materialbrands",
        "create:materialbrands",
        "update:materialbrands",
        "delete:materialbrands",
        "read:inspectiontypes",
        "create:inspectiontypes",
        "update:inspectiontypes",
        "delete:inspectiontypes",
        "read:files",
        "upload:files"
      ]

    return scope.join(' ')
}
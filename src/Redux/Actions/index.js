import * as types from './../Constant/types'

export const viewListAll = (list) => {
    return{
        type: types.viewList,
        list
    }
}

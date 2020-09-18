import * as types from './../Constant/types';

export const changeStatusIcon = (index, indexitem) => {
    return {
        type: types.changeStatus,
        index,
        indexitem
    };
}

export const checkButton = (list, item, index, indexitem) => {
    return {
        type: types.checkTwoButton,
        list,
        item,
        index,
        indexitem
    };
}

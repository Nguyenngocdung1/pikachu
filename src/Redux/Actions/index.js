import * as types from './../Constant/types';

export const changeStatusIcon = (index, indexitem) => {
    return {
        type: types.changeStatus,
        index,
        indexitem
    };
}

export const checkButton = (item, index, indexitem) => {
    return {
        type: types.checkTwoButton,
        item,
        index,
        indexitem
    };
}

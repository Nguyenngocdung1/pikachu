import { call, put, fork, take, all } from 'redux-saga/effects'
import * as types from './../Redux/Constant/types'

let checkRequest = 0;
let checkObj = [];

function* watcherClick() {
    while(true) {
        const action = yield take(types.checkTwoButton);
        yield fork(getTwoClick, action);
    }
}

const checkLineX = (list, x1, x2, y1, y2) => {
    let min = Math.min(y1, y2);
    let max = Math.max(y1, y2);
    if(x1 === x2) {
        for(let i = min; i <= max; i++) {
            if(!list[x1][i].status) {
                return false;
            }
        }
        return true;
    }
}

const checkLineY = (list, x1, x2, y1, y2) => {
    let min = Math.min(x1, x2);
    let max = Math.max(x1, x2);
    if(y1 === y2) {
        for(let i = min; i <= max; i++) {
            if(!list[i][y1].status) {
                return false;
            }
        }
        return true;
    }
}

const checkRectX = (list) => {
    let pMin = checkObj[0];
    let pMax = checkObj[1];
    if(pMin.indexItem > pMax.indexItem) {
        pMin = checkObj[1];
        pMax = checkObj[0];
    }
    for(let y = pMin.indexItem + 1; y < pMax.indexItem; y++) {
        if (
            checkLineX(list, pMin.index, pMin.index, pMin.indexItem, y) &&
            checkLineY(list, pMin.index, pMax.index , y, y) &&
            checkLineX(list, pMax.index, pMax.index, y, pMax.indexItem)
        ) {
            return true;
        }
    }
    return false;
}


const checkRectY = (list) => {
    let pMin = checkObj[0];
    let pMax = checkObj[1];
    if(pMin.index > pMax.index) {
        pMin = checkObj[1];
        pMax = checkObj[0];
    }
    for(let x = pMin.index + 1; x < pMax.index; x++) {
        if (
            checkLineY(list, pMin.index, x, pMin.indexItem, pMin.indexItem) &&
            checkLineX(list, x, x , pMin.indexItem, pMax.indexItem ) &&
            checkLineY(list, x, pMax.index , pMax.indexItem, pMax.indexItem)
        ) {
            return true;
        }
    }
    return false;
}

const checkMoreX = (list, type) => {
    let pMin = checkObj[0];
    let pMax = checkObj[1];
    if(pMin.indexItem > pMax.indexItem) {
        pMin = checkObj[1];
        pMax = checkObj[0];
    }
    let y = pMax.indexItem;
    let row = pMin.index;
    if(type === -1){
        y = pMin.indexItem;
        row = pMax.index;
    }
    if(checkLineX(list, row, row, pMin.indexItem, pMax.indexItem)){
        while(list[pMin.index][y].status && list[pMax.index][y].status) {
            if(checkLineY(list, pMin.index, pMax.index, y, y)) {
                return true;
            }
            y += type;
            if (!list[pMin.index][y]) {
                return true;
            }
        }
    }
    return false;
}

const checkMoreY = (list, type) => {
    let pMin = checkObj[0];
    let pMax = checkObj[1];
    if(pMin.index > pMax.index) {
        pMin = checkObj[1];
        pMax = checkObj[0];
    }
    let x = pMax.index;
    let col = pMin.indexItem;
    if(type === -1){
        x = pMin.index;
        col = pMax.indexItem;
    }
    if(checkLineY(list, pMin.index, pMax.index, col, col)) {
        while(list[x][pMin.indexItem].status && list[x][pMax.indexItem].status) {
            if(checkLineY(list, x, x, pMin.indexItem, pMax.indexItem)) {
                return true;
            }
            x += type;
            debugger;
            if (!list[x]) {
                return true;
            }
        }
    }
    return false;
}

function* handleItem(list) {
    if(checkObj[0].id === checkObj[1].id && list[checkObj[0].index][checkObj[0].indexItem] !== list[checkObj[1].index][checkObj[1].indexItem]) {
        const x1 = checkObj[0].index;
        const x2 = checkObj[1].index;
        const y1 = checkObj[0].indexItem;
        const y2 = checkObj[1].indexItem;
        const newList = JSON.parse(JSON.stringify(list));
        newList[x1][y1].status = true;
        newList[x2][y2].status = true;
        if(checkLineX(newList, x1, x2, y1, y2) ||
            checkLineY(newList, x1, x2, y1, y2) ||
            checkRectX(newList) || checkRectY(newList) ||
            checkMoreX(newList, 1) ||
            checkMoreX(newList, -1) ||
            checkMoreY(newList, 1) ||
            checkMoreY(newList, -1)) {
            yield put({type: types.changStatusTrue, checkObj});
        }
    }
    checkObj = [];
    checkRequest = 0;
}

function* getTwoClick(action) {
    const {item, list} = action;
    console.log(item)
    checkRequest++;
    item.index = action.index;
    item.indexItem = action.indexitem;
    checkObj.push(action.item);
    if(checkRequest === 2) {
        try {
            yield call(() => handleItem(list));
        } catch(error) {
            console.log(error);
        }
    }
}

function* mySaga() {
    yield all([
        watcherClick(),
    ])
}

export default mySaga;

import { call, put, fork, take, all } from 'redux-saga/effects'
import * as types from './../Redux/Constant/types'

let checkRequest = 0;
let checkObj = [];

function* watcherClick(){
    while(true){
        const action = yield take(types.checkTwoButton)
        yield fork(getTwoClick, action)
    }
}

function* handleItem() {
    if(checkObj[0].id === checkObj[1].id) {
        yield put({type: types.changStatusTrue, checkObj});
    }
    checkObj = [];
    checkRequest = 0;
}

function* getTwoClick(action) {
    const {item} = action;
    checkRequest++;
    item.index = action.index;
    item.indexItem = action.indexitem;
    checkObj.push(action.item);

    if(checkRequest === 2) {
        try {
            yield call(() => handleItem());
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

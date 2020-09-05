import * as types from './../Constant/types'
import icon1 from '../../icon/1.png'
import icon2 from '../../icon/2.png'
import icon3 from '../../icon/3.png'
import icon4 from '../../icon/4.png'
import icon5 from '../../icon/5.png'
import icon6 from '../../icon/6.png'
import icon7 from '../../icon/7.png'
import icon8 from '../../icon/8.png'
import icon9 from '../../icon/9.png'
import icon10 from '../../icon/10.png'
import icon11 from '../../icon/11.png'
import icon12 from '../../icon/12.png'
import icon13 from '../../icon/13.png'
import icon14 from '../../icon/14.png'
import icon15 from '../../icon/15.png'
import icon16 from '../../icon/16.png'
import icon17 from '../../icon/17.png'
import icon18 from '../../icon/18.png'
import icon19 from '../../icon/19.png'
import icon20 from '../../icon/20.png'
import icon21 from '../../icon/21.png'

const init = [
    {
        id: 0,
        status: false,
        img: icon1,
        check: 0
    },
    {
        id: 1,
        status: false,
        img: icon2,
        check: 0
    },
    {
        id: 2,
        status: false,
        img: icon3,
        check: 0
    },
    {
        id: 3,
        status: false,
        img: icon4,
        check: 0
    },
    {
        id: 4,
        status: false,
        img: icon5,
        check: 0
    },
    {
        id: 5,
        status: false,
        img: icon6,
        check: 0
    },
    {
        id: 6,
        status: false,
        img: icon7,
        check: 0
    },
    {
        id: 7,
        status: false,
        img: icon8,
        check: 0
    },
    {
        id: 8,
        status: false,
        img: icon9,
        check: 0
    },
    {
        id: 9,
        status: false,
        img: icon10,
        check: 0
    },
    {
        id: 10,
        status: false,
        img: icon11,
        check: 0
    },
    {
        id: 11,
        status: false,
        img: icon12,
        check: 0
    },
    {
        id: 12,
        status: false,
        img: icon13,
        check: 0
    },
    {
        id: 13,
        status: false,
        img: icon14,
        check: 0
    },
    {
        id: 14,
        status: false,
        img: icon15,
        check: 0
    },
    {
        id: 15,
        status: false,
        img: icon16,
        check: 0
    },
    {
        id: 16,
        status: false,
        img: icon17,
        check: 0
    },
    {
        id: 17,
        status: false,
        img: icon18,
        check: 0
    },
    {
        id: 18,
        status: false,
        img: icon19,
        check: 0
    },
    {
        id: 19,
        status: false,
        img: icon20,
        check: 0
    },
    {
        id: 20,
        status: false,
        img: icon21,
        check: 0
    },
];

const cols = 21;
const rows = 10;
const limit = 10;

const setState = (initialState) => {
    for(let i = 0; i < cols; i++){
        const random = Math.floor(Math.random() * init.length);
        const item = init[random];
        initialState.push(item);
        item.check++;
        if(item.check === limit){
            init.splice(random, 1);
        }
    }
    return initialState;
}

const setStateTwo = (initialStateTwo) => {
    for(let i = 0; i < rows; i++) {
        const array = setState([]);
        initialStateTwo.push(array);
    }
    return initialStateTwo;
}
const test = setStateTwo([]);

const tasks = (state = test, action) => {
    switch (action.type){
        case types.viewList:
            return state;
        default: return state;
    }
}

export default tasks;

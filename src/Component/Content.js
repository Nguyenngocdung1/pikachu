import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as action from '../Redux/Actions/index'
import './../App.css';
import Button from "@material-ui/core/Button";

class Content extends Component {
    constructor(props) {
        super(props);
            this.state ={
                checkHandler: 10,
                checkPoint: 0,
            }
    }

    checkHandleArrSwap = (list) => {
        const {checkSwapArr} = this.props;
        const {checkHandler} = this.state;
        let m = checkHandler - 1;
        this.setState({
            checkHandler: m,
        })
        if(m < 0){
            alert("HẾT LƯỢT ĐẢO");
            this.setState({
                checkHandler: 0,
            })
        } else {
            checkSwapArr(list);
        }
    }


    changeStatusItem = (arr, list, item, index, indexitem) => {
        const {checkButtonClick, checkAddPoint} = this.props;
        checkButtonClick(arr, list, item, index, indexitem);
        const { checkPoint } = this.state;
        debugger;
        const point = 0;
        checkAddPoint(point);
        debugger;
        this.setState({
            checkPoint: point,
        })
    }

    render() {
        const {list} = this.props;
        const {checkHandler, checkPoint} = this.state;
        return (
            <div style={{display: 'flex', marginLeft: "450px"}}>
                <div style={{textAlign: 'right', marginRight: "10px", fontSize: '30px', color: '#EE0000', fontFamily: 'Debby'}}>
                    <div style={{textAlign: 'center'}}>
                        <Button style={{color: 'red'}} onClick={() => this.checkHandleArrSwap(list)}>LÀM MỚI HÌNH: </Button>
                        <p style={{ width: '150px'}}>lượt đổi: {checkHandler}</p>
                        <div>ĐIỂM :</div>
                        <div>{ checkPoint }</div>
                    </div>
                </div>
                <div className="content" style={{textAlign:'center'}}>
                    {list.map((arr, index) => {
                        return (
                            <div key={index} className="row">
                            {arr.map((item, indexitem) => {
                                return(
                                    <div key={indexitem} style={item.status === false ? { display: 'inline-block'}: {display: 'inline-block', opacity: 0}}>
                                        <div style={{width: '62px', height: '62px'}}>
                                            <button onClick={() => this.changeStatusItem(arr, list ,item, index, indexitem)} disabled={item.status}>
                                                <img style={{width: '45px', height: '50px'}} src={item.img} alt='error'/>
                                            </button>
                                        </div>
                                    </div>
                                )})}
                            </div>)
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.tasks,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        newState: (index, indexitem) => dispatch(action.changeStatusIcon(index, indexitem)),
        checkButtonClick: (arr, list, item, index, indexitem) => dispatch(action.checkButton(arr, list, item, index, indexitem)),
        checkAddPoint: (point) => dispatch(action.addPoint(point)),
        checkSwapArr: (list) => dispatch(action.swapArr(list))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)( Content);

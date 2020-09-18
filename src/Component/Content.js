import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as action from '../Redux/Actions/index'

class Content extends Component {
    changeStatusItem = (list, item, index, indexitem) => {
        const {checkButtonClick } = this.props;
        checkButtonClick(list, item, index, indexitem);
    }

    render() {
        const {list} = this.props;
        return (
            <div style={{textAlign:'center'}}>
                {list.map((arr, index) => {
                    return (
                        <div key={index} className="row">
                        {arr.map((item, indexitem) => {
                            return(
                                <div key={indexitem} style={item.status === false ? { display: 'inline-block'}: {display: 'inline-block', opacity: 0}}>
                                    <div style={{width: '62px', height: '62px'}}>
                                        <button onClick={() => this.changeStatusItem(list ,item, index, indexitem)} disabled={item.status}>
                                            <img style={{width: '45px', height: '50px'}} src={item.img} alt='error'/>
                                        </button>
                                    </div>
                                </div>
                            )})}
                        </div>)
                })}
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
        checkButtonClick: (list, item, index, indexitem) => dispatch(action.checkButton(list, item, index, indexitem)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)( Content);

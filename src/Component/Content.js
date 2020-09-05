import React,{Component} from 'react';
import { connect } from 'react-redux';
class Content extends Component {
    render() {
        const {list} = this.props;
        return(
            <div>
                {list.map((arr) => {
                    return (
                        <div className="row" style={{textAlign:'center'}}>
                        {
                            arr.map((item) => {

                                return(
                                    <div style={{textAlign: 'center', display: 'inline-block'}}>
                                        <div style={{width: '60px', height: '60px'}}>
                                            <button><img style={{width: '45px', height: '50px'}} src={item.img} alt='error'/></button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>)
                })}
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return{
        list: state.tasks,
    }

}

export default connect(mapStateToProps,null)( Content);

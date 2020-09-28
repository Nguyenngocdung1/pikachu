import React,{Component} from 'react';
import Content from "./Component/Content";
import logo from './icon/logo.png'

class App extends Component {
  render() {
    return (
        <div>
            <h1 style={{textAlign: 'center', width: '100px', height: '100px'}}><img src={logo} alt="#"/></h1>
            <Content/>
        </div>
    );
  }
}

export default App;

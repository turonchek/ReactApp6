import React, {Component} from 'react';
import './App.css';
import { SWShipsPage } from './components/SWShipsPage/SWShipsPage';

class App extends Component {
  render(){
    return (
      <div className="App">
        <SWShipsPage/>
      </div>
    );
  }
}

export default App;

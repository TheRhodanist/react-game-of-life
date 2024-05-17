import React from 'react';
import logo from './logo.svg';
import {GameBoard} from "./components/GameBoard";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GameBoard/>

      </header>
    </div>
  );
}

export default App;

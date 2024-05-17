import React from 'react';
import logo from './logo.svg';
import {GameBoard} from "./components/GameBoard";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GameBoard/>

      </header>
    </div>
  );
}

export default App;

import React from 'react';
import Header from "./Header";
import logo from './logo.svg';
import './App.css';

function App() {
    let style = {
        backgroundColor:"#ddd8b1",
        fontFamily: "Courier monospace",

    }
  return (
    <div className="App" style={style}>
        <Header></Header>
    </div>
  );
}

export default App;

import React from 'react';
import NavBar from './../NavBar/NavBar';
import SearchProduct from './../SearchProduct/SearchProduct';
import './App.css';


class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          logo goes here
        </header>
        <NavBar />
        <div>
          <SearchProduct />
        </div>
      </div>
    );
  }
};


export default App;

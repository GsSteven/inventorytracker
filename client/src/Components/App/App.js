import React from 'react';
import NavBar from './../NavBar/NavBar';
import SearchProduct from './../SearchProduct/SearchProduct';
import AddNewProduct from './../AddNewProduct/AddNewProduct';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'searchProducts'
    }
    this.changePage = this.changePage.bind(this);
  }

  changePage(e) {
    const navId = e.target.id;
    this.setState({ currentPage: navId });
  }

  displayPage() {
    switch (this.state.currentPage) {
      case 'searchProducts':
        return <SearchProduct />
      case 'addNewProduct':
        return <AddNewProduct />
      default:
        console.error('Error at displayPage switch');
    }
  }

  render() {
    return (
      <div>
        <header>
          logo goes here
        </header>
        <NavBar changePage={this.changePage} />
        <div>
          {this.displayPage()}
        </div>
      </div>
    );
  }
};


export default App;

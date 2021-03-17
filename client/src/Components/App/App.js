import React from 'react';
import axios from 'axios';
import NavBar from './../NavBar/NavBar';
import SearchProduct from './../SearchProduct/SearchProduct';
import AddNewProduct from './../AddNewProduct/AddNewProduct';
import EditType from '../EditType/EditType';
import './App.css';

//img imports
import logo from './../../images/inventoryTrackerLogo.png';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'editType',
      types: []
    }
    this.getTypes = this.getTypes.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  async getTypes() {
    const types = await axios.get('/api/types')
      .then(response => {
        return response.data
      });
    const typeElements = types.map(type => {
      return <option value={type.type} key={type.id + type.type}>{type.type}</option>;
    });
    this.setState({ types: typeElements });
  }

  changePage(e) {
    const navId = e.target.id;
    this.setState({ currentPage: navId });
  }

  displayPage() {
    switch (this.state.currentPage) {
      case 'searchProducts':
        return <SearchProduct types={this.state.types} />
      case 'addNewProduct':
        return <AddNewProduct types={this.state.types} refreshTypes={this.getTypes} />
      case 'editType':
        return <EditType types={this.state.types} refreshTypes={this.getTypes} />
      default:
        console.error('Error at displayPage switch');
    }
  }

  componentDidMount() {
    this.getTypes();
  }

  render() {
    return (
      <div className="appWrapper">
        <header>
          <img src={logo} alt="logo" id="headerLogo" />
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

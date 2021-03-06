import React from 'react';
import './SearchProduct.css';
import axios from 'axios';
import Product from '../Product/Product';

//image imports
import upDownArrows from './../../images/upDownArrows.png';


class SearchProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            searchQuery: '',
            searchOrder: 'ASC',
            error: false
        }
        this.changeSearchOrder = this.changeSearchOrder.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.orderBy = this.orderBy.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    changeSearchOrder() {
        this.state.searchOrder === 'ASC' ? this.setState({ searchOrder: 'DESC' }) : this.setState({ searchOrder: 'ASC' });
    }

    getProducts() {
        axios.get('/api/inventory')
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        products: response.data,
                        error: false
                    });
                } else {
                    this.setState({ error: true });
                }
            },
                error => {
                    this.setState({ error: true });
                });
    }

    orderBy(e) {
        const toBeOrderedBy = e.target.id;

        axios.get('/api/inventory/orderBy',
            {
                params: {
                    orderBy: toBeOrderedBy,
                    searchQuery: this.state.searchQuery,
                    searchOrder: this.state.searchOrder
                }
            })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        products: response.data,
                        error: false
                    });
                    this.changeSearchOrder();
                } else {
                    this.setState({ error: true });
                }
            },
                error => {
                    this.setState({ error: true });
                });
    }

    handleChange(e) {
        const newValue = e.target.value;
        this.setState({
            searchQuery: newValue
        });
    }

    handleKeyPress(e) {
        if (e.charCode === 13) {
            this.search();
        }
    }

    search() {
        axios.get('/api/inventory/search', { params: { searchQuery: this.state.searchQuery } })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        products: response.data,
                        error: false
                    });
                }
                else {
                    this.setState({ error: true });
                }
            },
                error => {
                    this.setState({ error: true });
                });
    }


    componentDidMount() {
        this.getProducts();
    }

    render() {
        const products = this.state.products.map(product => {
            return <Product id={product.id}
                type={product.type}
                name={product.name}
                quantity={product.quantity}
                location={product.location}
                price={product.price}
                notes={product.notes}
                types={this.props.types}
                refresh={this.getProducts}
                key={product.id + product.name}
            />
        });

        return (
            <div className="searchProductWrapper">
                <div className="inputBox" onKeyPress={this.handleKeyPress}>
                    <input className="searchBar" type="text" name="search" placeholder="search by name" onChange={this.handleChange} />
                    <button className="searchButton" type="button" onClick={this.search}>search</button>
                </div>
                {this.state.error &&
                    <h3 id="searchProductsError">Error fetching from database (try refreshing the page)</h3>
                }
                <table className="productsTable">
                    <thead>
                        <tr>
                            <th id="id" onClick={this.orderBy}>Id<img src={upDownArrows} alt="sortBy" /></th>
                            <th id="type" onClick={this.orderBy}>Type<img src={upDownArrows} alt="sortBy" /></th>
                            <th id="name" onClick={this.orderBy}>Name<img src={upDownArrows} alt="sortBy" /></th>
                            <th id="quantity" onClick={this.orderBy}>Quantity<img src={upDownArrows} alt="sortBy" /></th>
                            <th id="location" onClick={this.orderBy}>Location<img src={upDownArrows} alt="sortBy" /></th>
                            <th id="price" onClick={this.orderBy}>Price<img src={upDownArrows} alt="sortBy" /></th>
                            <th className="notes">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default SearchProduct;
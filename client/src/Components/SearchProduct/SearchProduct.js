import React from 'react';
import './SearchProduct.css';
import axios from 'axios';
import Product from '../Product/Product';


class SearchProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],

        }
        this.getProducts = this.getProducts.bind(this);
    }



    getProducts() {
        axios.get('/api/inventory')
            .then(response => {
                if (!response || response.status !== 200) throw console.error('Error at getProducts');
                else {
                    this.setState({ products: response.data });
                }
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
                price={product.price}
                notes={product.notes}
                key={product.id + product.name}
            />
        });

        return (
            <div className="searchProductWrapper">
                <table className="productsTable">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>type</th>
                            <th>name</th>
                            <th>quantity</th>
                            <th>price</th>
                            <th>notes</th>
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
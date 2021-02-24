import React from 'react';
import './Product.css';

class Product extends React.Component {

    render() {
        return (
            <tr className="productRow">
                <td>{this.props.id}</td>
                <td>{this.props.type}</td>
                <td>{this.props.name}</td>
                <td>{this.props.quantity}</td>
                <td>{this.props.location}</td>
                <td>${this.props.price}</td>
                <td>{this.props.notes}</td>
            </tr>
        );
    }
};

export default Product;
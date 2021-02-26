import React from 'react';
import ReactDOM from 'react-dom';
import './Product.css';
import wrenchIcon from './../../images/wrench.png';


class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.editProduct = this.editProduct.bind(this);
    }

    editProduct() {
        const currentProduct = document.getElementById(this.props.id);
        const editProduct = (
            <tr className="productRow">
                <td>{this.props.id}</td>
                <td><input type="text" value={this.props.type} name="" id="" /></td>
                <td><input type="text" value={this.props.name} name="" id="" /></td>
                <td><input type="number" value={this.props.quantity} name="" id="" /></td>
                <td><input type="text" value={this.props.location} name="" id="" /></td>
                <td>$<input type="number" value={this.props.price} name="" id="" /></td>
                <td><input type="text" value={this.props.notes} name="" id="" /></td>
            </tr>
        );


        const newRow = document.createElement('tr');
        newRow.className = "productRow";
        newRow.id = `${this.props.id}Edit`


        currentProduct.parentNode.insertBefore(newRow, currentProduct.nextSibling);

    }

    render() {
        return (
            <tr className="productRow" id={this.props.id}>
                <td className="dataId">
                    <img className="editProduct" src={wrenchIcon} alt="edit product" onClick={this.editProduct} />
                    {this.props.id}
                </td>
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
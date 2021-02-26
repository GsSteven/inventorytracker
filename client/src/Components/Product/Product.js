import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './Product.css';

//img imports
import wrenchIcon from './../../images/wrench.png';
import checkButton from './../../images/checkButton.png';
import xButton from './../../images/xButton.png';


class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            type: this.props.type,
            name: this.props.name,
            quantity: this.props.quantity,
            location: this.props.location,
            price: this.props.price,
            notes: this.props.notes
        }
        this.editProduct = this.editProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitChange = this.submitChange.bind(this);
    }


    editProduct() {
        const currentProduct = document.getElementById(this.props.id);

        //create row and insert after element chosen to edit
        const newRow = document.createElement('tr');
        newRow.className = "productRow";
        newRow.id = `${this.props.id}Edit`
        currentProduct.parentNode.insertBefore(newRow, currentProduct.nextSibling);

        //render data into new row
        ReactDOM.render(
            <>
                <td>
                    <img className="confirmDenyButtons" src={checkButton} alt="change" onClick={this.submitChange} />
                    <br />
                    {this.props.id}
                    <br />
                    <img className="confirmDenyButtons" src={xButton} alt="dontChange" onClick={this.cancelChange} />

                </td>
                <td><select name="typeEdit" id="typeEdit" defaultValue={this.state.type} onChange={this.handleChange}>
                    {this.props.types}
                    <option value=""></option>
                </select>
                </td>
                <td><input type="text" defaultValue={this.state.name || undefined} name="nameEdit" id="nameEdit" onChange={this.handleChange} /></td>
                <td><input type="number" defaultValue={this.state.quantity || undefined} name="quantityEdit" id="quantityEdit" onChange={this.handleChange} /></td>
                <td><input type="text" defaultValue={this.state.location || undefined} name="locationEdit" id="locationEdit" onChange={this.handleChange} /></td>
                <td><input type="number" defaultValue={this.state.price || undefined} name="priceEdit" id="priceEdit" onChange={this.handleChange} /></td>
                <td><textarea defaultValue={this.state.notes || undefined} name="notesEdit" id="notesEdit" rows="2" cols="30" maxLength="400" onChange={this.handleChange} /></td>
            </>,
            document.getElementById(`${this.props.id}Edit`)
        );
    }

    handleChange(e) {
        const eventValue = e.target.value;
        const eventName = e.target.name.replace('Edit', '');
        console.log(eventName);
        console.log(eventValue);
        console.log(this.state);
        this.setState({ [eventName]: eventValue });
    }

    cancelChange() {

    }

    submitChange() {
        const payLoad = {
            id: this.state.id
        };

        //if current state has been changed from prop add to payLoad
        for (const param in this.state) {
            if (this.state[param] !== this.props[param]) {
                payLoad[param] = this.state[param];
            }
        }
        console.log(payLoad);
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
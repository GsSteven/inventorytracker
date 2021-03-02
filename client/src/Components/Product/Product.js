import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './Product.css';
import CheckOutProduct from '../CheckOutProduct/CheckOutProduct';
import CheckInProduct from '../CheckInProduct/CheckInProduct';

//img imports
import wrenchIcon from './../../images/wrench.png';
import checkButton from './../../images/checkButton.png';
import xButton from './../../images/xButton.png';
import addButton from './../../images/add.png';
import subtractButton from './../../images/subtract.png';



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
            notes: this.props.notes,
            checkOutProduct: false,
            checkInProduct: false
        }
        this.checkOutProduct = this.checkOutProduct.bind(this);
        this.checkInProduct = this.checkInProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancelChange = this.cancelChange.bind(this);
        this.submitChange = this.submitChange.bind(this);
    }

    checkOutProduct() {
        this.state.checkOutProduct ? this.setState({ checkOutProduct: false }) : this.setState({ checkOutProduct: true });
    }

    checkInProduct() {
        this.state.checkInProduct ? this.setState({ checkInProduct: false }) : this.setState({ checkInProduct: true });
    }

    editProduct() {
        const currentProduct = document.getElementById(this.props.id);
        //check if edit element already open(exists) to prevent two edits of same product
        if (document.getElementById(`${this.props.id}Edit`)) {

        } else {
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
    }

    handleChange(e) {
        const eventValue = e.target.value;
        const eventName = e.target.name.replace('Edit', '');
        this.setState({ [eventName]: eventValue });
    }

    cancelChange() {
        const openedEdit = document.getElementById(`${this.props.id}Edit`);
        openedEdit.remove();
    }

    submitChange() {
        const payLoad = {};

        //if current state has been changed from prop add to payLoad
        for (const param in this.state) {
            if (this.state[param] !== this.props[param]) {
                //to filter out unneeded states
                if (param !== 'checkOutProduct' && param !== 'checkInProduct') {
                    payLoad[param] = this.state[param];
                }
            }
        }

        axios.put('/api/inventory', { data: { id: this.props.id, toChange: payLoad } })
            .then(response => {
                if (response.status === 200) {
                    //close edit
                    const openedEdit = document.getElementById(`${this.props.id}Edit`);
                    openedEdit.remove();
                    this.props.refresh();
                }
            },
                error => {
                    console.error(error);
                });
    }

    render() {
        return (
            <tr className="productRow" id={this.props.id}>
                <td className="dataId">
                    <img className="editProduct" src={wrenchIcon} alt="edit product" title={`Edit ${this.props.name}`} onClick={this.editProduct} />
                    {this.props.id}
                </td>
                <td>{this.props.type}</td>
                <td>{this.props.name}</td>
                <td className="productQuantity">
                    <img className="checkButtons" id="checkOutProductButton" src={subtractButton} alt="Check-out" title={`Check Out ${this.props.name}`} onClick={this.checkOutProduct} />
                    {this.props.quantity}
                    <img className="checkButtons" id="checkInProductButton" src={addButton} alt="Check-in" title={`Check In ${this.props.name}`} onClick={this.checkInProduct} />
                </td>
                <td>{this.props.location}</td>
                <td>${this.props.price}</td>
                <td className="notes">{this.props.notes}</td>
                {this.state.checkOutProduct &&
                    <CheckOutProduct id={this.props.id} name={this.props.name} quantity={this.props.quantity} close={this.checkOutProduct} refresh={this.props.refresh} />
                }
                {this.state.checkInProduct &&
                    <CheckInProduct id={this.props.id} name={this.props.name} quantity={this.props.quantity} close={this.checkInProduct} refresh={this.props.refresh} />
                }
            </tr>
        );
    }
};

export default Product;
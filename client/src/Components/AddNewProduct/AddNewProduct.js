import axios from 'axios';
import React from 'react';
import './AddNewProduct.css';

class AddNewProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: null,
            quantity: null,
            location: null,
            price: null,
            notes: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.getTypes = this.getTypes.bind(this);
        this.submitProduct = this.submitProduct.bind(this);
        this.displayError = this.displayError.bind(this);
    }

    handleChange(e) {
        const id = e.target.id;
        const value = e.target.value;
        this.setState({ [id]: value });
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

    async submitProduct() {
        const payLoad = {
            name: this.state.name,
            type: this.state.type,
            quantity: this.state.quantity,
            location: this.state.location,
            price: this.state.price,
            notes: this.state.notes
        };

        //if a new type is added submit new type to product_type table
        if (this.state.newType) {
            await axios.post('/api/types', { data: this.state.newType })
                .then(response => {
                    if (response.status === 200) {
                        payLoad.type = this.state.newType;
                    }
                });
        }

        //submit payLoad then reset state and input areas
        axios.post('/api/inventory', { data: payLoad })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        name: '',
                        type: null,
                        quantity: null,
                        location: null,
                        price: null,
                        notes: ''
                    });
                    const nameElement = document.getElementById('name');
                    const typeElement = document.getElementById('type');
                    const quantityElement = document.getElementById('quantity');
                    const locationElement = document.getElementById('location');
                    const priceElement = document.getElementById('price');
                    const notesElement = document.getElementById('notes');
                    const newTypeElement = document.getElementById('newType');

                    nameElement.value = '';
                    typeElement.value = '';
                    quantityElement.value = '';
                    locationElement.value = '';
                    priceElement.value = '';
                    notesElement.value = '';
                    if (payLoad.newType) {
                        newTypeElement.value = '';
                    }
                } else {
                    this.displayError();
                }
            });
    }

    displayError() {
        console.log('so triggered');
        const form = document.getElementById('newProductForm');
        const errorP = document.createElement('p');
        errorP.innerHTML = "An error has occured and the product was not submitted";
        errorP.className = "errorMessage";
        form.appendChild(errorP)
    }

    componentDidMount() {
        this.getTypes();
    }

    render() {

        return (
            <div className="addNewProductWrapper">
                <div id="newProductForm">
                    <label htmlFor="name">name</label>
                    <input type="text" name="name" id="name" required onChange={this.handleChange} />
                    <label htmlFor="type">type</label>
                    <select name="type" id="type" onChange={this.handleChange}>
                        <option value=""></option>
                        {this.state.types}
                        <option value="newType">New type +</option>
                    </select>
                    {this.state.type === "newType" &&
                        <div id="newTypeDiv">
                            <label htmlFor="newType">new type</label>
                            <br />
                            <input type="text" name="newType" id="newType" onChange={this.handleChange} />
                        </div>
                    }
                    <label htmlFor="quantity">quantity</label>
                    <input type="number" name="quantity" id="quantity" onChange={this.handleChange} />
                    <label htmlFor="location">location</label>
                    <input type="text" name="location" id="location" onChange={this.handleChange} />
                    <label htmlFor="price">price</label>
                    <input type="number" step="0.01" name="price" id="price" onChange={this.handleChange} />
                    <label htmlFor="notes">notes</label>
                    <textarea step="0.01" name="notes" id="notes" placeholder="Add notes here (400 character max)" cols="50" rows="5" maxLength="400" onChange={this.handleChange} />
                    <button type="button" onClick={this.submitProduct}>Submit</button>
                </div>
            </div>
        );
    }
};

export default AddNewProduct;
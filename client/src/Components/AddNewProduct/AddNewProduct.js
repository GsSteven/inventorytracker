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
            notes: '',
            displayError: false,
            displaySuccess: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitProduct = this.submitProduct.bind(this);
        this.displayError = this.displayError.bind(this);
        this.displaySuccess = this.displaySuccess.bind(this);
    }

    handleChange(e) {
        const id = e.target.id;
        const value = e.target.value;
        this.setState({ [id]: value });
    }

    async submitProduct(e) {
        if (e) {
            e.preventDefault();
        }

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
                        this.props.refreshTypes();
                    }
                });
        }

        //set state name for success or error messages
        this.setState({ submittedName: this.state.name });


        //submit payLoad then reset state and input areas
        axios.post('/api/inventory', { data: payLoad })
            .then(response => {
                if (response.status === 200) {

                    this.setState({
                        displayError: false
                    });

                    this.displaySuccess();

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

                }
            }, error => {
                this.setState({ displaySuccess: false });
                this.displayError();
            });
    }

    displayError() {
        this.setState({ displayError: true });
    }

    displaySuccess() {
        this.setState({ displaySuccess: true });
    }

    componentDidMount() {
        const nameInput = document.getElementById('name');
        nameInput.focus();
    }

    render() {

        return (
            <div className="addNewProductWrapper">
                <form id="newProductForm" onSubmit={this.submitProduct} autoComplete="off">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" required onChange={this.handleChange} />
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type" defaultValue="" onChange={this.handleChange}>
                        <option value="newType">New type +</option>
                        {this.props.types}
                        <option value=""></option>
                    </select>
                    {this.state.type === "newType" &&
                        <div id="newTypeDiv">
                            <label htmlFor="newType">New Type</label>
                            <br />
                            <input type="text" name="newType" id="newType" onChange={this.handleChange} required />
                        </div>
                    }
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" name="quantity" id="quantity" onChange={this.handleChange} />
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" id="location" onChange={this.handleChange} />
                    <label htmlFor="price">Price</label>
                    <input type="number" step="0.01" name="price" id="price" onChange={this.handleChange} />
                    <label htmlFor="notes">Notes</label>
                    <textarea name="notes" id="notes" placeholder="Add notes here (400 character max)" cols="50" rows="5" maxLength="400" onChange={this.handleChange} />
                    <button type="sumbit" id="newProductSubmit">Submit</button>
                </form>
                {this.state.displaySuccess &&
                    <h3 className="successMessage"><u>{this.state.submittedName}</u> has been added</h3>
                }
                {this.state.displayError &&
                    <h3 className="errorMessage">Something went wrong and <u>{this.state.submittedName}</u> was not added.</h3>
                }
            </div>
        );
    }
};

export default AddNewProduct;
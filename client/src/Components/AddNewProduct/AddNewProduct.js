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
            price: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.getTypes = this.getTypes.bind(this);
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

    submitProduct() {
        const payLoad = {

        };
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
                        <option value="other">Other</option>
                    </select>
                    <label htmlFor="quantity">quantity</label>
                    <input type="number" name="quantity" id="quantity" onChange={this.handleChange} />
                    <label htmlFor="location">location</label>
                    <input type="text" name="location" id="location" onChange={this.handleChange} />
                    <label htmlFor="price">price</label>
                    <input type="number" step="0.01" name="price" id="price" onChange={this.handleChange} />
                    <button type="button" onClick={this.submitProduct}>Submit</button>
                </div>
            </div>
        );
    }
};

export default AddNewProduct;
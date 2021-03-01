import React from 'react';
import axios from 'axios';
import './CheckOutProduct.css';

class CheckOutProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkOutValue: 0,
            error: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(e) {
        const newValue = e.target.value;
        this.setState({ checkOutValue: newValue });
    }

    handleKeyPress(e) {
        const charCode = e.charCode;
        if (charCode === 13) {
            this.submit();
        }
    }

    submit() {
        //if value is greater than quantity, display error
        if (this.props.quantity - Number(this.state.checkOutValue) < 0) {
            this.setState({ error: true });
            // if value is 0 / no value entered, close window
        } else if (Number(this.state.checkOutValue) === 0) {
            this.props.close();
        } else {
            axios.put('/api/inventory/checkOut',
                {
                    data: {
                        id: this.props.id,
                        checkOutAmount: this.state.checkOutValue
                    }
                })
                .then(response => {
                    this.props.refresh();
                    this.props.close();
                });
        }
    }

    componentDidMount() {
        const inputElement = document.getElementById('checkOutProductInput');
        inputElement.focus();
    }

    render() {
        return (
            <td className="checkWindow" id="checkOutProductWindow">
                <div className="closeButton" onClick={this.props.close}>X</div>
                <h2><u><span className="outEmph">Check Out</span> {this.props.name}</u></h2>
                <h3>Current quantity: {this.props.quantity}</h3>
                <label htmlFor="checkOutProductInput">How many are you checking out?</label>
                <br />
                <input type="number" id="checkOutProductInput" name="checkOutProductInput" onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                <h3>New quantity on submit: {this.props.quantity - Number(this.state.checkOutValue)}</h3>
                <button type="button" id="submitProductCheckOut" onClick={this.submit}>submit</button>
                {this.state.error &&
                    <h4 id="errorMessage">Quantity removed can not be more than quantity in stock</h4>
                }
            </td>
        );
    }
};

export default CheckOutProduct;
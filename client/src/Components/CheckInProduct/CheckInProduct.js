import React from 'react';
import axios from 'axios';
import './CheckInProduct.css';

class CheckInProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkInValue: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(e) {
        const newValue = e.target.value;
        this.setState({ checkInValue: newValue });
    }

    handleKeyPress(e) {
        const charCode = e.charCode;
        if (charCode === 13) {
            this.submit();
        }
    }

    submit() {
        //if no value is entered close window
        if (Number(this.state.checkInValue) === 0) {
            this.props.close();
        } else {
            axios.put('/api/inventory/checkIn',
                {
                    data: {
                        id: this.props.id,
                        checkInAmount: this.state.checkInValue
                    }
                })
                .then(response => {
                    if (response.status === 200) {
                        this.props.updateQuantity('add', Number(this.state.checkInValue));
                        this.props.close();
                    }
                });
        }
    }

    componentDidMount() {
        const inputElement = document.getElementById('checkInProductInput');
        inputElement.focus();
    }

    render() {
        return (
            <td className="checkWindow" id="checkInProductWindow">
                <div className="closeButton" onClick={this.props.close}>X</div>
                <h2><u><span className="inEmph">Check In</span> {this.props.name}</u></h2>
                <h3>Current quantity: {this.props.quantity}</h3>
                <label htmlFor="checkInProductInput">How many are you checking in?</label>
                <br />
                <input type="number" id="checkInProductInput" name="checkInProductInput" onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                <h3>New quantity on submit: {this.props.quantity + Number(this.state.checkInValue)}</h3>
                <button type="button" id="submitProductCheckIn" onClick={this.submit}>submit</button>
            </td>
        );
    }
};

export default CheckInProduct;
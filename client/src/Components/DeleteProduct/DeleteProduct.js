import React from 'react';
import axios from 'axios';
import './DeleteProduct.css';

class DeleteProduct extends React.Component {
    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
    }

    submit() {
        axios.delete('/api/inventory', { params: { id: this.props.id } })
            .then(response => {
                if (response.status === 200) {
                    this.props.close();
                    this.props.deleteSelf();
                }
            },
                error => {
                    console.error(error);
                });
    }

    render() {
        return (
            <td className="checkWindow" id="deleteProductWindow">
                <div className="closeButton" onClick={this.props.close}>X</div>
                <h2><u>Delete <span className="outEmph">{this.props.name}</span> with the id of <span className="outEmph">{this.props.id}</span>?</u></h2>
                <button type="button" id="deleteProductSubmit" onClick={this.submit}>Delete</button>
            </td>
        );
    }
};

export default DeleteProduct;
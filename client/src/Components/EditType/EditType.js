import React from 'react';
import './EditType.css';
import axios from 'axios';

class EditType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changeSuccess: false,
            deleteSuccess: false,
        }
        this.myRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.submitDelete = this.submitDelete.bind(this);
        this.submitChange = this.submitChange.bind(this);
    }

    handleChange(e) {
        const typeValue = e.target.value;
        const inputId = e.target.id;
        if (inputId === 'deleteType') {
            this.setState({ typeToRemove: typeValue });
        } else if (inputId === 'changeType') {
            this.setState({ typeToChange: typeValue });
        } else {
            this.setState({ changeTo: typeValue });
        }
    }

    submitDelete(e) {
        e.preventDefault();
        if (this.state.typeToRemove) {
            axios.delete('/api/types', { params: { nameOfType: this.state.typeToRemove } })
                .then(response => {
                    if (response.status === 200) {
                        this.setState({ deleteSuccess: true });
                        this.props.refreshTypes();
                    }
                },
                    error => {
                        console.log(error);
                    });
        }
    }

    submitChange(e) {
        e.preventDefault();
        axios.put('/api/types', {
            data: {
                typeToChange: this.state.typeToChange,
                changeTo: this.state.changeTo
            }
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({ changeSuccess: true });
                    this.props.refreshTypes();
                    const newTypeInput = this.myRef.current;
                    newTypeInput.value = '';
                }
            });
    }

    render() {
        return (
            <div className="typeWrapper" >
                <form id="changeTypeForm" autoComplete="off" onSubmit={this.submitChange} >
                    <u><h2>Change Type Name</h2></u>
                    <label htmlFor="deleteType">Select Type to Change</label>
                    <select id="changeType" onChange={this.handleChange} required>
                        <option value=""></option>
                        {this.props.types}
                    </select>
                    <label htmlFor="newTypeValue">Change to</label>
                    <input type="text" id="newTypeValue" name="newTypeValue" ref={this.myRef} onChange={this.handleChange} required />
                    <button type="submit">Change</button>
                </form>
                {this.state.changeSuccess &&
                    <h3 className="successMessage">{this.state.typeToChange} is now {this.state.changeTo}</h3>
                }
                <h1>OR</h1>
                <form id="deleteTypeForm" onSubmit={this.submitDelete}>
                    <u><h2>Delete Type</h2></u>
                    <label htmlFor="deleteType">Select Type to Delete</label>
                    <select id="deleteType" onChange={this.handleChange} required>
                        <option value=""></option>
                        {this.props.types}
                    </select>
                    <button type="submit">Delete</button>
                </form>
                {this.state.deleteSuccess &&
                    <h3 className="successMessage">{this.state.typeToRemove} has been deleted</h3>
                }
            </div>
        );
    }
};

export default EditType;
import React from 'react';
import './EditType.css';
import axios from 'axios';

class EditType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changeSuccess: false,
            deleteSuccess: false,
            addSuccess: false,
            typeDisplay: 'addTypeNav'
        }
        this.addType = React.createRef();
        this.changeType = React.createRef();
        this.changeTypeEdit = this.changeTypeEdit.bind(this);
        this.displayTypeEdit = this.displayTypeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitDelete = this.submitDelete.bind(this);
        this.submitChange = this.submitChange.bind(this);
        this.submitAdd = this.submitAdd.bind(this);
    }

    changeTypeEdit(e) {
        const value = e.target.id;
        this.setState({
            typeDisplay: value,
            displaySelected: value
        });
    }

    displayTypeEdit(value) {
        switch (value) {
            case 'addTypeNav':
                return (
                    <div>
                        <form id="addTypeForm" autoComplete="off" onSubmit={this.submitAdd}>
                            <u><h2>Add Type</h2></u>
                            <label htmlFor="addType">Type to Add</label>
                            <input
                                type="text"
                                id="addType"
                                name="addType"
                                ref={this.addType}
                                onChange={this.handleChange}
                                required
                            />
                            <button type="submit">Add</button>
                        </form>
                        {this.state.addSuccess &&
                            <h3 className="successMessage">{this.state.typeToAdd} has been added</h3>
                        }
                    </div>
                );
            case 'changeTypeNav':
                return (
                    <div>
                        <form id="changeTypeForm" autoComplete="off" onSubmit={this.submitChange} >
                            <u><h2>Change Type Name</h2></u>
                            <label htmlFor="deleteType">Type to Change</label>
                            <select id="changeType" onChange={this.handleChange} required>
                                <option value=""></option>
                                {this.props.types}
                            </select>
                            <label htmlFor="newTypeValue">Change to</label>
                            <input
                                type="text"
                                id="newTypeValue"
                                name="newTypeValue"
                                ref={this.changeType}
                                onChange={this.handleChange}
                                required
                            />
                            <button type="submit">Change</button>
                        </form>
                        {this.state.changeSuccess &&
                            <h3 className="successMessage">{this.state.typeToChange} is now {this.state.changeTo}</h3>
                        }
                    </div>
                );
            case 'deleteTypeNav':
                return (
                    <div>
                        <form id="deleteTypeForm" onSubmit={this.submitDelete}>
                            <u><h2>Delete Type</h2></u>
                            <label htmlFor="deleteType">Type to Delete</label>
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
            default:
                console.error('Error at changeTypeEdit switch');
        }
    }

    handleChange(e) {
        //set correct state for specific change
        const typeValue = e.target.value;
        const inputId = e.target.id;
        if (inputId === 'deleteType') {
            this.setState({ typeToRemove: typeValue });
        } else if (inputId === 'changeType') {
            this.setState({ typeToChange: typeValue });
        } else if (inputId === 'addType') {
            this.setState({ typeToAdd: typeValue });
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
                    const newTypeInput = this.changeType.current;
                    newTypeInput.value = '';
                }
            });
    }

    submitAdd(e) {
        e.preventDefault();
        axios.post('/api/types', {
            data: this.state.typeToAdd
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({ addSuccess: true })
                    this.props.refreshTypes();
                    const newType = this.addType.current;
                    newType.value = '';
                }
            })

    }

    render() {
        return (
            <div className="typeWrapper" >
                <ul id="editTypeNav">
                    <li id="addTypeNav" onClick={this.changeTypeEdit}>Add Type</li>
                    <li id="changeTypeNav" onClick={this.changeTypeEdit}>Change Type</li>
                    <li id="deleteTypeNav" onClick={this.changeTypeEdit}>Delete Type</li>
                </ul>
                {this.displayTypeEdit(this.state.typeDisplay)}
            </div>
        );
    }
};

export default EditType;
import React from 'react';
import './DeleteType.css';

class DeleteType extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="typeWrapper">
                <form id="deleteTypeForm">
                    <label htmlFor="deleteType">Select Type to Delete</label>
                    <select id="deleteType">
                        {this.props.types}
                    </select>
                </form>
            </div>
        );
    }
};

export default DeleteType;
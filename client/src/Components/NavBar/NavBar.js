import React from 'react';
import './NavBar.css';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
        this.expandNav = this.expandNav.bind(this);
    }

    expandNav(e) {
        const navList = document.querySelector('.navList');
        const line1 = document.querySelector('.mobile1');
        const line2 = document.querySelector('.mobile2');
        const line3 = document.querySelector('.mobile3');

        if (!this.state.clicked) {
            //show nav
            navList.style.opacity = '1';
            navList.style.pointerEvents = 'auto';
            navList.style.height = 'auto';
            navList.style.right = '0';
            // make mobile options a red X
            line1.style.transform = "rotate(45deg) translateY(14.5px)";
            line2.style.opacity = '0';
            line3.style.transform = "rotate(-45deg) translateY(-14.5px)";
            line1.style.backgroundColor = "rgb(126, 7, 7)";
            line3.style.backgroundColor = "rgb(126, 7, 7)";
            this.setState({ clicked: true });
        } else {
            //hide nav
            navList.style.opacity = '0';
            navList.style.pointerEvents = 'none';
            navList.style.height = '0';
            navList.style.right = '100%';
            //return mobile options to default position
            line1.style.transform = "";
            line2.style.opacity = '1';
            line3.style.transform = "";
            line1.style.backgroundColor = "black";
            line3.style.backgroundColor = "black";
            this.setState({ clicked: false });
        }
    }

    render() {
        return (
            <div id="navWrapper">
                <div className="mobileOptions" onClick={this.expandNav}>
                    <div className="mobile1"></div>
                    <div className="mobile2"></div>
                    <div className="mobile3"></div>
                </div>
                <ul className="navList">
                    <li id="addNewProduct" onClick={this.props.changePage}>Add New Product</li>
                    <li id="searchProducts" onClick={this.props.changePage}>Search Products</li>
                    <li id="editType" onClick={this.props.changePage}>Edit Type</li>
                </ul>
            </div>
        );
    }
};

export default NavBar;
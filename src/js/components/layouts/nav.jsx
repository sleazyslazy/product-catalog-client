import { Component } from "react";
import * as React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

import {getBackendURL, isLoggedIn, getUser, clearUser} from "../../utils/utils";

class NavComponent extends React.Component {
    state = {
        isLoggedIn: false,
        user: ''
    };

    logout = () => {
        clearUser();
        console.log("Logged out");
        this.setState({
            isLoggedIn: false,
            user: ''
        })
        window.location.href = "#login";
    };

    componentDidMount() {
        if (isLoggedIn()) {
            this.setState({
                isLoggedIn: true,
                user: getUser()
            })
        }
    }

    componentWillUnmount() {
        //this.serverRequest.abort();
    }

    render() {
        return(
            <div>
                <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
                    {/* Remove comment block below to show change  */}
                    
                    {/*
                    <div className="navbar-header">
                        <a className="navbar-brand" href="http://github.com/gnunn1/openshift-basic-pipeline">
                            <img src="http://icons.iconarchive.com/icons/graphicloads/100-flat/24/phone-icon.png" alt="Best Electronics"/><span>  Best Electronics</span>
                        </a>
                    </div>
                    */}
                 

                    <div className="container">
                        {
                            (!this.state.isLoggedIn) ?
                                <div id="navbar" className="collapse navbar-collapse">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item active"><a className="nav-link" href="#">Home</a></li>
                                        <li className="nav-item active"><a className="nav-link" href="#login">Sign In</a></li>
                                        <li className="nav-item active"><a className="nav-link" href="#register">Sign Up</a></li>
                                    </ul>
                                </div>
                        :
                                <div id="navbar" className="collapse navbar-collapse">
                                <ul className="nav navbar-nav">
                                    <li className="nav-item active"><a className="nav-link" href="#">Home</a></li>
                                    {
                                        (this.state.user != '') ?
                                        <li className="nav-item active"><a className="nav-link">Welcome, {this.state.user.email}</a></li>
                                        : null
                                    }
                                    <li className="nav-item active"><a className="nav-link" href="#logout" onClick={this.logout}>Sign Out</a></li>
                                </ul>
                            </div>
                        }
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavComponent;

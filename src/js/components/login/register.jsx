import React, { Component } from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

import { isLoggedIn, getBackendURL } from "../../utils/utils";


var RegisterComponent = React.createClass({
    getInitialState: function() {
        return {
            email: '',
            password: '',
            passwordConfirmation: '',
            user: null,
            successRegister: null,
            isLoggedIn: false
        };
    },

    componentDidMount: function() {
        if (isLoggedIn()) {
            this.setState({
                isLoggedIn: true
            })
        }

        $('.page-header h1').text('Sign Up');
    },

    componentWillUnmount: function() {

    },

    login: function(e) {
        $.post(getBackendURL('/api/auth/register'), {
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.passwordConfirmation
            },
            function(res) {
                this.setState({successRegister: res});
                if(res == 'true') {
                    this.setState({email: ''});
                    this.setState({password: ''});
                    this.setState({passwordConfirmation: ''});
                }
            }.bind(this));
        e.preventDefault();
    },

    onEmailChanged: function(e) {
        this.setState({
            email: e.target.value
        });
    },

    onPasswordChanged: function(e) {
        this.setState({
            password: e.target.value
        });
    },

    onConfirmPasswordChanged: function(e) {
        this.setState({
            passwordConfirmation: e.target.value
        });
    },

    render: function() {
        if(this.state.isLoggedIn )
            window.location.href = '#';

        return (
            <div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form>
                        {
                            this.state.successRegister == "true" ?
                                <div className="alert alert-success">
                                    You have been registered successfully. You may now log in.
                                </div>
                                : null
                        }
                        {
                            this.state.successRegister != "true" && this.state.successRegister != null ?
                                <div className="alert alert-danger">
                                    {this.state.successRegister}
                                </div>
                                : null
                        }
                        <h2 className="form-signin-heading">Please sign up</h2>

                        <input type="email" className="form-control" placeholder="Email address" name="email" value={this.state.email} onChange={this.onEmailChanged} />

                        <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.onPasswordChanged} />

                        <input type="password" className="form-control" placeholder="Confirm Password" name="password_confirmation" value={this.state.passwordConfirmation} onChange={this.onConfirmPasswordChanged} />

                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>Sign up</button>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        );
    }
});

export default RegisterComponent;
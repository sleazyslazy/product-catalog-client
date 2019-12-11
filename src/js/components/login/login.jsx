import React, { Component } from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

import { isLoggedIn, getBackendURL, setUser, authHeader } from "../../utils/utils";

var LoginComponent = React.createClass({
    getInitialState: function() {
        return {
            id: null,
            email: '',
            password: '',
            remember: null,
            user: null,
            successLogin: null,
            isLoggedIn: false
        };
    },

    componentDidMount: function() {
        if (isLoggedIn()) {
            this.setState({
                isLoggedIn: true
            })
            window.location.href = '#';
        }

        $('.page-header h1').text('Sign In');
    },

    componentWillUnmount: function() {
        //this.serverRequest.abort();
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

    login: function(e) {
        $.post({
                url: getBackendURL('/api/auth'),
                data: {email: this.state.email, password: this.state.password},
                headers: { 'Authorization': 'Basic ' + btoa(this.state.email + ':' + this.state.password)}
            },
            function(result) {
                this.setState({
                    successLogin: result.message
                });
                if(result.user != null) {
                    this.setState({id: result.user.id});
                    this.setState({email: result.user.email});
                    setUser(result.user, btoa(this.state.email + ':' + this.state.password));
                    window.location.reload();
                }
            }.bind(this));
        e.preventDefault();
    },

    render: function() {
        return (
            <div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form>
                        {
                            this.state.successLogin != "true" && this.state.successLogin != null ?
                                <div className="alert alert-danger">
                                    {this.state.successLogin}
                                </div>
                                : null
                        }
                        <h2 className="form-signin-heading">Please sign in</h2>

                        <input type="email" className="form-control" placeholder="Email address" name="email" value={this.state.email} onChange={this.onEmailChanged} />

                        <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.onPasswordChanged} />

                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>Sign in</button>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        );
    }
});

export default LoginComponent;
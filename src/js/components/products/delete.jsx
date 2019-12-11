import React, { Component } from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import { getBackendURL, authHeader, isLoggedIn } from "../../utils/utils";

var DeleteProductComponent = React.createClass({
    getInitialState:function() {
        return {
            isLoggedIn: false
        };
    },

    componentDidMount: function() {
        if (isLoggedIn) {
            this.setState({
                isLoggedIn: isLoggedIn()
            })
        } else {
            window.location.href = '#';
        }
        $('.page-header h1').text('Delete Product');
    },

    componentWillUnmount: function() {

    },

    onDelete: function(e) {
        var productId = this.props.productId;

        $.post({
                url: getBackendURL('/api/product/delete'),
                data: {del_ids: [productId]},
                headers: authHeader()
            },
            function(res) {
                //this.props.changeAppMode('read');
                window.location.replace('#');
            }.bind(this)
        );
    },

    render: function() {

        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-body text-align-center">
                            Are you sure?
                        </div>
                        <div className="panel-footer clearfix">
                            <div className="text-align-center">
                                <button className="btn btn-danger m-r-1em"
                                        onClick={this.onDelete}>
                                    Yes
                                </button>
                                <button className="btn btn-primary"
                                        onClick={() => window.location.replace('#')}>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }
});

export default DeleteProductComponent;
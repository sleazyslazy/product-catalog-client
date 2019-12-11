import React, { Component } from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import { getBackendURL, authHeader, isLoggedIn } from "../../utils/utils";

var UpdateProductComponent = React.createClass({
    getInitialState:function() {
        return {
            id: 0,
            name: '',
            description: '',
            price: 0,
            selectedCategoryId: 0,
            categories: [],
            successUpdate: null,
            isLoggedIn: false
        };
    },

    componentDidMount: function() {
        var productId = this.props.productId;

        if (isLoggedIn) {
            this.setState({
                isLoggedIn: isLoggedIn()
            })
        } else {
            window.location.href = '#';
        }

        // Populate categories drop down list
        this.serverRequestCat = $.get(getBackendURL('/api/category'), function(categories) {
            this.setState({
                categories: categories
            });
        }.bind(this));

        // load form values
        this.serverRequestProd = $.get({
                url: getBackendURL('/api/product/'+productId),
                headers: authHeader()
            },
            function(product) {
                this.setState({selectedCategoryId: product.category.id});
                this.setState({id: product.id});
                this.setState({name: product.name});
                this.setState({price: product.price});
                this.setState({description: product.description});
                $('.page-header h1').text(product.name);
            }.bind(this));

    },

    componentWillUnmount: function() {
        this.serverRequestCat.abort();
        this.serverRequestProd.abort();
    },

    onNameChange: function(e) {
        this.setState({name: e.target.value});
    },

    onCategoryChange: function(e) {
        this.setState({selectedCategoryId: e.target.value});
    },

    onDescriptionChange: function(e) {
        this.setState({description: e.target.value});
    },

    onPriceChange: function(e) {
        this.setState({price: e.target.value});
    },

    onSave: function(e) {
        var parameters = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            category_id: this.state.selectedCategoryId
        }

        $.ajax({
                method: 'PUT',
                url: getBackendURL('/api/product/' + parameters.id),
                data: parameters,
                headers: authHeader(),
                success: function(result) {
                    if(result.success) {
                        this.setState({successUpdate: true});
                    } else {
                        this.setState({successUpdate: false});
                        this.setState({message: result.message});
                    }
                }.bind(this)
        });
        e.preventDefault();
    },

    render: function() {
        var categoriesOptions = this.state.categories.map(function(category) {
            return (
                <option key={category.id} value={category.id}>{category.name}</option>
            );
        });

        return (
            <div>
                {
                    this.state.successUpdate ?
                        <div className="alert alert-success">
                            Product was updated.
                        </div>
                        : null
                }
                {
                    !this.state.successUpdate && this.state.successUpdate != null ?
                        <div className="alert alert-danger">
                            {this.state.message}
                        </div>
                        : null
                }

                <a href="#"
                   className="btn btn-primary margin-bottom-1em"
                >
                    All Products
                </a>
                <form onSubmit={this.onSave}>
                    <table className="table table-bordered table-hover">
                        <tbody>
                        <tr>
                            <td>Name</td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.name}
                                    onChange={this.onNameChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Description</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.description}
                                        onChange={this.onDescriptionChange}></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>Price ($)</td>
                            <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={this.state.price}
                                    className="form-control"
                                    onChange={this.onPriceChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Category</td>
                            <td>
                                <select
                                    onChange={this.onCategoryChange}
                                    className="form-control"
                                    value={this.state.selectedCategoryId}
                                >
                                    <option value="-1">Select Category...</option>
                                    {categoriesOptions}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                                <button className="btn btn-primary"
                                        onClick={this.onSave}>Save Changes</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});

export default UpdateProductComponent;
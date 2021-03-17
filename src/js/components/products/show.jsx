import { Component } from "react";
import * as React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

import { getBackendURL, authHeader } from "../../utils/utils";

class ReadOneProductComponent extends React.Component {
    state = {
        id: 0,
        name: '',
        description: '',
        price: 0,
        category_name: ''
    };

    componentDidMount() {
        var productId = this.props.productId;

        // load form values
        this.serverRequestProd = $.get({
                url: getBackendURL('/api/product/'+productId),
                headers: authHeader()
            },
            function(product) {
                this.setState({category_name: product.category.name});
                this.setState({id: product.id});
                this.setState({name: product.name});
                this.setState({price: product.price});
                this.setState({description: product.description});
                $('.page-header h1').text(product.name);
            }.bind(this));
    }

    componentWillUnmount() {
        this.serverRequestProd.abort();
    }

    render() {
        return (
            <div>
                <a href="#"
                   className="btn btn-primary margin-bottom-1em"
                >
                    All Products
                </a>

                <table className="table table-bordered table-responsive">
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{this.state.name}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{this.state.description}</td>
                    </tr>
                    <tr>
                        <td>Price ($)</td>
                        <td>{this.state.price}</td>
                    </tr>
                    <tr>
                        <td>Category</td>
                        <td>{this.state.category_name}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ReadOneProductComponent;
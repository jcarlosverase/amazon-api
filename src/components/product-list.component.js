import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = props => (
  <tr>
    <td>{props.Product.username}</td>
    <td>{props.Product.description}</td>
    <td>{props.Product.duration}</td>
    <td>{props.Product.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.Product._id}>edit</Link> | <a href="#" onClick={() => { props.deleteProduct(props.Product._id) }}>delete</a>
    </td>
  </tr>
)

export default class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.deleteProduct = this.deleteProduct.bind(this)

    this.state = {Products: []};
  }

  componentDidMount() {
    axios.get('https://backend-stf.herokuapp.com/Products/')
      .then(response => {
        this.setState({ Products: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentWillMount(){

  }

  deleteProduct(id) {
    axios.delete('https://backend-stf.herokuapp.com/Products/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      Products: this.state.Products.filter(el => el._id !== id)
    })
  }

  ProductList() {
    return this.state.Products.map(currentProduct => {
      return <Product Product={currentProduct} deleteProduct={this.deleteProduct} key={currentProduct._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Products</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.ProductList() }
          </tbody>
        </table>
      </div>
    )
  }
}
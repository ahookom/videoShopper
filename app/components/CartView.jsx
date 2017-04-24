// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import OrderForm from './OrderForm'
import Table from './Table'



// ------------- Component
class CartView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { displayOrderForm: false }

    this.handleClick = this.handleClick.bind(this)
  }

  fetchProductNames(Products) {
    return Products.forEach(purchase => purchase.product = this.findProductNameById(+purchase.product))
  }

  findProductNameById(id) {
    console.log(this.props.products)
    let productArr = this.props.products.filter(product => product.id===id)
    return productArr[0].name
  }

  handleClick(event) {
    event.preventDefault()
    this.setState(prevState => ({displayOrderForm: !prevState.displayOrderForm}))
  }

  render() {
    let { Products } = JSON.parse(window.localStorage.cart)
    // Products=this.fetchProductNames(Products)
    let tableName = 'Orders'
    let orderColumns = Object.keys(Products[0])
    let orderRows = Products
    return (
          <header className="jumbotron hero-spacer">
           <h3>My Cart</h3>
           <Table tableName={tableName} columns={orderColumns} rows={orderRows} />
           <p><a className="btn btn-primary btn-large" onClick={this.handleClick}>Place your order! </a>
           </p>
           {this.state.displayOrderForm &&
             <OrderForm />
           }
       </header>
    )
  }
}

// ------------- Container
const mapStateToProps =(state) => {
  return {
    products: state.products.allProducts
  }
}

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(CartView)

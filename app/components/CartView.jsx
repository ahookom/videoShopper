// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import OrderForm from './OrderForm'
import Table from './Table'
import EditPurchase from './EditPurchase'
import {addProductNames, findObjectById} from '../reducers/utility'

// ------------- Component
class CartView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { displayOrderForm: false }
    this.state = { displayEditForm: false }
    this.handleClick = this.handleClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    this.setState(prevState => ({displayOrderForm: !prevState.displayOrderForm}))
  }

  handleEditClick(event) {
    event.preventDefault()
    this.setState(prevState => ({displayEditForm: !prevState.displayEditForm}))
    console.log('~~edit click in cart', this.state.displayEditForm)
  }

  render() {
    let extendedProducts
    const { Products } = JSON.parse(window.localStorage.cart)
    this.props.products.length ? extendedProducts = addProductNames(Products, this.props.products) : extendedProducts = []
    const tableName = 'Orders'
    const orderColumns = extendedProducts.length ? Object.keys(extendedProducts[0]) : []
    const orderRows = extendedProducts
    return (
          <header className="jumbotron hero-spacer">
            {this.state.displayEditForm ? (
              <EditPurchase order={extendedProducts}/>
            ) : (
             <Table tableName={tableName} columns={orderColumns} rows={orderRows} />
            )
            }
             <p> <a className="btn btn-primary btn-large" onClick={this.handleClick}>Add Order Info! </a>
              <a className="btn btn-primary btn-large pull-right" onClick={this.handleEditClick}>Edit Cart </a>
             </p>
          <p>
           {this.state.displayOrderForm &&
             <OrderForm products={extendedProducts}/>
           }
           </p>
       </header>
    )
  }
}


// ------------- Container
const mapStateToProps =(state) => ({
  products: state.products.allProducts
})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(CartView)

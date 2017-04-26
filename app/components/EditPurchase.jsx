// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import OrderForm from './OrderForm'
import Table from './Table'
import {removeObj, addProductNames, findObjectById} from '../reducers/utility'
import { Link } from 'react-router'

// ------------- Component
class EditPurchase extends React.Component {
  constructor(props) {
    super(props)
    this.order = props.order
    this.removeProduct = this.removeProduct.bind(this)
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
    // this.handleChangeProduct = this.handleChangeProduct.bind(this)
  }

  removeProduct(productObj) {
    // event.preventDefault()
    this.order = removeObj(this.order, productObj)
    console.log('extendedProducts in removeProduct ', this.order)
  }

  handleChangeQuantity(event) {
    this.order.quantity = event.target.value
  }

  // handleChangeProduct(event) {
  //   this.order.product = event.target.value
  // }

  render() {
    console.log('~~props, props.products in EditPurchase ', this.props, this.props.products)
    console.log('order in EditPurchase ', this.order)
    return (
      <form onSubmit={this.handleSubmit}>
      { this.order.map(item => (
      <div>
          <label>
            Quantity:
            <input type="text" value={item.quantity} onChange={this.handleChangeQuantity} />
          </label>
          <label>
            Products:
            <select value={item.product} onChange={this.handleChangeProduct}>
              { this.props.products.map(prod => (
                <option key={prod.id} value={prod.id}>{prod.name}</option>
              )) }
            </select>
          </label>
        <input type="submit" value="Submit" />
      </div>
      ))}
      </form>
    );
  }
}

// ------------- Container
const mapStateToProps =(state) => ({
  products: state.products.allProducts
})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(EditPurchase)
// return (
//         <header className="jumbotron hero-spacer">
//           <h3>My Cart</h3>
//            <ul>
//             { this.extendedProducts.map(purchase => (
//               <li key={purchase.product} >{purchase.productName}{purchase.quantity}
//                  <Link><button onClick= { () => this.removeProduct(purchase)}>  X </button></Link></li>
//             )) }
//           </ul>
//        </header>
//     )

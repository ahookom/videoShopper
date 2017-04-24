// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import LoginBoxes from './LoginBoxes'

function countProducts(productsArr) { // maybe change name to countCartProducts, more meaningful on what it actually does -AGKH
  return productsArr.reduce((accum, purchase) => accum+=purchase.quantity, 0)
}

// ------------- Component
const NavBar = (props) => {
  let cart = JSON.parse(window.localStorage.cart)

  // seed a dummy purchase for testing purposes
  if (!cart.Products.length) {
    window.localStorage['cart'] = JSON.stringify({
      Products: [ { product: 1, quantity: 2 } ]
    })
  }

  const cartAmountDisplay = cart.Products.length ? '('+countProducts(JSON.parse(window.localStorage.cart).Products)+')' : '' // consider using css to make this look nicer -AGKH

  return (
<nav className="navbar navbar-inverse navbar-fixed-top" role="navigation"> // watch indentation -AGKH
        <div className="container">

            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to="/">Video Shopper</Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                    <li>
                        <Link to='/products'>Products</Link>
                    </li>
                    <li>
                        <Link to='/cart'>{`Cart ${cartAmountDisplay}`}</Link>
                    </li>
                    <li>
                        <LoginBoxes />
                    </li>
                </ul>

            </div>

        </div>

    </nav>
  )
}

// ------------- Container
const mapStateToProps = null

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

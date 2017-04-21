// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import OrderForm from './OrderForm'

// ------------- Component
const CartView = (props) => (
          <header className="jumbotron hero-spacer">
           <h1>CartView</h1>
           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, ipsam, eligendi, in quo sunt possimus non incidunt odit vero aliquid similique quaerat nam nobis illo aspernatur vitae fugiat numquam repellat.</p>
           <p><a className="btn btn-primary btn-large">Call to action!</a>
           </p>
           <OrderForm />
       </header>
 )

// ------------- Container
const mapStateToProps = null

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(CartView)

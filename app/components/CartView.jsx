// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import OrderForm from './OrderForm'

// ------------- Component
class CartView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { displayOrderForm: false }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    this.setState(prevState => ({displayOrderForm: !prevState.displayOrderForm}))
    console.log('~~~in CartView - displayOrderForm: ', this.state.displayOrderForm)
  }

  render() {
    return (
          <header className="jumbotron hero-spacer">
           <h1>CartView</h1>
           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, ipsam, eligendi, in quo sunt possimus non incidunt odit vero aliquid similique quaerat nam nobis illo aspernatur vitae fugiat numquam repellat.</p>
           <p><a className="btn btn-primary btn-large" onClick={this.handleClick}>Dispaly Order Form </a>
           </p>
           {this.state.displayOrderForm &&
             <OrderForm />
           }
       </header>
    )
  }
}

// ------------- Container
const mapStateToProps = null

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(CartView)

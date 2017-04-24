import React from 'react'
import { connect } from 'react-redux'
import {addOrder} from '../reducers/order'

export class OrderForm extends React.Component {
  constructor(props) {
    super(props)
    if (props.auth) {
      this.state = {
        name: props.auth.name ? props.auth.name : '',
        email: props.auth.email ? props.auth.email : '',
        billingAdddress: props.auth.billingAddress ? props.auth.billingAddress : '',
        shippingAddress: props.auth.shippingAddress ? props.auth.shippingAddress : '',
        phoneNumber: props.auth.phoneNumber ? props.auth.phoneNumber : ''
      }
    } else {
      this.state = {
        name: '',
        email: '',
        billingAdddress: '',
        shippingAddress: '',
        phoneNumber: ''
      }
      }
      // userId: props.auth ? props.auth.userId : ''

    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangeBilling = this.handleChangeBilling.bind(this)
    this.handleChangeShipping = this.handleChangeShipping.bind(this)
    this.handleChangePhone = this.handleChangePhone.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeName(event) {
    this.setState({name: event.target.value})
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value})
  }

  handleChangeBilling(event) {
    this.setState({billingAdddress: event.target.value})
  }

  handleChangeShipping(event) {
    this.setState({shippingAddress: event.target.value})
  }

  handleChangePhone(event) {
    this.setState({phoneNumber: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    const orderData = {
      shippingAddress: this.state.shippingAddress,
      billingAdddress: this.state.billingAdddress,
      phoneNumber: this.state.phoneNumber,
      name: this.state.name,
      email: this.state.email
    }
    // console.log('~~in order form ', event.target.shippingAddress.value)
    this.props.addOrder(orderData)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleChangeName} />
        </label>
        <label>
          Email:
          <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
        </label>
        <label>
          BillingAddress:
          <input type="text" value={this.state.billingAdddress} onChange={this.handleChangeBilling} />
        </label>
        <label>
          ShippingAddress:
          <input type="text" value={this.state.shippingAddress} onChange={this.handleChangeShipping} />
        </label>
        <label>
          PhoneNumber:
          <input type="text" value={this.state.phoneNumber} onChange={this.handleChangePhone} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

// ------------- Container
const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  addOrder: (orderData) => {
    dispatch(addOrder(orderData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)

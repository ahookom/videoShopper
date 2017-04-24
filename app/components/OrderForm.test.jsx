import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))
import {connect} from 'react-redux'
import store from '../store'

import OrderForm from './OrderForm'

/* global describe it beforeEach */
describe('<OrderForm />', () => {
  let root
  beforeEach('render the root', () =>
    root = shallow(<OrderForm/>)
  )

  it('shows a orderForm form', () => {
    expect(root.find('input[type="text" value={this.state.name}]')).to.have.length(1)
  })

  it('shows a password field', () => {
    const pw = root.find('input[name="password"]')
    expect(pw).to.have.length(1)
    expect(pw.at(0)).to.have.attr('type').equals('password')
  })

  it('has a submit button', () => {
    const submit = root.find('input[type="submit"]')
    expect(submit).to.have.length(1)
  })

  describe('when submitted', () => {
    const addOrder = spy()
    const root = shallow(<OrderForm addOrder={addOrder}/>)
    const submitEvent = {
      preventDefault: spy(),
      target: {
        name: {value: 'So many names'},
        email: {value: 'god@example.com'},
        billingAddress: {value: '1600 PearlyGate Burning Bush, Egypt 66666'},
        shippingAddress: {value: '1600 PearlyGate Burning Bush, Egypt 66666'},
        poneNumber: {value: '316-316'},
      }
    }

    beforeEach('submit', () => {
      addOrder.reset()
      submitEvent.preventDefault.reset()
      root.simulate('submit', submitEvent)
    })

    it('calls props.addOrder with credentials', () => {
      expect(addOrder).to.have.been.calledWith(
        submitEvent.orderData
      )
    })

    it('calls preventDefault', () => {
      expect(submitEvent.preventDefault).to.have.been.called
    })
  })
})

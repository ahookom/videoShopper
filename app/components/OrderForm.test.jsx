import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))
import {connect} from 'react-redux'
// import configureMockStore from 'redux-mock-store'

// import undecorated component, not the connected component
import {OrderForm} from './OrderForm'

/* global describe it beforeEach */
describe('<OrderForm />', () => {
  let root
  beforeEach('render the root', () =>
    root = shallow(<OrderForm/>)
  )

  it('shows an orderForm form', () => {
    const inputText = root.find('input[type="text"]')
    expect(inputText).to.have.length(5)
  })

  it('has a submit button', () => {
    const submit = root.find('input[type="submit"]')
    expect(submit).to.have.length(1)
  })

  describe('when submitted', () => {
    const addOrder = spy()
    const root = shallow(<OrderForm addOrder={addOrder}/>)
    const submitEvent = {
      preventDefault: spy()
    }
    root.setState({
      shippingAddress: '1600 Home',
      billingAddress: '1600 Home',
      phoneNumber: '316-316-1234',
      name: 'Bruce',
      email: 'bcg@bcg.com'
    })

    beforeEach('submit', () => {
      addOrder.reset()
      submitEvent.preventDefault.reset()
      root.simulate('submit', submitEvent)
    })

    it('calls props.addOrder with credentials', () => {
      expect(addOrder).to.have.been.calledWith({
        shippingAddress: '1600 Home',
        billingAddress: '1600 Home',
        phoneNumber: '316-316-1234',
        name: 'Bruce',
        email: 'bcg@bcg.com'
      })
    })

    it('calls preventDefault', () => {
      expect(submitEvent.preventDefault).to.have.been.called
    })
  })
})

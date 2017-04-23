import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))

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
    const login = spy()
    const root = shallow(<Login login={login}/>)
    const submitEvent = {
      preventDefault: spy(),
      target: {
        username: {value: 'bones@example.com'},
        password: {value: '12345'},
      }
    }

    beforeEach('submit', () => {
      login.reset()
      submitEvent.preventDefault.reset()
      root.simulate('submit', submitEvent)
    })

    it('calls props.login with credentials', () => {
      expect(login).to.have.been.calledWith(
        submitEvent.target.username.value,
        submitEvent.target.password.value,
      )
    })

    it('calls preventDefault', () => {
      expect(submitEvent.preventDefault).to.have.been.called
    })
  })
})

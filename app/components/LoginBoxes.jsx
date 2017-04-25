
// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import WhoAmI from './WhoAmI'


// ------------- Component
const LoginBoxes = ({ user, children }) => {
 return (
   <div>
    <ul className="nav navbar-nav">
       {user ? <WhoAmI/> : <Login/>}
    </ul>
    {children}
   </div>
 )
}


// ------------- Container
const mapStateToProps = ({ auth }) => ({ user: auth })

//const mapDispatchToProps = null;

export default connect(mapStateToProps)(LoginBoxes)



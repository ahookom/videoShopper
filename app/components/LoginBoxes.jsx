
// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import WhoAmI from './WhoAmI'


// ------------- Component
const LoginBoxes = ({ user, children }) => {
 return (
   <div>
     <nav>
       {user ? <WhoAmI/> : <Login/>}
     </nav>
     {children}
   </div>
 );
};


// ------------- Container
const mapStateToProps = ({ auth }) => ({ user: auth })

//const mapDispatchToProps = null;

export default connect(mapStateToProps)(LoginBoxes);



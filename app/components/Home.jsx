// Required libraries
import React from 'react'
import WelcomeBox from './WelcomeBox'
import NavBar from  './NavBar'
import { connect } from 'react-redux'

//    <NavBar />

// ------------- Component
const Home = (props) => {
 return (
<div>
    <NavBar />
   <div className="container">
       <WelcomeBox />
   </div>
</div>
 );
};

// ------------- Container
const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Home);

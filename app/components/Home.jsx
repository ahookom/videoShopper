// Required libraries
import React from 'react'
import WelcomeBox from './WelcomeBox'
import { connect } from 'react-redux'

// ------------- Component
const Home = (props) => {
 return (
   <div className="container">
       <WelcomeBox />
   </div>
 );
};

// ------------- Container
const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Home);

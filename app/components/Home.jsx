// Required libraries
import React from 'react';
import { connect } from 'react-redux';

// ------------- Component
const Home = (props) => {
  return (
    <div>
      <h1>These are the otters!</h1>
     
    </div>
  );
};

// ------------- Container
const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
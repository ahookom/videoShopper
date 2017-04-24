// Required libraries
import React from 'react'
import { connect } from 'react-redux'

// ------------- Component
const DeleteButton = (props) => {
    const onButtonClick = (e) => {
        //e.preventDefault();
        alert('Are you sure you want to delete?');
    };


    return (
        <button onClick={onButtonClick}>X</button>
    );
};

// ------------- Container
const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);


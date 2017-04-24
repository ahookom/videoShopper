// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import LoginBoxes from './LoginBoxes'

// ------------- Component
const NavBar = (props) => {
 return (
<nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">

            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to="/">Video Shopper</Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                    <li>
                        <Link to='/products'>Products</Link>
                    </li>
                    <li>
                        <Link to='/cart'>{`Cart ${Object.keys(window.localStorage).length ? '('+Object.keys(window.localStorage).length+')' : ''}`}</Link>
                    </li>
                    <li>
                        <LoginBoxes />
                    </li>
                </ul>

            </div>

        </div>

    </nav>
 )
}

// ------------- Container
const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import CategoriesContainer from './categoriesContainer'

// ------------- Component
const HomeView = (props) => (
<div>
   <div className="container">
        <header className="jumbotron hero-spacer">
           <h1>Welcome to Video Shopper!</h1>
           <p>The streamlined way to order product videos for your entire catalog!</p>
           <p><a className="btn btn-primary btn-large">Call to action!</a>
           </p>
       </header>
   </div>

   <CategoriesContainer />

</div>
 )

// ------------- Container
const mapStateToProps = null

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)

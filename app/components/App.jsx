// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
//import LoginBoxes from './LoginBoxes'

// ------------- Component
const App = (props) => {
  return (

     <div>
      <NavBar />
    
       {props.children ? props.children : null}

        <footer>
            <div className="row">
                <div className="col-lg-12">
                    <p>Copyright &copy; Video Shopper 2017</p>
                </div>
            </div>
        </footer>
    </div>

  )
}

// ------------- Container
const mapStateToProps = null

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(App)

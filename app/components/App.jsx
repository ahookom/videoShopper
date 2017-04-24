// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import store from '../store'
import { fetchCategories } from '../reducers/category.jsx'
import { fetchProducts } from '../reducers/product.jsx'
//import LoginBoxes from './LoginBoxes'

// ------------- Component
class App extends React.Component {
  componentDidMount() {
    store.dispatch(fetchCategories())
    store.dispatch(fetchProducts())

    // initialize cart
    let cart = JSON.parse(window.localStorage.cart)
    if (!cart.Products)cart.Products=[]
    window.localStorage.cart = JSON.stringify(cart)
  }

  render() {
    return (
     <div>
      <NavBar />

       {this.props.children ? this.props.children : null}

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
}

// ------------- Container
const mapStateToProps = null

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(App)

// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import store from '../store'
import { fetchCategories } from '../reducers/category.jsx'
import { fetchProducts } from '../reducers/product.jsx'
//import LoginBoxes from './LoginBoxes'

function countCartProducts(productsArr) {
  return productsArr.reduce((accum, purchase) => accum+=purchase.quantity, 0)
}

// ------------- Component
class App extends React.Component {
  componentDidMount() {
    store.dispatch(fetchCategories())
    store.dispatch(fetchProducts())
    window.addEventListener('storage', () => this.forceUpdate())
  }

  render() {
    return (
     <div>
      <NavBar cart={JSON.parse(window.localStorage.cart)} />

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

function navBarReRender(e) {
  console.log('STORAGE CHANGED', e.target.value)
  NavBar.forceUpdate()
}

// ------------- Container
const mapStateToProps = null

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(App)

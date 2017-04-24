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
    store.dispatch(fetchCategories()) // Don't require in store in connected components, push logic to onEnter in your routes -AGKH
    store.dispatch(fetchProducts())

    // initialize cart

  }

  render() {
    return (
     <div>
      <NavBar />

       {this.props.children ? this.props.children : null} // you can just have this.props.children -AGKH

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

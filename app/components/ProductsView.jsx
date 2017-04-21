// Required libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductCard from './ProductCard'
import Carousel from './Carousel'
import CategoriesSideBar from './CategoriesSideBar'
import { receiveProducts } from '../reducers/product'


// ------------- Component
class ProductsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeCategory: '',
      activeProducts: props.products
    }
    this.setActiveCategory=this.setActiveCategory.bind(this)
  }

  setActiveCategory(category) {
    if (this.state.activeCategory!==category) {
      this.setState({
        activeCategory: category,
        activeProducts: this.props.products.filter(product => product.tags.includes(category))
      })
    } else {
      this.setState({
        activeCategory: '',
        activeProducts: this.props.products
      })
    }
  }

  render() {
    return (

    <div>

      <link href="css/shop-homepage.css" rel="stylesheet" />

      <div className="container">

        <div className="row">

          <CategoriesSideBar active={this.state.activeCategory} setActiveCategory={this.setActiveCategory} />

          <div className="col-md-9">

            <div className="row">

              {this.state.activeProducts.map((product, index) => <div key={index}><ProductCard product={product} /></div>)}

            </div>

          </div>

        </div>

      </div>

    </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => (
  {
    products: state.products.allProducts
  }
)

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (products) => dispatch(receiveProducts(products))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView)

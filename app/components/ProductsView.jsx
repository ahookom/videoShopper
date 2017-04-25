// Required libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductCard from './ProductCard'
import Carousel from './Carousel'
import CategoriesSideBar from './CategoriesSideBar'
import { receiveProducts } from '../reducers/product'
import FlipMove from 'react-flip-move'

// ------------- Component
class ProductsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeCategory: '',
      activeProducts: props.products,
      products: props.products
    }
    this.setActiveCategory=this.setActiveCategory.bind(this)
  }

  componentDidMount() {
    if (this.props.params.category) {
      this.setActiveCategory(this.props.params.category)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.products.length!==nextProps.products.length) {

      this.setState({
        products: nextProps.products,
        activeProducts: this.state.activeCategory ? nextProps.products.filter(product => product.tags.includes(this.state.activeCategory)) : nextProps.products
      })
    }
  }

  setActiveCategory(category) {
    if (this.state.activeCategory !== category) {
      this.setState({
        activeCategory: category,
        activeProducts: this.state.products.filter(product => product.tags.includes(category))
      })
    } else {
      this.setState({
        activeCategory: '',
        activeProducts: this.state.products
      })
    }
  }

  render() {
    return (

    <div>

      <div className="container">

        <div className="row">

          <CategoriesSideBar active={this.state.activeCategory} setActiveCategory={this.setActiveCategory} />

          <div className="col-md-9">

            <div className="row">
              <FlipMove easing="cubic-bezier(1, 0, 0, 1)" duration={750} leaveAnimation='fade' appearAnimation='fade' enterAnimation='fade'>
                {this.state.activeProducts.map((product, index) =>
                  <div key={product.id*100}><ProductCard product={product} /></div>)}
              </FlipMove>
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

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView)

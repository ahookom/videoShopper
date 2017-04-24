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
      activeProducts: props.products, // you can push the logic of filtering into the reducer, as an option -AGKH
      products: props.products
    }
    this.setActiveCategory=this.setActiveCategory.bind(this)
  }

  componentDidMount() {
    if (this.props.params.category) {
      this.setActiveCategory(this.props.params.category)
    }
  }

  componentWillReceiveProps(nextProps) { // you can push the logic of filtering into the reducer, as an option -AGKH
    if (this.state.products.length!==nextProps.products.length) {

      this.setState({
        products: nextProps.products, // why have products on the local state if you only use filtered products? -AGKH
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
    } // this can DRY up, maybe call setState once and pass it an object as a result of your logic -AGKH
  }

  render() {
    return (

    <div>

      <div className="container"> // maybe not so many enters, this looks weird -AGKH

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

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView)

// Required libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { findObjectById } from '../reducers/utility'
import Stars from './Stars'
import CategoriesSideBar from './CategoriesSideBar'
import dateFormat from 'dateformat'
import { Link } from 'react-router'


// function timestamp() {
//   return dateformat('yyyy-mm-dd')
// }

// ------------- Component
const ProductView = (props) => {
  const product = findObjectById(props.allProducts, props.productId) || {}

  function clickHandler(){
    let cart = JSON.parse(window.localStorage.cart)
    let addedToCart = false
    for (var i=0; i<cart.Products.length; i++) {
        if (cart.Products[i].product === product.id) {
          cart.Products[i].quantity++
          addedToCart = true
        }
    }

    if (addedToCart === false) {
      cart.Products.push({
        product: product.id,
        quantity: 1
      })
    }
    window.localStorage.cart = JSON.stringify(cart)
    window.dispatchEvent(new Event('storage'))
  }
      return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <div className="thumbnail">
                            <img className="img-responsive" src={product.imageURL} alt="" />
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="caption-full">
                            <h2>{product.name}</h2>
                            <h3>${product.price}</h3>
                            <p>{product.description}</p>
                        </div>
                        <div>
                            <Link  to="/cart" className="btn btn-primary btn-large" onClick={clickHandler}>Add To Cart</Link>
                        </div>
                        <div className="ratings">
                            {product.reviews && product.reviews.length > 0 &&
                            <div>
                                <hr />
                                <div className="pull-right">{product.reviews && product.reviews.length} reviews</div>
                                <Stars rating={product.rating} /> {product.rating} stars

                            </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="well">
                    <div className="text-right">
                        <a className="btn btn-success">Leave a Review</a>
                    </div>
                    {
                        product.reviews && product.reviews.length > 0 ? product.reviews.map(x => {
                            return (
                                <div key={x.id}>
                                    <Stars rating={x.stars} />
                                    <h4>{x.title}</h4>
                                    <h5>{x.text}</h5>
                                    <div>{dateFormat(x.updated_at, 'dddd, mmmm dS, yyyy')}</div>
                                    <hr />
                                </div>
                            )
                        }) : <h4> Be the first to leave a review! </h4>
                    }
                </div>
            </div>
        </div>
      )
}



// ------------- Container
const mapStateToProps = (state, ownProps) => (
  {
    productId: state.products.selectedProductId,
    allProducts: state.products.allProducts,
    activeCategory: state.categories.selectedCategory
  }
)

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(ProductView)

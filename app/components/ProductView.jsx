// Required libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { findObjectById } from '../reducers/utility'
import Stars from './Stars'


// ------------- Component
const ProductView = (props) => {
    const product = findObjectById(props.allProducts, props.productId) || {}
    console.log('****************', product)
      return (
        <div>
            <link href="/css/shop-item.css" rel="stylesheet" />
            <div className="container">

                <div className="row">

                    <div className="col-md-3">
                        <p className="lead">Shop Name</p>
                        <div className="list-group">
                            <a href="#" className="list-group-item active">Category 1</a>
                            <a href="#" className="list-group-item">Category 2</a>
                            <a href="#" className="list-group-item">Category 3</a>
                        </div>
                    </div>

                    <div className="col-md-9">

                        <div className="thumbnail">
                            <img className="img-responsive" src={product.imageURL} alt="" />
                            <div className="caption-full">
                                <h4 className="pull-right">${product.price}</h4>
                                <h4><a href="#">{product.name}</a>
                                </h4>
                                <p>{product.description}</p>
                            </div>
                            <div className="ratings">
                                <p className="pull-right">3 reviews</p>
                                {/*<p>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star-empty"></span>
                                    4.0 stars
                                </p>*/}
                                <p>
                                    <Stars rating={product.rating} /> {product.rating} stars
                                </p>
                            </div>
                        </div>

                        <div className="well">

                            <div className="text-right">
                                <a className="btn btn-success">Leave a Review</a>
                            </div>

                            <hr />

                            <div className="row">
                                <div className="col-md-12">
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star-empty"></span>
                                    Anonymous
                                    <span className="pull-right">10 days ago</span>
                                    <p>This product was great in terms of quality. I would definitely buy another!</p>
                                </div>
                            </div>

                            <hr />

                            <div className="row">
                                <div className="col-md-12">
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star-empty"></span>
                                    Anonymous
                                    <span className="pull-right">12 days ago</span>
                                    <p>I've alredy ordered another one!</p>
                                </div>
                            </div>

                            <hr />

                            <div className="row">
                                <div className="col-md-12">
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star-empty"></span>
                                    Anonymous
                                    <span className="pull-right">15 days ago</span>
                                    <p>I've seen some better than this, but not at this price. I definitely recommend this item.</p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
      )
}



// ------------- Container
const mapStateToProps = (state, ownProps) => (
  {
    productId: state.products.selectedProductId,
    allProducts: state.products.allProducts
  }
)

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(ProductView)

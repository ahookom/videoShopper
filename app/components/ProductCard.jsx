import React, { Component } from 'react'
import { Link } from 'react-router'
import Stars from './Stars'


export default class ProductCard extends Component {
  render() {
    return (
        <div className="col-sm-4 col-lg-4 col-md-4" style={{zIndex: 100 - this.props.product.id}}>
            <div className="thumbnail">
                <img src={this.props.product.imageURL} alt="" />
                <div className="price">
                    <h4 className="pull-right">{`$${this.props.product.price}`}</h4>
                </div>
                <div className="caption">
                    <h4><Link to={`/product/${this.props.product.id}`}>{this.props.product.name}</Link>
                    </h4>
                    <p>{this.props.product.description}</p>
                </div>
                <div className="ratings">
                    <p className="pull-right">{this.props.product.reviews.length}</p>
                    <p>
                        <Stars rating={this.props.product.rating} />
                    </p>
                </div>
            </div>
        </div>
        )
    }
}


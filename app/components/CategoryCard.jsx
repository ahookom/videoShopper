import React from 'react'
import { Link } from 'react-router'

export default (props) => {
  const title = props.title || 'Title'
  const description = props.description || 'Fantastic product for you!'
  const imageURL = props.imageURL || 'http://geekmom.com/wp-content/uploads/2015/12/Guardians-of-the-Galaxy.jpg'
  const frontEndRoute = props.frontEndRoute || 'products'
  return (
    <div className="col-md-3 col-sm-6 hero-feature">
      <div className="thumbnail">
          <img src={imageURL} alt="" />
          <div className="caption">
              <h3>{title}</h3>
              <p>{description}</p>
              <p>
                  <Link to={props.frontEndRoute} className="btn btn-primary">Buy Now!</Link> <Link to={props.frontEndRoute} className="btn btn-default">More Info</Link>
              </p>
          </div>
      </div>
  </div>
  )
}

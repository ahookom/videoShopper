import React from 'react'

export default (props) => {
  return (
  <div className="col-sm-4 col-lg-4 col-md-4">
      <div className="thumbnail">
          <img src="http://placehold.it/320x150" alt="" />
          <div className="caption">
              <h4 className="pull-right">$64.99</h4>
              <h4><a href="#">Second Product</a>
              </h4>
              <p>This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="ratings">
              <p className="pull-right">12 reviews</p>
              <p>
                  <span className="glyphicon glyphicon-star"></span>
                  <span className="glyphicon glyphicon-star"></span>
                  <span className="glyphicon glyphicon-star"></span>
                  <span className="glyphicon glyphicon-star"></span>
                  <span className="glyphicon glyphicon-star-empty"></span>
              </p>
          </div>
      </div>
  </div>
  )
}

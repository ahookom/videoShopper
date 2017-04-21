import React from 'react'

export default (props) =>

  <div className="row carousel-holder">

    <div className="col-md-12">
      <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
          <li data-target="#carousel-example-generic" data-slide-to="1"></li>
          <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="item active">
            <img className="slide-image" src="https://upload.wikimedia.org/wikipedia/en/4/47/Deep_Dream_Toast_Sandwich.jpg" alt="" />
          </div>
          <div className="item">
            <img className="slide-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Kano_Eitoku_-_Cypress_Trees.jpg/800px-Kano_Eitoku_-_Cypress_Trees.jpg" alt="" />
          </div>
          <div className="item">
            <img className="slide-image" src="https://i.kinja-img.com/gawker-media/image/upload/s--DWqXxWYD--/c_scale,fl_progressive,q_80,w_800/ec4xwj3nj9jc2bczxq0f.jpg" alt="" />
          </div>
        </div>
        <a className="left carousel-control" href="#carousel-example-generic" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left"></span>
        </a>
        <a className="right carousel-control" href="#carousel-example-generic" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right"></span>
        </a>
      </div>
    </div>

  </div>

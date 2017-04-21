import React from 'react'

function classNameMaker(activeCategory, thisCategory) {
  return activeCategory===thisCategory ? 'list-group-item active' : 'list-group-item'
}

export default (props) =>
  <div className="col-md-3">
      <p className="lead">VideoShopper</p>
      <div className="list-group">
          <div onClick={() => props.setActiveCategory('video')} className={classNameMaker(props.active, 'video')}>Product Videos</div>
          <div onClick={() => props.setActiveCategory('photo')} className={classNameMaker(props.active, 'photo')}>Photo Packages</div>
          <div onClick={() => props.setActiveCategory('bundle')} className={classNameMaker(props.active, 'bundle')}>Complete Packages</div>
      </div>
  </div>

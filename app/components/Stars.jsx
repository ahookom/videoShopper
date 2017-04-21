import React from 'react'

function setClasses(thisStar, rating) {
  return thisStar <= rating ? 'glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty'
}

export default (props) => {
  const rating = Math.round(props.rating)
  return <span>
    <span className={ setClasses(1, rating) } />
    <span className={ setClasses(2, rating) } />
    <span className={ setClasses(3, rating) } />
    <span className={ setClasses(4, rating) } />
    <span className={ setClasses(5, rating) } />
  </span>
}

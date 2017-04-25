// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import CategoryCard from './CategoryCard'

// ------------- Component
const CategoriesContainer = (props) => {
  let categories = []
  if (props.categories) categories=props.categories
  return (
    <div>
       <div className="row">
            <div className="col-lg-12">
                <h3>Available Products</h3>
            </div>
        </div>

        <div className="row text-center">
            {categories.map((category, index) => <CategoryCard key={index} {...category} />)}
        </div>
   </div>
 )
}

// ------------- Container
const mapStateToProps = (state) => {
  return {
    categories: state.categories.allCategories
  }
}

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer)


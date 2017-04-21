// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import CategoryCard from './CategoryCard'

const videoCategory = {
  title: 'Videos',
  description: 'custom product videos with or without modelling and voiceover talent',
  imageURL: 'http://noirexcellence.com/wp-content/uploads/2016/11/maxresdefault-1-800x500.jpg',
  frontEndRoute: 'products/video'
}
const photoCategory = {
  title: 'Photos',
  description: 'professionally done packages',
  imageURL: 'http://www.portfolio.ideadunes.com/wp-content/uploads/2015/09/23-showing-goggles-on-white-background.jpg',
  frontEndRoute: 'products/photo'
}
const bundleCategory = {
  title: 'Complete Packages',
  description: 'save when you bundle',
  imageURL: 'http://i778.photobucket.com/albums/yy66/riffeym/Stereo%20Stuff/_DSC9626.jpg',
  frontEndRoute: 'products/bundle'
}

let categories = [videoCategory, photoCategory, bundleCategory]
// ------------- Component
const CategoriesContainer = (props) => {
  if (props.categories)categories=props.categories
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
const mapStateToProps = null

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer)


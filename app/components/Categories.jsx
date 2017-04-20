// Required libraries
import React from 'react'
import { connect } from 'react-redux'

// ------------- Component
const CategoriesView = (props) => {

    //need to add tags to schemas
    //const categories = props.tags;

 return (
    <div>
       <div className="row">
            <div className="col-lg-12">
                <h3>Latest Features</h3>
            </div>
        </div>

        <div className="row text-center">
            
            <p> list out categories here (look at code started below that is commented out) </p>
        </div>
   </div>
 );
};

// ------------- Container
const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesView);


            // categories && categories.map(category => (
            //      <div className="col-md-3 col-sm-6 hero-feature">
            //     <div className="thumbnail">
            //         <img src="http://placehold.it/800x500" alt="">
            //         <div className="caption">
            //             <h3>Feature Label</h3>
            //             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            //             <p>
            //                 <a href="#" className="btn btn-primary">Buy Now!</a> <a href="#" className="btn btn-default">More Info</a>
            //             </p>
            //         </div>
            //     </div>
            // </div>

            // ))

           
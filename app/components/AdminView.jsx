// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import Table from './Table'
import {Link} from'react-router'
import DeleteButton from './DeleteButton'


// ------------- Component
const AdminView = (props) => {

 return (
        <div>

            <div className="container">

                <div className="row">

                    <div className="col-md-3">
                        <p className="lead">Admin Panel</p>
                        <div className="list-group">
                            <Link to="/admin/orders" className="list-group-item">Orders</Link>
                            <a href="#" className="list-group-item">Products</a>
                            <a href="#" className="list-group-item">Users</a>
                        </div>
                    </div>

                  {props.children}
                </div>
            </div>
    </div>
    );
};

// ------------- Container
const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(AdminView);



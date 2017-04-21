// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import OrderRow from './OrderRow'


// ------------- Component
const AdminView = (props) => {
    const orders = props.orders;

 return (
        <div>

            <div className="container">

                <div className="row">

                    <div className="col-md-3">
                        <p className="lead">Admin Panel</p>
                        <div className="list-group">
                            <a href="#" className="list-group-item">Orders</a>
                            <a href="#" className="list-group-item">Products</a>
                            <a href="#" className="list-group-item">Users</a>
                        </div>
                    </div>

                    <div className="col-md-9">

                        <div className="row">
                            
                        <div className="panel panel-default">
                            <div className="panel-heading"> DataTables Advanced Tables</div>
                            <div className="panel-body">
                            <table width="100%" className="table table-striped table-bordered table-hover" id="dataTables-example">
                                <thead>
                                   <tr>
                                       <th>Order ID</th>
                                       <th>Status</th>
                                       <th>User ID</th>
                                   </tr>
                               </thead>
                               <tbody>
                                   
                                     {orders && orders.map((order, index) => <div key={index.toString()}><OrderRow order={order} /></div>)}
                                 
                                </tbody>
                            </table>
                            </div>
                       </div>


                    </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

// ------------- Container
const mapStateToProps = (state, ownProps) => {
  return {
    orders: state.orders.allOrders
  }
}
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(AdminView);



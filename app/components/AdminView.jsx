// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import Table from './Table'


// ------------- Component
const AdminView = (props) => {
        const rows = props.rows;
        const columns = props.columns;
        const tableName = "Orders";

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
                        <Table 
                            rows = {rows}
                            columns = {columns}
                            tableName = {tableName}
                        />

                    </div>
                </div>
            </div>
    </div>
    );
};

// ------------- Container
const mapStateToProps = (state, ownProps) => {

  return ({
    rows: state.orders.allOrders,
    columns: Object.keys(state.orders.allOrders[0])
  })
}
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(AdminView);



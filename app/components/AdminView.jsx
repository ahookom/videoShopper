// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import Table from './Table'
import {Link} from'react-router'
import DeleteButton from './DeleteButton'


// ------------- Component
const AdminView = (props) => {
        const rows = props.rows;
        const columns = props.columns;
        const tableName = "Orders";
        console.log("rows ",rows);
        console.log("columns ", columns);

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
    console.log("state ", state);
    console.log("state.orders.allOrders", console.log(state.orders.allOrders))
    console.log("Object.keys", state.orders.allOrders[0]);

    //let columns = ["id", "status", "delivery", "created at", "updated at", "user", "products"]
    let rows = state.orders.allOrders.map(function(order){
        let deleteRow = <DeleteButton />
        let rObj = {modify: deleteRow,id: order.id, status: order.status, delivery: order.deliveryDay, created_at: order.created_at, updated_at: order.updated_at, user:<Link to="">TestLink</Link>, products:'link'}
        return rObj;
    });
    return ({
        rows: rows,
        columns: Object.keys(rows[0])
    })

//   return ({
//     rows: state.orders.allOrders,
//     columns: Object.keys(state.orders.allOrders[0])
//   })
}
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(AdminView);



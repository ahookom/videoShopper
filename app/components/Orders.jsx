// // Required libraries
import React, {Component} from 'react'
import { connect } from 'react-redux'
import Table from './Table'
import {Link} from'react-router'
import DeleteButton from './DeleteButton'


// // ------------- Component
class Orders extends Component {

    constructor (props) {
        super(props);
        this.state = {
            userTable : {}
        }
        this.handleUserClick = this.handleUserClick.bind(this);
    }
   
    handleUserClick(userId){

        let user = this.props.users.find((user) => {
            return user.id === userId;
        })

        let userTableRow = {
            name: user.name,
            email: user.email,
            type: user.type,
            shippingAddress: user.shippingAddress,
            billingAddress: user.billingAddress
        }

        this.setState({
            userTable: {
                rows: [userTableRow],
                columns: Object.keys(userTableRow),
                tableName: user.name
            }
        })
    }

    render (){
        const orderColumns = this.props.orderColumns; 
        const orderRows = this.props.orderRows;

        orderRows && orderRows.map((order) => { //add a table link for each user in order table
            let userId = +order.userId;

            order.userId = <Link onClick={() => this.handleUserClick(userId)}>{userId}</Link>
            return order;
        });
    

        return (
        <div className="col-md-9">   
            {this.state.userTable.rows && 
            <Table //users table (only appears when a user in the orders table is clicked on)
                rows = {this.state.userTable.rows} 
                columns = {this.state.userTable.columns} 
                tableName = {this.state.userTable.tableName} 
            />}
            <Table //orders table
                rows = {orderRows}
                columns = {orderColumns}
                tableName = {"Orders"}
            />
        </div>  
        );
    }
};

// ------------- Container
const mapStateToProps = (state, ownProps) => {
    
    let users = state.users.allUsers;
 
    if (state.orders.allOrders.length > 0 && state.users.allUsers.length> 0) {
        
        //create order rows
        let rows = state.orders.allOrders.map(function(order){
            let deleteRow = <DeleteButton />
            let userId = 2; //change once seed data for orders includes user info... order.user_id

            let orderRow = {modify: deleteRow,id: order.id, status: order.status, 
                delivery: order.deliveryDay, created_at: order.created_at, 
                updated_at: order.updated_at, userId: userId, products:'link'}

            return orderRow;
        });
        
        return ({
            orderRows: rows,
            orderColumns: Object.keys(rows[0]),
            users: users
        })
    }

    return {}; //return an empty object until orders arrive on state
}
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Orders);



// // Required libraries
import React, {Component} from 'react'
import { connect } from 'react-redux'
import Table from './Table'
import {Link} from'react-router'
import DeleteButton from './DeleteButton'


// // ------------- Component
class Orders extends Component {

    constructor (props) {
        console.log(props);
        super(props);
        this.state = {
            topTable : {}
        }
        this.handleUserClick = this.handleUserClick.bind(this);
    }
   
    handleUserClick(userId){
        console.log("!!!", this.props.users)
        let topTableRows = this.props.users.find((user) => {
            console.log(user.id)
            console.log("userId", userId)
                    return user.id === userId;
        })
        this.setState({
            topTable: {
                rows: [topTableRows],
                columns: Object.keys(topTableRows),
                tableName: userId
            }
        })
    }

    render (){


        const rows = this.props.rows;
        rows && rows.map((order) => {
            // console.log("order.user is ", order.user)
            order.user = <Link onClick={() => this.handleUserClick(2)}>user2</Link>
            return order;
        });
        const columns = this.props.columns;
        const tableName = "Orders";
    

        return (
        <div className="col-md-9">   
            {this.state.topTable.rows && 
                <Table 
                    rows = {this.state.topTable.rows} 
                    columns = {this.state.topTable.columns} 
                    tableName = {this.state.topTable.tableName} 
                />
            }
            <Table 
                rows = {rows}
                columns = {columns}
                tableName = {tableName}
            />
        </div>  
        );
    }
};

// ------------- Container
const mapStateToProps = (state, ownProps) => {
    // console.log("state ", state);
    // console.log("state.orders.allOrders", console.log(state.orders.allOrders))
    // console.log("Object.keys", state.orders.allOrders[0]);
    
    let users = state.users.allUsers;
    //console.log("users", users);
    // console.log("users[0]", users[0])
    
    if (state.orders.allOrders.length > 0 && state.users.allUsers.length> 0) {
        let rows = state.orders.allOrders.map(function(order){

            let deleteRow = <DeleteButton />
            let user = users[1].name;
            //let user = users[order[user_id]-1]

            let rObj = {modify: deleteRow,id: order.id, status: order.status, 
                delivery: order.deliveryDay, created_at: order.created_at, 
                updated_at: order.updated_at, user:users[1].id, products:'link'}

            return rObj;
        });
        
        return ({
            rows: rows,
            columns: Object.keys(rows[0]),
            users: state.users.allUsers
        })
    }

    return {};

}
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Orders);



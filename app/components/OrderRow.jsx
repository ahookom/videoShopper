import React from 'react'

export default (props) => {

        const orderId = props.order.id;
        const orderStatus = props.order.status;
        const userId = props.order.userId;

  return (
        <tr className="odd gradeX">
            <td>{orderId}</td>
            <td>{orderStatus}</td>
            <td>{userId}</td>
        </tr>
  )
}



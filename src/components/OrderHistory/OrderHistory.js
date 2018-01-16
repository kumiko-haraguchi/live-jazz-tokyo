import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/format';
import './OrderHistory.css';

const OrderHistory = props => (
  <table id="order-history-table">
    <tbody>
      <tr>
        <th>Order ID</th>
        <th>Title</th>
        <th>Amount</th>
      </tr>
      { props.orders.map((order) => {
        const { id, eventId, title, amount } = order;
        return (
          <tr key={id}>
            <td> { id } </td>
            <td> <Link className="link" to={`/event/${eventId}`}>{ title }</Link></td>
            <td> ￥{ formatPrice(amount) } </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

OrderHistory.propTypes = {
  orders: PropTypes.arrayOf(Object),
};

OrderHistory.defaultProps = {
  orders: [],
};

export default OrderHistory;

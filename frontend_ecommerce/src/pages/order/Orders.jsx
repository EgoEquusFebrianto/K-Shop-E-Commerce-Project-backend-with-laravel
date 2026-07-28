import React from 'react'
import { useOrder } from '../../context/order/order-hook';
import { OrderItems } from '../../context/order/order-items';
import './orders.css'

export const Orders = () => {
    const {orders } = useOrder();
    console.log(orders);

    return (
        <div className="orders">
            <h1>Your Orders</h1>

            {orders.length === 0 ? (
                <div className="emptyOrders">
                    <h2>Your Orders is Empty</h2>
                </div>
            ) : (
                orders.map((order) => (
                    <div
                        className="orderCard"
                        key={order.id}
                    >
                        <div className="orderHeader">

                            <div className="orderInfo">
                                <h3>{order.order_number}</h3>
                                <p>Status : {order.status}</p>
                                <p>Total : ${order.total_amount}</p>
                            </div>

                            <button>
                                Cancel Order
                            </button>

                        </div>

                        {order.items.map((item) => (
                            <OrderItems
                                key={item.id}
                                item={item}
                            />
                        ))}

                    </div>
                ))
            )}
        </div>
    );
};
import React from 'react'

export const OrderItems = ({item}) => {
    return (
        <div className="orderItem">
            <img
                src={item.product.image_url}
                alt={item.product.name}
            />
            <div className="description">
                <p>
                    <b>{item.product_name}</b>
                </p>
                <p>Price : ${item.price}</p>
                <p>Quantity : {item.quantity}</p>
                <p>Subtotal : ${item.subtotal}</p>
            </div>
        </div>
    );
}

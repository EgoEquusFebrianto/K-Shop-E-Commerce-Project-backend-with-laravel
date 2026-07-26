import React, { useContext } from 'react'
import { ShopContext } from './context/shop/shop-context'

export const Testing = () => {    
    const {cartItems, products, loading} = useContext(ShopContext);
    
    if (loading) {
        return <h1>LOADING...</h1>;
    }


    // console.log(products);
    console.log(cartItems);
    
    return (
        <div>Testing</div>
    )
}
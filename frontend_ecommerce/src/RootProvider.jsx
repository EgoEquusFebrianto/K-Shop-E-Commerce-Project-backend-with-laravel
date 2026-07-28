import React from 'react'
import { ShopContextProvider } from './context/shop/shop-context'
import { AuthProvider } from './context/auth/auth-context'
import { CartContextProvider } from './context/cart-shop/cart-context'
import { OrderContextProvider } from './context/order/order-context'

export const RootProvider = ({children}) => {
  return (
    <AuthProvider>
      <ShopContextProvider>
        <OrderContextProvider>
          <CartContextProvider>
            {children}
          </CartContextProvider>
        </OrderContextProvider>
      </ShopContextProvider>
    </AuthProvider>
  )
}
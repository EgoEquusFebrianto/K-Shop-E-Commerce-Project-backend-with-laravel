import React from 'react'
import { ShopContextProvider } from './context/shop/shop-context'
import { AuthProvider } from './context/auth/auth-context'
import { CartContextProvider } from './context/cart-shop/cart-context'

export const RootProvider = ({children}) => {
  return (
    <AuthProvider>
      <ShopContextProvider>
        <CartContextProvider>
            {children}
          </CartContextProvider>
      </ShopContextProvider>
    </AuthProvider>
  )
}
import React from 'react'
import { ShopContextProvider } from './context/shop/shop-context'
import { AuthProvider } from './context/auth/auth-context'

export const RootProvider = ({children}) => {
  return (
    <AuthProvider>
      <ShopContextProvider>
          {children}
      </ShopContextProvider>
    </AuthProvider>
  )
}
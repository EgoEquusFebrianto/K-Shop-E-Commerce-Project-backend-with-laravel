import React, { createContext, useEffect, useRef, useState } from 'react'
import { useAuth } from "../auth/hooks/auth-hook"
import CartService from './service/cart-service';
import OrderService from '../order/order-service';
import { useOrder } from '../order/order-hook';

export const CartContext = createContext(null);

export const CartContextProvider = ({children}) => {
    const { isAuthenticated } = useAuth();
    const { fetchDataOrder } = useOrder();
    const [cartItems, setCartItems] = useState({});
    const debounceRefs = useRef({});
    const cartItemsRef = useRef({});

    const fetchCart = async () => {
        try {
            const payload = await CartService.getAll();
            const state = {};

            payload.forEach((item) => {
                state[item.product.id] = {
                    cartId: item.id,
                    quantity: item.quantity,
                    pending: false,
                    previousQuantity: item.quantity,
                };
            });

            setCartItems(state);
        } catch (err) {
            console.error(err);
        }        
    };

    const createCartItem = async (productId) => {
        try {
            return await CartService.store(productId);
        } catch (err) {
            console.error(err)
        }
    };

    const updateCartItem = async (productId, quantity) => {
        try {
            const current = cartItemsRef.current[productId];
            if (!current) return;
            
            return await CartService.update(
                current.cartId,
                quantity,
            );

        } catch (err) {
            console.error(err)
        }
    };

    const deleteCartItem = async (productId) => {
        try {
            const current = cartItemsRef.current[productId];
            if (!current) return;

            await CartService.delete(current.cartId);

        } catch (err) {
            console.error(err)
        }
    };

    useEffect(() => {
        if(isAuthenticated) {
            fetchCart();
        } else {
            setCartItems({});
        }
    }, [isAuthenticated]);

    useEffect(() => {
        cartItemsRef.current = cartItems;
    }, [cartItems]);


    const rollbackCartItem = (productId) => {
        setCartItems((prev) => {
            const current = prev[productId];
            if (!current) return;

            // Rollback Post
            if (current.cartId === null) {
                const copy = {...prev};
                delete copy[productId];
                return copy;
            }

            // Rollback Patch / Delete
            return {
                ...prev,
                [productId]: {
                    ...current,
                    quantity: current.previousQuantity,
                    pending: false,
                }
            };
        });
    };
    
    const syncCart = async (productId) => {
        const item = cartItemsRef.current[productId];

        if (!item || !item.pending) return;

        try {
            // DELETE
            if(item.quantity === 0) {
                await deleteCartItem(productId);

                setCartItems((prev)=>{
                    const copy = {...prev};
                    delete copy[productId];
                    return copy;
                });
                return;
            }

            // POST
            if (item.cartId === null) {
                const cart = await createCartItem(productId);
                setCartItems((prev) => ({
                    ...prev,
                    [productId]: {
                        cartId: cart.id,
                        quantity: cart.quantity,
                        pending: false,
                        previousQuantity: cart.quantity,
                    },
                }));
                return;
            }

            // PATCH
            await updateCartItem(
                productId,
                item.quantity,
            )

            setCartItems((prev)=>({
                ...prev,
                [productId]:{
                    ...prev[productId],
                    pending:false,
                    previousQuantity: prev[productId].quantity,
                }
            }))

        } catch (err) {
            rollbackCartItem(productId);
            console.error(err);
        }
    };

    const scheduleSync = (productId) => {
        if (debounceRefs.current[productId]) {
            clearTimeout(debounceRefs.current[productId]);
        }

        debounceRefs.current[productId] = setTimeout(() => {
            syncCart(productId);
        }, 500);
    };
    
    const addToCart = (productId) => {
        setCartItems((prev) => {
            const current = prev[productId];

            if (!current) {
                return {
                    ...prev,
                    [productId]: {
                        cartId: null,
                        quantity: 1,
                        pending: true,
                        previousQuantity: 1
                    },
                };
            }

            return {
                ...prev,
                [productId]: {
                    ...current,
                    quantity: current.quantity + 1,
                    pending: true,
                    previousQuantity: current.pending
                        ? current.previousQuantity
                        : current.quantity,
                },
            };
        });

        scheduleSync(productId);
    };

    const removeFromCart = (productId) => {
        setCartItems((prev) => {
            const current = prev[productId];

            if (!current) return prev;

            const quantity = current.quantity - 1;

            if (quantity <= 0) {
                return {
                    ...prev,
                    [productId]: {
                        ...current,
                        quantity: 0,
                        pending: true,
                        previousQuantity: current.pending
                            ? current.previousQuantity
                            : current.quantity,
                    },
                };
            }

            return {
                ...prev,
                [productId]: {
                    ...current,
                    quantity,
                    pending: true,
                    previousQuantity: current.pending
                        ? current.previousQuantity
                        : current.quantity,
                },
            };
        });

        scheduleSync(productId);
    };

    const updateCartItemCount = (quantity, productId) => {
        setCartItems((prev) => {
            const current = prev[productId];
            if (!current) return prev;

            if (quantity <= 0) {
                return {
                    ...prev,
                    [productId]: {
                        ...current,
                        quantity: 0,
                        pending: true,
                        previousQuantity: current.pending
                            ? current.previousQuantity
                            : current.quantity,
                    },
                };
            }

            return {
                ...prev,
                [productId]: {
                    ...current,
                    quantity,
                    pending: true,
                    previousQuantity: current.pending
                        ? current.previousQuantity
                        : current.quantity,
                },
            };
        });

        scheduleSync(productId);
    };

    const checkout = async () => {
        await OrderService.checkout();
        setCartItems({})
        await fetchDataOrder();
    };

    const getTotalCartAmount = (products) => {
        let total = 0;

        Object.entries(cartItems).forEach(([productId, item]) => {
            const product = products.find((p) => p.id === Number(productId));
            
            if (product) {
                total += product.price * item.quantity;
            }
        });

        return total;
    }

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemCount,
        checkout,
        getTotalCartAmount,
    }       

    return (
        <CartContext.Provider value={contextValue}>  
            {children}
        </CartContext.Provider>
    );
}
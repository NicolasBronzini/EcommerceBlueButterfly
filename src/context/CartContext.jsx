import React, { useState } from 'react'
import { createContext } from "react";

export const CartContext = createContext();

const CartProvider = ({children}) => {
    
    //Aqui se guarda el Carrito
    const [cart, setCart] = useState([]);
    const [qty, setQty] = useState(null);

    const addItem = (item) => {        
        const productoRepetido = isInCart(item.id);
        
        if (productoRepetido) {
            const cartModified = cart.map(product => {
                if (product.id === item.id) {
                    product.cantidad += item.cantidad
                    return product
                }
                return product
            })
            setCart(cartModified)
            
        } else {
            const cartModificado = [...cart, item]
            setCart(cartModificado);            
        }
        sumaCantidadCarrito();
    }

    const isInCart = (id) => {
        return cart.some(product => product.id === id)
    }

    const removeProduct = (id) => {        
        setCart(cart.filter(product => product.id !== id));
        sumaCantidadCarrito();
    }

    const clearCart = () => {
        setCart([]);        
        setQty(null);   
    }

    const sumaCantidadCarrito = () => {
        let totalCarrito = cart.reduce((acumulador,el) => acumulador + el.cantidad,0);  
        totalCarrito = parseInt(totalCarrito);
        setQty(totalCarrito);        
    }

    const sumaTotalCarrito = () => {
        const sumaTotalCarrito = cart.reduce((acumulador,el) => acumulador += el.price*el.cantidad,0)        
        return sumaTotalCarrito
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeProduct, clearCart, qty, sumaCantidadCarrito, sumaTotalCarrito}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
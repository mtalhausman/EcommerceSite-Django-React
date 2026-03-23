import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { authFetch, getAccessToken } from "../utils/auth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const Base_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    // Fetch Cart Data from Django Backend
    const fetchCartData = async () => {
        try {
            const response = await authFetch(`${Base_URL}/api/cart/`);
            const data = response.data;
            setCartItems(data.items || []);
            setTotalPrice(data.total || 0);
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };
    useEffect(() => {

        fetchCartData();
    }, []);

    //Add Product to Cart
    const addToCart = async (productID) => {
        try {
            await authFetch(`${Base_URL}/api/cart/add/`, {
                method: 'POST',          // ← missing
                body: JSON.stringify({   // ← missing
                    product_id: productID
                }),
            });

            fetchCartData();

        } catch (err) {
            console.error("Error adding product to cart:", err);
        }
    };

    //Remove Product from Cart
    const removeFromCart = async (itemID) => {
        try {
            await authFetch(`${Base_URL}/api/cart/remove/`,
                { method: 'POST', body: JSON.stringify({ item_id: itemID }) });
            fetchCartData();
        } catch (err) {
            console.error("Error removing product from cart:", err);
        }
    };

    //Update Product Quantity
    const updateProductQuantity = async (itemID, quantity) => {
        if (quantity < 1) {
            await removeFromCart(itemID);
            return;
        }
        try {
            await authFetch(`${Base_URL}/api/cart/update/`,
                { method: 'POST', body: JSON.stringify({ item_id: itemID, quantity }) });
            fetchCartData();
        } catch (err) {
            console.error("Error updating product quantity:", err);
        }
    };

    const clearCart = () => {
        setCartItems([]);
        setTotalPrice(0);
    }
    return (
        <CartContext.Provider
            value={{ cartItems, totalPrice, clearCart, addToCart, removeFromCart, updateProductQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);

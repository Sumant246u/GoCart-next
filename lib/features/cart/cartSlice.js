import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        total: 0,
        cartItems: {},
    },
    reducers: {
        addToCart: (state, action) => {
            const { productId } = action.payload  //Get product ID from the action.
            if (state.cartItems[productId]) {      //Check if item already in cart.
                state.cartItems[productId]++        //Increase quantity if it exists.
            } else {
                state.cartItems[productId] = 1      //Add new item if not present.
            }
            state.total += 1                        //Increment total item count.
        },

        removeFromCart: (state, action) => {
            const { productId } = action.payload
            if (state.cartItems[productId]) {           //Check if product exists in cart.
                state.cartItems[productId]--            //Decrease the quantity.
                if (state.cartItems[productId] === 0) {   //Remove product if quantity = 0.
                    delete state.cartItems[productId]   //Reduce total count of items.
                }
            }
            state.total - +1
        },

        deleteItemFromCart: (state, action) => {
            const { productId } = action.payload
            state.total -= state.cartItems[productId] ? state.cartItems[productId] : 0
            delete state.cartItems[productId]
        },
        clearCart: (state) => {
            state.cartItems = {}
            state.total = 0
        },
    }

})

export const {addToCart, removeFromCart, deleteItemFromCart, clearCart} = cartSlice.actions

export default cartSlice.reducer

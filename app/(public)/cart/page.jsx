'use client'

import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle"
import { deleteItemFromCart } from "@/lib/features/cart/cartSlice";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const { cartItems } = useSelector(state => state.cart)
    const products = useSelector(state => state.product.list);

    const dispatch = useDispatch();

    const [cartArray, setCartArray] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);

    const createCartArray = () => {
        setTotalPrice(0);
        const cartArray = [];
        for (const [key, value] of Object.entries(cartItems)) {
            const product = products.find(product => product.id === key);  //For each cart item → find full product details
            if (product) {
                cartArray.push({
                    ...product,         // product info (name, price, image)
                    quantity: value,    // add quantity from cartItems
                });
                setTotalPrice(prev => prev + product.price * value);
            }

        }
        setCartArray(cartArray);
    }

    const handleDeleteItemFromCart = (productId) => {
        dispatch(deleteItemFromCart({ productId }))
    }

    //Re-run Logic Whenever Cart or Products Change

    useEffect(() => {
        if (products.length > 0) {
            createCartArray();
        }
    }, [cartItems, products])


    return cartArray.length > 0 ? (
        <div className="min-h-screen mx-6 text-slate-800">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <PageTitle heading='My Cart' text='items in your cart' linkText='Add more' />
                <div className="flex justify-between items-start gap-5 max-lg:flex-col">
                    <table className="w-full text-slate-600 max-w-4xl table-auto">
                        <thead>
                            <tr className="max-sm:text-sm">
                                <th className="text-left">product</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th className="max-md:hidden">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartArray.map((item, index) => (
                                    <tr key={index} className="">
                                        <td className=" flex gap-3 my-4">
                                            <div className="flex items-center justify-center gap-3 bg-slate-100 rounded-md size-18">
                                                <Image src={item.images[0]} alt="" className="h-14 w-auto" width={45} height={45} />
                                            </div>

                                            <div>
                                                <p className="max-sm:text-sm">{item.name}</p>
                                                <p className="text-xs text-slate-600">{item.category}</p>
                                                <p>{currency}{item.price}</p>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <Counter productId={item.id} />
                                        </td>
                                        <td className="text-center">{currency}{(item.price * item.quantity).toLocaleString()}</td>
                                        <td className="text-center max-md:hidden">
                                            <button onClick={() => handleDeleteItemFromCart(item.id)} className="text-red-500 hover:bg-red-50 p-2.5 rounded-full active:scale-95 transition-all">
                                                <TrashIcon size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <OrderSummary totalPrice={totalPrice} items={cartArray} />
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400">
            <h1 className="text-2xl sm:text-4xl font-semibold">Your cart is empty</h1>
        </div>
    )
}
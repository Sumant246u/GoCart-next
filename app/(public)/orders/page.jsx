'use client'

import { orderDummyData } from "@/assets/assets"
import OrderItme from "@/components/OrderItme";
import PageTitle from "@/components/PageTitle";
import { useEffect, useState } from "react"


export default function Orders() {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        setOrders(orderDummyData)
    }, []);

    return (
        <div>
            {orders.length > 0 ? (
                (
                    <div className="">
                        <PageTitle heading='My Orders' text={`Showing total ${orders.length} orders`} linkText={'Go to home'} />
                        <table className="w-full max-w-5xl text-slate-500 table-auto border-separate border-spacing-y-12 border-spacing-x-4">
                        <thead className="">
                            <tr className="max-sm:text-sm text-slate-600 max-md:hidden">
                                <th className="text-left">Product</th>
                                <th className="text-center">Total Price</th>
                                <th className="text-left">Address</th>
                                <th className="text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order)=>(
                            <OrderItme order={order} key={order.id}/>
                            ))}
                        </tbody>
                        </table>
                    </div>
                )
            ) : (
                <div>

                </div>
            )}
        </div>
    )
}   
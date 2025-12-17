'use client'

import { orderDummyData } from "@/assets/assets"
import Loading from "@/components/Loading"
import { useEffect, useState } from "react"

export default function StoreOrders() {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectOrder, setSelectedOrder] = useState(null)
    const [isModelOpen, setIsModelOpen] = useState(false)

    const fetchOrders = async () => {
        setOrders(orderDummyData)
        setLoading(false)
    }

    const updateOrderStatus = async (orderId, status) => {
        // Logic to update the status of an order
    }

    const openModel = (order) => {
        setSelectedOrder(order)
        setIsModelOpen(true)
    }

    const closeModel = () => {
        setSelectedOrder(null)
        setIsModelOpen(false)
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    if (loading) return <Loading />
    return (
        <div>
            <h1 className="text-2xl text-slate-500 mb-5">Store <span className="text-slate-800 font-medium">Orders</span></h1>
            {orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                <div className="overflow-x-auto max-w-4xl rounded-md shadow border border-gray-200">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="bg-gray-50 text-gray-700 text-xs uppercase tracking-wider">
                            <tr>
                                {["Sr. No.", "Customer", "Total", "Payment", "Coupon", "Status", "Date"].map((heading, i) => (
                                    <th key={i} className="px-4 py-3">{heading}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order, index) => (
                                <tr key={order.id} onClick={()=>openModel(order)} className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer">

                                    <td className="pl-6 text-green-600">{index + 1}</td>
                                    <td className="px-4 py-3">{order.user?.name}</td> {/* (?.Optional chaining)Show the user’s name only if order.user is defined.  */}
                                    <td className="px-4 py-3">{order.total}</td>
                                    <td className="px-4 py-3">{order.paymentMethod}</td>
                                    <td className="px-4 py-3">
                                        {order.isCouponUsed ? (
                                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{order.coupon?.code}</span>
                                        ) : (
                                            "_"
                                        )}
                                    </td>
                                    <td className="px-4 py-3" onClick={(e) => { e.stopPropagation() }}>
                                        <select onChange={e => updateOrderStatus(order.id, e.target.value)} value={order.status} className="border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-200">
                                            <option value="ORDER_PLACED">ORDER_PLACED</option>
                                            <option value="PROCESSING">PROCESSING</option>
                                            <option value="SHIPPED">SHIPPED</option>
                                            <option value="DELIVERED">DELIVERED</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">{new Date(order.createdAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {isModelOpen && selectOrder && (
                <div onClick={closeModel} className="fixed inset-0 flex items-center justify-center bg-black/50 text-slate-700 text-sm backdrop-blur-xs z-50">
                    <div onClick={e => e.stopPropagation()} className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4 text-center">Order Details</h2>

                        {/* Customer Details */}

                        <div className="mb-4">
                            <h3 className="font-semibold">Customer Details</h3>
                            <p><span className="text-green-700">Name:</span>{selectOrder.user?.name}</p>
                            <p><span className="text-green-700" >Email:</span>{selectOrder.user?.email}</p>
                            <p><span className="text-green-700"> Phone:</span>{selectOrder.address?.phone}</p>
                            <p><span className="text-green-700">Address:</span>{`${selectOrder.address?.street},${selectOrder.address?.city},${selectOrder.address?.state},${selectOrder.address?.zip},${selectOrder.address?.country}`}</p>
                        </div>

                        {/* Products */}
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Products</h3>
                            <div className="space-y-2">
                                {selectOrder.orderItems.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 border border-slate-100 shadow rounded p-2">
                                        <img src={item.product.images?.[0].src || item.product.images?.[0]} alt="" className="w-16 h-16 object-cover rounded" />

                                        <div className="flex-1">
                                            <p className="text-slate-800">{item.product?.name}</p>
                                            <p>Qty: {item.quantity}</p>
                                            <p>Price: ${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Product & Status */}
                            <div className="mb-4">
                                <p><span className="text-green-700">Payment Method:</span>{selectOrder.paymentMethod}</p>
                                <p><span className="text-green-700">Paid:</span>{selectOrder.isPaid ? "Yes" : "No"}</p>
                                {selectOrder.isCouponUsed && (
                                    <p><span className="text-green-700">Coupon:</span>{selectOrder.coupon.code} ({selectOrder.coupon.discount}% off)</p>
                                )}
                                <p><span className="text-green-700">Status:</span>{selectOrder.status}</p>
                                <p><span className="text-green-700">Order Date</span>{new Date(selectOrder.createdAt).toLocaleString()}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end">
                                <button className="bg-slate-200 px-4 py-2 rounded hover:bg-slate-300" onClick={closeModel}>Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}
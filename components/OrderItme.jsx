import Image from 'next/image';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Rating from './Rating';
import RatingModel from './RatingModel';
import { DotIcon } from 'lucide-react';

const OrderItme = ({ order }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const [ratingModel, SetRatingModel] = useState(null)

    const { ratings } = useSelector(state => state.rating);


    return (
        <>
            <tr className=''>
                <td className=''>
                    <div className='flex flex-col gap-6'>
                        {order.orderItems.map((item, index) => (
                            <div key={index} className='flex items-center gap-4'>
                                <div className='w-20 aspect-square bg-slate-100 flex items-center justify-center rounded-md'>
                                    <Image src={item.product.images[0]} alt='' width={50} height={50} className='h-14 w-auto' />
                                </div>

                                <div className='flex flex-col justify-center text-sm'>
                                    <p className='font-medium text-slate-600 text-base'>{item.product.name}</p>
                                    <p>{currency}{item.price} Qty : {item.quantity}</p>
                                    <p className='mb-1'>{new Date(order.createdAt).toDateString()}</p>

                                    <div>
                                        {ratings.find(rating => order.id === rating.orderId && item.product.id === rating.productId) ? <Rating value={ratings.find(rating => order.id === rating.orderId && item.productId === rating.productId).rating} /> : <button onClick={() => SetRatingModel({ orderId: order.id, productId: item.product.id })} className={`text-green-500 hover:bg-green-50 transition ${order.status !== 'DELIVERED' && 'hidden'}`}>Rate Product</button>}
                                        {ratingModel && <RatingModel ratingModal={ratingModel} setRatingModal={SetRatingModel} />}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </td>
                <td className='text-center max-md:hidden'>{currency}{order.total}</td>
                <td className='text-left max-md:hidden'>
                    <p>{order.address.name},{order.address.street},</p>
                    <p>{order.address.city}, {order.address.state}, {order.address.zip}, {order.address.country},</p>
                    <p>{order.address.phone}</p>
                </td>

                <td className='text-left space-y-2 text-sm max-md:hidden'>
                    <div className={`flex items-center justify-center gap-1 rounded-full p-1 ${order.status === 'confirmed' ? 'text-yellow-500 bg-yellow-100' : order.status === 'delivered' ? 'text-green-500 bg-green-100' : 'text-slate-500 bg-slate-100'}`}>
                        <DotIcon size={10} className='scale-250' />
                        {order.status.split('_').join('').toLowerCase()}
                    </div>
                </td>
            </tr>

            {/* Mobile */}
            <tr className='md:hidden'>
                <td colSpan={5}>
                    <p>{order.address.name}, {order.address.street}</p>
                    <p>{order.address.city}, {order.address.state}, {order.address.zip}, {order.address.country}</p>
                    <p>{order.address.phone}</p>
                    <br />
                    <div className='flex items-center'>
                        <span className='text-center mx-auto bg-green-100 text-green-700 rounded px-6 py-1.5'>
                            { order.status.replace(/_/g, '').toLowerCase()}
                        </span>
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan={4}>
                    <div className='border-b border-slate-300 w-6/7 mx-auto'></div>
                </td>
            </tr>

        </>
    )
}

export default OrderItme

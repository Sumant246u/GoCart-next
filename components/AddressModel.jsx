'use client'
import { XIcon } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const AddressModel = ({ setShowAddressModal }) => {

    const [address, setAddress] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phone: ''
    })

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.value]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        setShowAddressModal(false)
    }
    return (
        <form onSubmit={e => toast.promise(handleSubmit(e), { loading: 'Adding Address...' })} className='fixed bg-white/60 backdrop-blur h-screen flex items-center justify-center inset-0 z-50'>
            <div className='flex flex-col gap-5 text-slate-700 w-full max-w-sm mx-6'>
                <h2 className='text-3xl'>Add New <span className='font-semibold'>Address</span></h2>
                <input onChange={handleAddressChange} name='name' value={address.name} type="text" className='border border-slate-200 outline-none w-full px-4 p-2 rounded' placeholder='Enter your name' required />
                <input onChange={handleAddressChange} name='email' value={address.email} type="email" className='border border-slate-200 outline-none w-full px-4 p-2 rounded' placeholder='Enter your email' required />
                <input onChange={handleAddressChange} name='Street' value={address.street} type="text" className='border border-slate-200 outline-none w-full px-4 p-2 rounded' placeholder='Street' required />
                <div className='flex gap-4'>
                    <input onChange={handleAddressChange} name='City' value={address.city} type="text" className='border border-slate-200 outline-none w-full px-4 p-2 rounded' placeholder='City' required />
                    <input onChange={handleAddressChange} name='State' value={address.state} type="text" className='border border-slate-200 outline-none w-full px-4 p-2 rounded' placeholder='State' required />
                </div>
                <div className='flex gap-4'>
                    <input onChange={handleAddressChange} name='Zip' value={address.zip} type="number" className='border border-slate-200 outline-none w-full px-4 p-2 rounded' placeholder='Zip' required />
                    <input onChange={handleAddressChange} name='Country' value={address.country} type="text" className='border border-slate-200 outline-none w-full px-4 p-2 rounded' placeholder='Country' required />
                </div>
                <input onChange={handleAddressChange} name='Phone' value={address.phone} type="number" className='border border-slate-200 outline-none w-full px-4 p-2 rounded' placeholder='Phone' required />
                <button className='border bg-slate-800 text-white text-sm font-medium w-full py-2.5 rounded-md hover:bg-slate-900 transition-all active:scale-95'>SAVE ADDRESS</button>
            </div>
            <XIcon onClick={() => setShowAddressModal(false)} className='absolute top-5 right-5 text-slate-500 hover:text-slate-700 cursor-pointer' size={30} />
        </form>
    )
}

export default AddressModel

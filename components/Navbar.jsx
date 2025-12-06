import { Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const router = useRouter();

    const [search, setSearch] = useState('')
    const cartCount = useSelector(state => state.cart.total)


    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)    // becomes  "/shop?search=laptop"
    }
    return (
        <nav className=' relative bg-white'>
            <div className='mx-6'>
                <div className='flex items-center  justify-between max-w-7xl mx-auto py-4 trnasition-all'>
                    <Link href='/' className=' relative text-4xl font-semibold text-slate-700'>
                        <span className='text-green-600'>go</span>Cart<span className='text-green-600 text-5xl font-leading'>.</span>
                        <p className='absolute -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white text-xs font-semibold bg-green-500'>
                            plus
                        </p>
                    </Link>

                    {/* Desktop Menu */}
                    <div className='hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600'>
                        <Link href='/'>Home</Link>
                        <Link href='/shop'>Shop</Link>
                        <Link href='/'>About</Link>
                        <Link href='/'>Contact</Link>

                        <form onSubmit={handleSearch} className=' hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full'>
                            <Search size={18} className='text-slate-600' />
                            <input className='w-full bg-transparent outline-none' type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search products' required />
                        </form>

                        <Link href='/cart' className='relative flex items-center gap-2 text-slate-600'>
                            <ShoppingCart size={18} />
                            Cart
                            <button className='absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full'>{cartCount}</button>
                        </Link>

                        <button className='bg-indigo-500 rounded-full px-8 py-2 hover:bg-indigo-600 transition-all text-white '>
                            Login
                        </button>
                    </div>

                    {/* Mobile User Button */}
                    <div className='sm:hidden'>
                        <button className='bg-indigo-500 rounded-full px-7 py-1.5 hover:bg-indigo-600 text-sm transition text-white '>
                            Login
                        </button>
                    </div>
                </div>
            </div>
            <hr className='border-gray-300' />
        </nav>
    )
}

export default Navbar

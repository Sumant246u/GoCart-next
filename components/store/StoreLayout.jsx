'use client'
import { dummyStoreData } from '@/assets/assets'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading'

import Storenavbar from './Storenavbar'
import StoreSidebar from './StoreSidebar'

const StoreLayout = ({ children }) => {

  const [isSeller, setIseller] = useState(false)
  const [loading, setLaoding] = useState(true)
  const [storeInfo, setStoreInfo] = useState(null)

  const fetchISSeller = async () => {
    setIseller(true)
    setStoreInfo(dummyStoreData)
    setLaoding(false)
  }

  useEffect(() => {
    fetchISSeller()
  }, [])


  return loading ? (
    <Loading />
  ) : isSeller ? (
    <div className=''>
      <Storenavbar />
      <div className=''>
        <StoreSidebar storeInfo={storeInfo} />
        <div className=''>
          {children}
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-2xl sm:text-4xl font-semibold text-slate-400">You are not authorized to access this page</h1>
      <Link href="/" className="bg-slate-700 text-white flex items-center gap-2 mt-8 p-2 px-6 max-sm:text-sm rounded-full">
        Go to home <ArrowRightIcon size={18} />
      </Link>
    </div>
  )
}

export default StoreLayout

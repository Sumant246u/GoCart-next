'use client'
import { dummyStoreData, productDummyData } from "@/assets/assets";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { MailIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";


export default function StoreShop() {

    const { username } = useParams();
    const [products, setproducts] = useState([])
    const [storeInfo, setStoreInfo] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchStoreData = async () => {
        setStoreInfo(dummyStoreData)
        setproducts(productDummyData)
        setLoading(false)
    }

    useEffect(() => {
        fetchStoreData()
    }, [])

    return !loading ? (
        <div className="">
            {/* Store info Banner */}
            {storeInfo && (
                <div className="bg-slate-50 shadow-xs rounded-xl p-6 md:p-10 mt-6 flex flex-col md:flex-row items-center gap-6 max-w-7xl mx-auto">
                    <Image src={storeInfo.logo} alt={storeInfo.name} className="size-32 sm:size-38  border-2 border-slate-100 rounded-md object-cover" width={200} height={200} />
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-semibold text-slate-800">{storeInfo.name}</h1>
                        <p className="text-sm text-slate-600 mt-2 max-w-lg">{storeInfo.description}</p>
                        <div className="text-xs text-slate-500 mt-4 space-y-1"></div>

                        <div className="space-y-2 text-sm text-slate-500">
                            <div className="flex items-center">
                                <MapPinIcon className="w-4 h-4 text-gray-500 mr-2" />
                                <span>{storeInfo.address}</span>
                            </div>
                            <div className="flex items-center">
                                <MailIcon className="w-4 h-4 text-gray-500 mr-2" />
                                <span>{storeInfo.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* products */}
            <div className="max-w-7xl mx-auto mb-40">
                <h1 className="text-2xl mt-12">Shop <span className="text-slate-800 font-medium">Products</span></h1>
                <div className="mt-5 grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto">
                    {products.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
            </div>
        </div>
    ) : <Loading />
}
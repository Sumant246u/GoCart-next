'use client'
import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function Product() {

    const { productId } = useParams();
    const [product, setProduct] = useState();
    const products = useSelector(state => state.product.list);

    const fetchProducts = async () => {
        const product = products.find((product) => product.id === productId);
        setProduct(product);
    }

    useEffect(() => {
        if (products.length > 0) {
            fetchProducts()
        }
        scrollTo(0, 0)
    }, [productId, products]);

    return (
        <div className="mx-6">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrumbs */}
                <div className="text-gray-600 text-sm mt-8 mb-5">
                    Home / Products / {product?.category}
                    {/* dynamically adds the product category (e.g. “Electronics”, “Shoes”, etc.). */}
                </div>

                {/* product Details */}
                {product && (<ProductDetails product={product} />)}
                {/* Only render the <ProductDetails /> component if the product object exists (is not null or undefined). */}

                {/* product Description */}
                {product && (<ProductDescription product={product} />)}
                {/* The ProductDescription component (which may include tabs like “Description”, “Reviews”, etc.) only renders after the product data is loaded. */}


            </div>
        </div>
    )
}
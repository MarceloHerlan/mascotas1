import React, { useContext, useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../products/productItem/ProductItem'




const DetailProduct = () => {
    const params=useParams()
    const state=useContext(GlobalState)
    const [products]= state.productApi.products
    const [detailProduct,setDetailProduct]=useState([])
    const addCart=state.userApi.addCart


    useEffect(()=>{
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id)setDetailProduct(product)
            });
        }
    },[params,products])

    console.log(detailProduct)

    if(detailProduct.length ===0) return null


    return (
        <>
        <div className='detail'>
            <img src={detailProduct.images.url} />
            <div className='box_detail'>
                <div className='row'>
                    <h2>{detailProduct.title}</h2>
                    <h6>#id:{detailProduct.product_id}</h6>
                </div>
                <span>${detailProduct.price}</span>
                <p>{detailProduct.description}</p>
                <p>{detailProduct.content}</p>
                <p>Sold:{detailProduct.sold}</p>
                <Link to='/cart' className='cart' onClick={()=>addCart(detailProduct)}>Buy NOW!</Link>

            </div>
        </div>

        <div>
            <h2>Releated Products</h2>
            <div className='products'>
                {
                    products.map(product=>{
                        return product.category === detailProduct.category
                            ? <ProductItem key={product._id} product={product} /> :null
                    })
                }
            </div>
        </div>
        </>
    )
}

export default DetailProduct

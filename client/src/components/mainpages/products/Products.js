import React,{useContext, useEffect, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from './productItem/ProductItem'
import axios from 'axios'
import Loading from '../utils/loading/Loading'
import Filters from './Filters'
import LoadMore from './LoadMore'




const Products = () => {
    const state=useContext(GlobalState)
    const [products,setProducts]=state.productApi.products
    const [isAdmin]=state.userApi.isAdmin
    const [token]=state.token
    const [callback,setCallback]=state.productApi.callback
    const[loading,setLoading]=useState(false)
    const [isCheck,setIsCheck]=useState(false)


    const handleCheck = (id) =>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }
    const deleteProduct = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const deleteAll= () =>{
        products.forEach(product=>{
            if(product.checked) deleteProduct(product._id,product.images.public_id)
        })
        
    }
    const checkAll =( )=>{
        products.forEach(product=>{
            product.checked=!product.checked
        })
        setProducts([...products])
    }

    if(loading) return <div><Loading /></div>
           
    return (
        <>
        <Filters />
        {
            isAdmin && 
            <div className='delete-all'>
                <span>Select all</span>
                <input type='checkbox' checked='' onChange={checkAll}></input>
                <button onClick={deleteAll}>Delete all</button>
            </div>
        }
        <div className='products'>
            {
                products.map(product=>{
                    return <ProductItem key={product._id} product={product}
                     isAdmin={isAdmin} deleteProduct={deleteProduct}
                     handleCheck={handleCheck} />
                })
            }
        </div>
        <LoadMore />
        {products.length===0 && <Loading />
}
        </>
    )
}

export default Products

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import PaypalButton from '../paypal/PayPalButton'



const Cart = () => {
    const state=useContext(GlobalState)
    const [cart,setCart]=state.userApi.cart    
    const [token]=state.token
    const[total,setTotal]=useState(0)
    

    useEffect(()=>{
        const getTotal=()=>{
            const totalPrice=cart.reduce((prev,item)=>{
                return prev + (item.price * item.quantity)
            },0)
            setTotal(totalPrice)
        }
        getTotal()
    },[cart])

    const addToCart=async (cart) =>{
        await axios.patch('/user/addcart',{cart},{
            headers : {Authorization:token}
        })
    }


    const increment=(id)=>{
        cart.forEach(item=>{
            if(item._id === id){
                item.quantity += 1
            }
        })
        setCart([...cart]) 
        addToCart(cart)       
    }

    const decrement=(id)=>{
        cart.forEach(item=>{
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 :item.quantity -= 1
            }
        })
        setCart([...cart])  
        addToCart(cart)      
    }

    const removeProduct =(id)=>{
        if(window.confirm('Do u wanna delete this product?')){
            cart.forEach((item,index)=>{
                if(item._id ===id){
                    cart.splice(index,1)
                }
            })
            setCart([...cart])
            addToCart(cart)
 
        }
    }

    const tranSuccess = async (payment) =>{
        
        const{paymentID,address}=payment

        await axios.post('/api/payment',{cart,paymentID,address},{
            headers:{Authorization:token}
        })

        setCart([])
        addToCart([])
        alert('You placed an order')
        
    }

    if(cart.length===0)
    return <h2 style={{textAlign:'center',fontSize:'5rem'}}>Cart Empty</h2>

    return (
        <div>
            {
                cart.map(product =>(
                <div className='detail__cart'>
                    <img src={product.images.url} />
                < div className='box__detail'>
                 <h2>{product.title}</h2>                 
                
                <h3>${product.price * product.quantity}</h3>
                <p>{product.description}</p>
                <p>{product.content}</p>
                
                
                <div className='amount'>
                    <button onClick={()=>decrement(product._id)}>-</button>
                    <p>{product.quantity}</p>
                    <button onClick={()=>increment(product._id)}>+</button>
                    <button className='remove' onClick={()=>removeProduct(product._id)}>Remove Item</button>
                </div>
                
                 </div>   
                
           </div>
           
                
                ))
            }

            <div className='total'>
                <h3>TOTAL: $ {total}</h3>
                <PaypalButton 
                total={total}
                tranSuccess={tranSuccess}/>

            </div>
        </div>
    )
}

export default Cart

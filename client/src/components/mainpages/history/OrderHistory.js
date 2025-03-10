import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import './history.css'

const OrderHistory = () => {
    const state=useContext(GlobalState)
    const [history,setHistory]=state.userApi.history
    const [isAdmin]=state.userApi.isAdmin
    const token=state.userApi.token

    useEffect(()=>{
        if(token){
            const getHistory= async ()=>{
                if(isAdmin){                
                        const res=await axios.get('/api/payment',{
                            headers:{Authorization:token}
                        } )                 
                    setHistory(res.data)
                }else{
                    const res=await axios.get('user/history',{
                        headers:{Authorization:token}               
           
                })
                setHistory (res.data)
            }
            }
            getHistory()
        }
    },[token,setHistory,isAdmin])



    return (
        <div className='history__page'>
            <h3>History</h3>
            <h4>You have: {history.length} orders</h4>

            <div className='history-page'>
                <table>
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Date of Purchased</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map(items=>{
                                <tr key={items._id}>
                                    <td>{items.paymentID}</td>
                                    <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                    <td><Link to={`/history/${items._id}`}>View</Link></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderHistory


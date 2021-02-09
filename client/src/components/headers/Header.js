import React,{useState,useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from 'react-router-dom'
import { IconButton } from '@material-ui/core';
import axios from 'axios';


const Header = () => {
    const state=useContext(GlobalState)
    const[isAdmin]=state.userApi.isAdmin
    const [isLogged]=state.userApi.isLogged    
    const [cart]=state.userApi.cart
    const [menu,setMenu]=useState(false)

    const logoutUser=async () =>{
        await axios.get('/user/logout')  
        
        localStorage.removeItem('firstLogin')
        window.location.href='/'
    }

    const adminRouter=()=>{
        return (
            <>
                <li><Link to='/create_product'>Create Product</Link></li>
                <li><Link to='/category'>categories</Link></li>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <li><Link to='/history'>History</Link></li>
                <li><Link to='/' onClick={logoutUser}>logout</Link></li>

            </>
        )
    }
    const toggleMenu=()=>setMenu(!menu)

    const styleMenu ={
        left:menu ? 0 : '-100%'
    }
    return (
        <header >
            <div className='menu' onClick={()=>setMenu(!menu)}>
                <IconButton>
                <MenuRoundedIcon/>
                </IconButton>
            </div>
            <div className='logo'>
                <h1>
                    <Link to='/'>{isAdmin ? 'Admin' : 'PET COMMERCE'}</Link>
                </h1>
            </div>
            <ul style={styleMenu}>
                <li><Link to='/'>{isAdmin ? 'Products' : 'shop'}</Link></li>
               
               {isAdmin && adminRouter()}
               {
                   isLogged ? loggedRouter() :<li><Link to='/login'>Login </Link></li>
               }
               
                <li onClick={()=>setMenu(!menu)} className='menu'><CloseIcon/></li>
                
            </ul>

               {
                   isAdmin ? '' :
                   <div>
                   <span className='cart_span'>{cart.length}</span>
                   <Link to='/cart'>
                       <ShoppingCartRoundedIcon className='cart'/>
                   </Link>
               </div>
               }



        </header>
    )
}

export default Header

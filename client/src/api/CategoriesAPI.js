import axios from 'axios'
import React, { useEffect, useState } from 'react'

function CategoriesAPI() {
    const [categories,setCategories]=useState([])
    

    useEffect(()=>{
        const getCategories =async () =>{
            const res =await axios.get('/api/category')
            setCategories(res.data)

        }
        getCategories()
        

    },[])


    return{
        categories:[categories,setCategories]
    }
    }   

export default CategoriesAPI

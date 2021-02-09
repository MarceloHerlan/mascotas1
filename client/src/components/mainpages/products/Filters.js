import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

function Filters() {
    const state=useContext(GlobalState)
    const [products,setProducts]=state.productApi.products
    const [category,setCategory]=state.productApi.category
    const [sort,setSort]=state.productApi.sort
    const [search,setSearch]=state.productApi.search
    const [categories]=state.categoriesAPI.categories
    
    const handleCategory=(e)=>{
        e.preventDefault()
        setCategory(e.target.value)
        setSearch('')
    }

    
    return (
        <div className='filter_menu'>
            <div className='row'>            
                <span>Filters:</span>
                <select name='category' value={category} onChange={handleCategory}>
                    <option value=''>All Products</option>
                    {
                        categories.map(category=>(
                            <option value={'category=' + category._id}
                            key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div> 

            <input type='text' value={search} placeholder='Search'
             onChange={e=>setSearch(e.target.value.toLowerCase())}/>   

             <div className='row'>            
                <span>Sort By:</span>
                <select  value={sort} onChange={e=>setSort(e.target.value)}>
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-price'>Price:Highest</option>
                    <option value='sort=price'>Price:Lowest</option>                
                 </select>
        </div>         
        </div>
    )
}

export default Filters

import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

const LoadMore = () => {
    const state=useContext(GlobalState)
    const [page,setPage]=state.productApi.page
    const [result]=state.productApi.result

    return (
        <div className='load_more'>
            {
                result < page * 8? ''
                : <button onClick={()=> setPage(page+1)}>Load more</button>
            }
            
        </div>
    )
}

export default LoadMore

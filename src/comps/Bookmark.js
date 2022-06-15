import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { inCartContext } from "../inCart";


const Bookmark = () => {
    const {bookmarkList, setBookmarkList} = useContext(inCartContext);
    const [total, setTotal] = useState(0);

    

    useEffect(()=>{
        setTotal(bookmarkList.reduce((productOne, productTwo)=>{
          return  productOne+productTwo.price
        }, 0));
    }, [bookmarkList]);
    
    return (
        <>
        {bookmarkList.map(product=>{
            return <div>
                <p>{product.title}</p>
                <button onClick={()=>setBookmarkList(bookmarkList=>bookmarkList.filter(products=>products.id!==product.id))}>Remove</button>
                <p>Quantity {product.quantity}</p>
                <input onChange={(e)=>{
                    const value = e.target.value;

                    setBookmarkList(bookmarkList=> {
                        return bookmarkList.map(bookmark=>{
                            return bookmark.id===product.id ? {
                                ...bookmark,
                                quantity:value
                            } : bookmark
                        })
                    })
                }} type='number' min={1}></input>

                <h1>{total}</h1>
            </div>
        })}
        </>
    )
}


export default Bookmark;
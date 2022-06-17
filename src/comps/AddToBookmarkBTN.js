import { useContext, useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { bookmarkContext } from "../bookmarkContext";



const ControlBookmarkBTN = ({product}) => {
    const {bookmarkList, setBookmarkList} = useContext(bookmarkContext);
    const existInBookmark = bookmarkList.some(products=>products.id===product.id);




    const controlBookmark = () => {
   
            // Add
            existInBookmark===false ? setBookmarkList([...bookmarkList, product]) 
            // Remove
             : setBookmarkList(bookmarkList.filter(products=>products.id!==product.id));
           
    }

    return (
        <button className="bookmark__btn btn" onClick={controlBookmark}>{existInBookmark ? <FaBookmark /> : <FaRegBookmark />}</button>
    )
}


export default ControlBookmarkBTN;
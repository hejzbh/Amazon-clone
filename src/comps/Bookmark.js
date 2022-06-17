import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { bookmarkContext } from "../bookmarkContext";
import SearchProduct from "./SearchComponent";
import ReactPaginate from "react-paginate";

import bookmark from '../style/bookmark.css'


const Bookmark = () => {
    const {bookmarkList, setBookmarkList} = useContext(bookmarkContext);
    const [curPage, setCurPage] = useState(0);
    const productsPerPage = 4;
    const pageVisited = curPage*productsPerPage;
    const productsForDisplay = bookmarkList.slice(pageVisited, pageVisited+productsPerPage);
    const allPages = Math.ceil(bookmarkList.length/productsPerPage);



    

    return (
      <div className="bookmark__list__preview">
            <ul className="bookmark__list submenu__bookmark">
                {productsForDisplay.map(bookmarkProduct => {
                    return <SearchProduct
                           className='bookmark__product'
                           title={bookmarkProduct.title} 
                           src={bookmarkProduct.thumbnail}
                           price={bookmarkProduct.price}
                           id={bookmarkProduct.id}
                     />
                })}
            </ul>

            <ReactPaginate
                 previousLabel={"Previous"}
                 nextLabel={"Next"}
                 pageCount={allPages}

                 onPageChange={({selected})=>setCurPage(selected)}
                 containerClassName={'pagination__in__bookmark pagination'}
                 previousLinkClassName={'previousBtnBookmark btn pagination'}
                 nextLinkClassName={'previousBtnBookmark btn pagination'}
                 disabledClassName={'paginationDisabled__bookmark'}
                 activeClassName={'paginationActive pagination'}
                 pageClassName={'paginationCurPage pagination'}
            />
      </div>
    )
}


export default Bookmark;
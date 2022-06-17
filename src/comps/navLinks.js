import { Link } from "react-router-dom";
import { inCartContext } from "../inCart";
import { userInfo } from "../UserInfo";
import { useContext, useState } from "react";
import {FaShoppingBasket, FaBookmark, FaRegBookmark} from 'react-icons/fa';
import {bookmarkContext} from '../bookmarkContext'

import Bookmark from "./Bookmark";


const NavLinks = () => {
  const {inCart} = useContext(inCartContext);
  const {bookmarkList} = useContext(bookmarkContext);
  const {logInUser, setLogInUser} = useContext(userInfo);
  const [displayLogout, setDisplayLogout]= useState(false);
  const [listOpened, setListOpened] = useState(false);

  const styleHover = {
      display: displayLogout ? 'block' : 'none'
  }

  const logout = () => {
    setLogInUser(false);
    setDisplayLogout(false);
  }

  const showBookmarkList = (e) => {
    if(e.target.classList.contains('pagination')) return;
    const bookmarkDIV = document.querySelector('.bookmark__list__preview');

    const top = parseInt(getComputedStyle(bookmarkDIV).top);

    bookmarkDIV.style.top = `${top===-420 ? 50 : -420}px`;

    setListOpened(!listOpened);
  }



  return(
    <ul className='nav__links'>
    <li className='nav__link'>
        {logInUser ?
         <ul className="nav__acc"
         onMouseOver={()=>setDisplayLogout(true)}
         onMouseLeave={()=>setDisplayLogout(false)}
      
      
         >
          <p>Hello <span className="user_name">{logInUser.name.split(' ')[0]}</span></p>
        

          <ul style={styleHover}>
            <li><button onClick={logout} className='btn logout__btn' >Logout</button></li>
          </ul>
         </ul>
         
         :
          <Link to='/login'>Hello Guest <span>Sign In</span></Link>}
    </li>

    
        <li className="nav__link bookmark__link"
          onClick={showBookmarkList}
        >
        <p>{listOpened ? <FaBookmark /> :<FaRegBookmark />} <span>{bookmarkList.length}</span></p>


          {<Bookmark />}
        </li>
   
       <li className="nav__link">
       <Link style={{
            textDecoration:'none'
        }} to='/checkout' className='nav__link'>
         <li className='nav__basket'>
        {<FaShoppingBasket />}
        <span className='basketCount'>{inCart.length}</span>
         </li>
     </Link>
       </li>
</ul>
  )
}

export default NavLinks;
import { Link } from "react-router-dom";
import { inCartContext } from "../inCart";
import { userInfo } from "../UserInfo";
import { useContext, useState } from "react";
import {FaShoppingBasket} from 'react-icons/fa'



const NavLinks = () => {
  const {inCart} = useContext(inCartContext);
  const {logInUser, setLogInUser} = useContext(userInfo);
  const [displayLogout, setDisplayLogout]= useState(false);

  const styleHover = {
      display: displayLogout ? 'block' : 'none'
  }

  const logout = () => {
    setLogInUser(false);
    setDisplayLogout(false);
  }

  return(
    <ul className='nav__links'>
    <li className='nav__link'>
        {logInUser ?
         <ul className="nav__acc"
         onMouseOver={()=>setDisplayLogout(true)}
         onMouseOut={()=>setDisplayLogout(false)}
      
      
         >
          <p>Hello <span className="user_name">{logInUser.name.split(' ')[0]}</span></p>
        

          <ul style={styleHover}>
            <li><button onClick={logout} className='btn logout__btn' >Logout</button></li>
          </ul>
         </ul>
         
         :
          <Link to='/login'>Hello Guest <span>Sign In</span></Link>}
    </li>
        <li className="nav__link">
        <p>Returns <span>{'& orders'}</span></p>
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
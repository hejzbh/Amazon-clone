import './App.css';
import './style/important.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Contexts
import { inCartContext } from './inCart';
import { userInfo } from './UserInfo';
import { bookmarkContext } from './bookmarkContext';
import {getProductsFromAPI, AllProductsContext} from './AllProducts';

// Components
import Header from './comps/Header';
import HomePage from './comps/Home';
import ShopByCategory from './comps/ShopByCategory';
import PreviewProduct from './comps/PreviewProduct';
import Checkout from './comps/Checkout';
import Login from './comps/Login';
import Bookmark from './comps/Bookmark';


// Other
import { getInCart } from './workWithData';




// Local storage
import { getLocalStorageFunc, setLocalStorageFunc } from './localStorage';

function App() {
  const [logInUser, setLogInUser] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [inCart, setInCart] = useState(getLocalStorageFunc('inCart') || []);
  const [bookmarkList, setBookmarkList] = useState(getLocalStorageFunc('bookmarkList') || []);

  const [userCountry, setUserCountry] = useState('');
  const [subTotal, setSubTotal] = useState(0);



  // If the user exists the function will retrieve his data from API
  const updateBasketFromDatabase = async () => {
      try {
          const getBasketFromAPI = await getInCart(logInUser.id);
          const products = getBasketFromAPI.map(mainAPIobject=>mainAPIobject.product);

          
          setInCart(products);
      }catch(err){
          throw err;
      }
  }



 // Checks if the user is logged in
  useEffect(()=>{
      const session = async()=>{

        const loginInfo = getLocalStorageFunc('login');

        if(loginInfo) setLogInUser(loginInfo.user);
      

        
      }

      session();
  },[]);


  useEffect(()=>{
    
    logInUser ? (()=>{

      setLocalStorageFunc({user:logInUser}, 'login');
      updateBasketFromDatabase();

    })() : setLocalStorageFunc(false, 'login');
      

  }, [logInUser]);



  
  
  useEffect(()=> {
    // All products from API
    const getAllProducts = async () => {
    const products = await getProductsFromAPI();
    setAllProducts(products.map(product=>{
      return {...product, quantity:1}
    }));
   }

   const getUserCountry = async () => {
     try {
      
      const getCurrentPosition = await new Promise((resolve)=>{
        navigator.geolocation.getCurrentPosition(resolve);
      });

      const {coords: {latitude: lat, longitude:lng}} = await getCurrentPosition;

      const getGeoCode = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

      const data = await getGeoCode.json();

      setUserCountry(data.country);

     }
      catch(err){
        alert(err);
      }
   }

 
   getAllProducts();
   getUserCountry();

   // cleanup
   return () => {};
;
}, []);




// Local storage for products in CART
useEffect(()=> {
   
      setLocalStorageFunc(inCart, 'inCart');
      setSubTotal(inCart.reduce((value, product)=>value+(product.price*product.quantity), 0));

    
}, [inCart]);



useEffect(()=>{
  setLocalStorageFunc(bookmarkList, 'bookmarkList');
}, [bookmarkList]);











  return (
    <Router>
         <div className="App">
           <userInfo.Provider value={{
             userCountry : userCountry,
             logInUser,
             setLogInUser
           }}>
         <AllProductsContext.Provider value={allProducts}>
           <inCartContext.Provider value={{
             inCart,
             setInCart
           }}>
            <bookmarkContext.Provider value={{
              bookmarkList,
              setBookmarkList
            }}>
     
     
         <Header allProducts={allProducts} setAllProducts={allProducts} />
         
 
        <Routes>
             <Route exact path='/' element={<HomePage  />}></Route>
            <Route exact  path='/shopByCategory' element={<ShopByCategory />}></Route>
            <Route exact path='/previewProduct' element={<PreviewProduct  />}></Route>
            <Route exact path='/bookmark' element={<Bookmark  />}></Route>
            <Route exact path='/checkout' element={<Checkout totalPrice={subTotal}  />}></Route>
            <Route exact path='/login' element={<Login  />}></Route>
        </Routes>

        </bookmarkContext.Provider>
        </inCartContext.Provider>
        </AllProductsContext.Provider>
        </userInfo.Provider>
         </div>
    </Router>
  );
}

export default App;

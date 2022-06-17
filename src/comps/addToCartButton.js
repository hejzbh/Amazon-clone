import { useContext, useState } from "react"
import { inCartContext } from "../inCart";
import { setLocalStorageFunc } from "../localStorage";
import { userInfo } from "../UserInfo";
import { sendNewProductToAPI } from "../workWithData";

export const AddToCartButton = ({product}) => {
    const {logInUser} = useContext(userInfo);
    const {inCart, setInCart} = useContext(inCartContext);
    const [success, setSuccess] = useState(()=>inCart.some(productInCart=>productInCart.id===product.id));


    

    const addToCart = (id) => {
        const productID = id;
        
        const productExist = inCart.find(product=>product.id===productID);

     

        productExist ? alert('Product exist in cart') : (()=>{
            setInCart([...inCart, product]);

            if(logInUser) sendNewProductToAPI(logInUser.id, product);
        })();
    }
    return (
        <button className="add__to__cart__btn" onClick={()=>addToCart(product.id)}>{success ? 'Added to cart ✅' : 'Add to cart'}</button>
    )
}

export default AddToCartButton;
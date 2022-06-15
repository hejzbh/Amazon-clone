import { useContext } from "react";
import { userInfo } from "../UserInfo";
import { deleteProductFromAPI } from "../workWithData";


const RemoveFromCartBTN = ({product, setInCart}) => {
    const {logInUser} = useContext(userInfo);

    const removeFromCart = () => {
        setInCart(inCart=>inCart.filter(products=>products.id!==product.id));


        if(logInUser) deleteProductFromAPI(logInUser.id, product.id, product);

    }

    return (
    <button className="btn remove__from__cart__btn" onClick={removeFromCart}>Remove from cart</button>
    )
}


export default RemoveFromCartBTN;
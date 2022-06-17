import { useContext, useState, useEffect } from "react";
import { inCartContext } from "../inCart";
import ReactPaginate from "react-paginate";
import RemoveFromCartBTN from "./removeFromCartButton"; 
import { updateProdctFromCart } from "../workWithData";
import { userInfo } from "../UserInfo";
import checkoutStyle from '../style/checkout.css'
import RandomProductsDIV from "./RandomProducts";


const Checkout = ({totalPrice}) => {
    const {logInUser} = useContext(userInfo);
    const {inCart, setInCart} = useContext(inCartContext);
    const subTotal = totalPrice;
    const [curPage, setCurPage] = useState(0);

    // Paginate
    const productsPerPage = 5;
    const pagesVisited = curPage*productsPerPage;
    const pageCount = Math.ceil(inCart.length/productsPerPage);
    const displayProducts = inCart.slice(pagesVisited, pagesVisited+productsPerPage);


    const changeQuantity = async (productChange, e) => {

        const value = +e.target.value;
        if(value>productChange.stock) return;

       setInCart(inCart.map(inCartProduct=>{
            return inCartProduct.id===productChange.id ? {...inCartProduct, quantity:value} : inCartProduct
        }));


        // user logged in ? Save this change on API, too.
        if(logInUser) updateProdctFromCart(logInUser.id, productChange);
    }



    return (
        <div className="checkout__page container">
            <div className="checkout__left">
            {inCart.length<1 ? <div className="empty__cart__div white">
                <h2>Your Amazon Cart is Empty</h2>
            </div> :

             <div className="shoping__cart white">
                 <div className="shoping__cart__top">
                        <h2 className="title__shop__cart">Shopping cart</h2>
                 </div>
                 <div className="list__of__inCart__products">
                 {displayProducts.map(product=>{
                     return (
                     <div className="product__in__cart">
                        <div className="in__cart__photo">
                            <img style={{width:'100%', maxWidth:'120px'}} src={product.thumbnail}></img>
                        </div>

                        <div className="in__cart__desctiption">
                            <div className="in__cart__left">
                            <h3 className="in__cart__title">{product.title} - <span>{product.description}</span></h3>
                            <p style={{
                                color:product.stock>1 ? '#0d7d0d' : 'red',
                                margin:'0.3em 0'
                            }}>{product.stock>1 ? `In stock ${product.stock===product.quantity ? '- MAX' : ''}` : 'No available'}</p>

                        
                    
                            <div className="in__cart__features">
                            <label className="chng_qty" htmlFor="change__quantity">Quantity: </label>
                            <input
                            onChange={changeQuantity.bind(this, product)}
                            type='number'
                            min="1"  
                            name="change__quantity"
                            max={product.stock}
                            value={product.quantity}></input>

                            <RemoveFromCartBTN product={product} setInCart={setInCart}/>
                            </div>
                            </div>
                            
                            <div className="in__cart__right">
                                <p className="product__price">${product.price}</p>
                            </div>
                        </div>
                        
                     </div>)
                 })}
                 </div>

                 <div style={{textAlign:'right', padding:'0.8em 0'}}>
                 <h4 className="subtotal">Subotal {`(${inCart.length} items)`} <span>{subTotal} $</span></h4>

                 <>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={({selected})=>setCurPage(selected)}

                        containerClassName={'pagination__in__cart'}
                        previousLinkClassName={'perviousBtnCart'}
                        nextLinkClassName={'nextBtnCart'}
                        disabledClassName={'paginationDisabled'}
                        activeClassName={'paginationActive'}
                        pageClassName={'paginationCurPage'}
                    />
                 </>
                 </div>
       
             </div>
             }
            </div>

            <div className="checkout__right">
                {inCart.length>0 ? <div className="proceed_to_checkout">
                <h4 className="subtotal">Subotal {`(${inCart.length} items)`} <span>{subTotal} $</span></h4>

                 <button className="btn proceed_btn">Proceed to checkout</button>
                </div> : ''}


                <RandomProductsDIV />
            </div>
        </div>
    )
}

export default Checkout;
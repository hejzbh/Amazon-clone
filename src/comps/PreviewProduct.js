import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { nanoid } from "nanoid";

// Context
import { AllProductsContext } from "../AllProducts";
import { userInfo } from "../UserInfo";

// Components
import AddToCartButton from "./addToCartButton";

import URL from '../config'


import { FaStar, FaLocationArrow } from "react-icons/fa";

// Helper funcs
import { correctText } from "../HelperFunctions";




const PreviewProduct = () => {
    const allProducts = useContext(AllProductsContext);
    const [urlID, setUrlID] = useState(+URL());
    const product = allProducts.find(product=>product.id===urlID);
    const [indexPhoto, setIndexPhoto] = useState(0);
    const [loading, setLoading]= useState(false);
    const userInfoA = useContext(userInfo);

    // URL id is the id located in widnow location href after "?"
    
    useEffect(()=>{
        document.querySelector('.header__list__of__searchs').addEventListener('click', function(e){
           

            const link = e.target.closest('.search__result__div');
           

            if(!link) return;


    
 
            setLoading(true);
            setUrlID(+URL());
            setLoading(false);

      
        });
    },[]);

  

    const escapeProperties = ['id','rating' , 'thumbnail' , 'images' , 'quantity'];

    return (
        <div key={nanoid()} className="preview__product__page container">
            {allProducts.length>1 && <>
            <div className="random__product">

            </div>
            

            <div className="preview__bottom">
            {
                loading ? <p>...</p> :      <div className="photos__of__product">
                <div className="left__photos">
                    {product.images.map((image, i)=>{
                       return <div style={{
                           border: indexPhoto===i ? '2px solid #FCAF17' : 'unset'
                       }}>
                            <img  onClick={()=>setIndexPhoto(i)} src={image}></img>
                       </div>
                    })}
                </div>
                <div className="main__photo">
                    <img 
                    style={{transition:'0.3s ease'}}
                    onMouseOver={(element)=>{

                      const img = element.target;
                      img.style.transform='scale(1.25)';
                    }}

                    onMouseLeave={(e)=>e.target.style.transform='scale(1.0)'}
                    
                    src={product.images[indexPhoto]}></img>
                </div>
            </div>
            }

                <div className="information__about__product">
                    <div className="preview__info__top">
                        <h3>{product.title}</h3>
                        <div className="rating__starts">{Array.from({length:Math.floor(product.rating)}).map(rate=><FaStar key={nanoid()} color="#ffa41c" />)}</div>

                        <span style={{color:'#ffa41c'}}>AMAZON</span>
                    </div>

                    <div className="preview__main__description">
                        <ul className="preview__desc__list">
                            {Object.entries(product).map(([title,value])=>{
                                const skipProperty = escapeProperties.some(property=>property===title);

                                return skipProperty ? '' : <li style={{
                                    flexDirection: title==='description' ? 'column' : 'row'                                   
                                }}><span>{correctText(title)}:</span>{value}
                                {title==='discountPercentage' ? ' %' : ''}
                                {title==='price' ? ' $' : ''}
                                </li>
                            })}
                        </ul>
                    </div>
                </div>


                <div className="preview__product__interact">
                    <div className="preview__interact__box">
                        <p><FaLocationArrow key={nanoid()} /> Delivered to {userInfoA?.userCountry}</p>
                        <AddToCartButton key={nanoid()} product={product} />
                    </div>
                </div>
            </div>
            </>}
        </div>
    )
}

export default PreviewProduct;
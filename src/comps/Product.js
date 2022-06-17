
import { Link } from "react-router-dom";

import {FaStar} from 'react-icons/fa'
import { nanoid } from "nanoid";
import ControlBookmarkBTN from "./AddToBookmarkBTN";


import Flip from 'react-reveal/Flip';

const Product = ({product}) => {
    const name = product.title;
    const price = product.price;
    

  

    return (
        <Flip top>
        <div className="product_cat">
                {product.rating>=4.5 ? <p className="best-seller">Best seller</p> : ''}
        <Link key={nanoid()} to={`/previewProduct?${product.id}`} className="product category__product">

        

            <div className="image__place">
             <img src={product.images[0]}></img>
            </div>
            <div className="product__desc">
            <h3>{name}</h3>
            <p className="rating">{Array.from({length:product.rating}).map(rating=><FaStar />)}</p>
            <p className="price">{price} $</p>
    
            </div>
        </Link>
        <ControlBookmarkBTN key={nanoid()} product={product} />
        </div>
        </Flip>
    )
};

export default Product;

import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AllProductsContext } from "../AllProducts";
import { nanoid } from "nanoid";

const RandomProductsDIV = () => {
    const allProducts = useContext(AllProductsContext);
    const [randomProducts, setRandomProducts] = useState([]);

    useEffect(()=>{
        const createRandomNumber = (min, max) => Math.floor(Math.random()*(max-min)+min);

        const firstIndex = createRandomNumber(1, 20);
        const lastIndex = createRandomNumber(20, allProducts.length-1);
    
        setRandomProducts(allProducts.slice(firstIndex, lastIndex).slice(0, 4));
        
    }, [allProducts]);


    return (
        <div className="random__products__checkout">
            <h3>Sponsored products related to you</h3>
            {randomProducts.map(product=><Link key={nanoid()} className="product__random" to={`/previewProduct?${product.id}`}>
                
                <img src={product.thumbnail}></img>
                <div className="info">
                    <p>{product.title}</p>
                    <p>{product.price} $</p>
                </div>
                
                </Link>)}
        </div>
    )

}

export default RandomProductsDIV;

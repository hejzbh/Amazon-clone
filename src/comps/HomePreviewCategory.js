
import PreviewCategory from "./PreviewCategory";
import { Link } from "react-router-dom";
import { useContext } from "react";



const CategoriesSection = ({allProducts}) =>{


const filterProducts = (category) => {
return allProducts.filter(product=>product.category===category);
}

return (
    <div className="category__handle container">

        <Link to='/ShopByCategory?laptops'  className="category category__laptops">
            <h4>Laptops</h4>
            <div className="mini__preview">
              {filterProducts('laptops').slice(0, 4).map(product => <PreviewCategory product={product} />)}
          </div>
        </Link>

        <Link to='/ShopByCategory?smartphones' className="category category__smartphones">
         <h4>Smartphones</h4>
         <div className="mini__preview">
          {filterProducts('smartphones').slice(0, 4).map(product=>{
               return <PreviewCategory product={product} />
           })}
          </div>
        </Link>

        <Link to='/ShopByCategory?fragrances'  className="category fragrances">
         <h4>Fragences</h4>
          <div className="mini__preview">
          {filterProducts('fragrances').slice(0, 4).map(product=>{
               return <PreviewCategory product={product} />
           })}
          </div>
        </Link>

    </div>
)

}

export default CategoriesSection;
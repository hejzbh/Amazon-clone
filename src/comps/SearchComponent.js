import { Link } from "react-router-dom";


const SearchProduct = ({src,title,price, id, className}) => {
    return(
        <li>
                
                       <Link to={`previewProduct?${id}`} className={className}>
                       <img src={src}></img>
                       <h4 className='title'>{title}</h4>
                       <p className='price'>{price} $</p>
                       </Link>
              
      </li>
    )
}

export default SearchProduct;
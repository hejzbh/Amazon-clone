import { Link } from "react-router-dom";
const SearchComponent = ({src,title,price, id}) => {
    return(
        <li>
                       <Link to={`previewProduct?${id}`} className='search__result__div'>
                       <img src={src}></img>
                       <h4 className='title'>{title}</h4>
                       <p className='price'>{price} $</p>
                       </Link>
      </li>
    )
}

export default SearchComponent;
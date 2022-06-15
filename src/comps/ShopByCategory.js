import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";


import config from "../config";
import { nanoid } from "nanoid";

// CSS
import categoryPageStyle from '../style/categoryPage.css';

// Helper functions
import { correctText } from "../HelperFunctions";


// Context
import {AllProductsContext} from '../AllProducts';
import { inCartContext } from "../inCart";

// Icons
import {FcList} from 'react-icons/fc';
import {FaWindowClose} from 'react-icons/fa'

// Components
import Product from "./Product";


const ShopByCategory = () => {
    const allProducts = useContext(AllProductsContext);
    const categoryFromURL = config();
    const pageName = 'ShopByCategory';
    const allCategory = [...new Set(allProducts.map(product=>product.category)), 'All'];
    const [category, setCategory] = useState(categoryFromURL || JSON.parse(localStorage.getItem('category')) || 'All');

    
    const [filters, setFilters] = useState({
        minPrice:0,
        maxPrice:0,
        sort:false,
    });





    useEffect(()=>{
        localStorage.setItem('category', JSON.stringify(category));  
    }, [category]);



      





    const filterProducts = () => {

        const byCategories = category==='All' ? allProducts : allProducts.filter(product=>product.category===category);

        const filtersExist = Object.values(filters).some(value=>value!==null);
    

        let filteredProducts = [];

        if(filtersExist){
            filteredProducts = byCategories.filter(product=>{
               return product.price>=filters.minPrice && (filters.maxPrice>filters.minPrice ? product.price<=filters.maxPrice : true);

               
            });


        } else {
            filteredProducts = byCategories;
        }

        if(filters.sort){
            filteredProducts.sort((a,b)=>parseFloat(a.price)-parseFloat(b.price))
        } 

        return filteredProducts;
    }



  



  



    const showAllCategories = () => {
      return  allCategory.map(categoryName=>{
        return <li
            className="category__choice__link"
            onClick={()=>setCategory(categoryName)}
            >

            <Link to={`/${pageName}?${categoryName}`} style={styleForLinks(categoryName)}>{correctText(categoryName)}</Link>

            </li>
        })
    }

    const styleForLinks = (categoryTitle) => {
        return {
             color : categoryTitle==category ? '#f6aa16' : '#6e7070',
             fontSize:'14px',
             padding:'0.3em 0',
             marginLeft:'10px'
              }
     };


     const handleFiltersChange = (e) => {


     
        const {name, value, checked, type} = e.target;


        setFilters({...filters, [name]:type==='checkbox' ? checked : value});



     }

 

     
      const showLeftSidebar = () => {
        //document.querySelector('.category__page__left').classList.toggle('showLeft');
        //setBtnOpen(!btnOpen);

        /**  <button onClick={showLeftSidebar} style={{float:'right', fontSize:'22px'}} className="show__left__side btn mobile_view">{btnOpen ? <FcList /> : <FaWindowClose />}</button> */
      }


    return (
        <div className="category__page container">
          
            <div className="category__page__left">
                <ul className="categories__list">
                    <h4>Categories</h4>
                    {showAllCategories()}
                </ul>
                <form onChange={handleFiltersChange} className="filters__category">
                    <h4>Filters</h4>

                    <div>

                        <input
                        type="checkbox"
                        name='sort'
                        checked={filters.sort}></input>
                        <label className="label__sort" htmlFor="price">Low to high</label>
                    </div>

                <div>
                    <div className="input__range__div">
                        <p>Min price<span className="min__price">{filters.minPrice} $</ span></p>

                    <input 
                    type='range'
                    min={0}
                    max={10000}
                    name='minPrice'
          
                 ></input>

                    <p>Max price <span className="max__price">{filters.maxPrice} $</span></p>
                    <input 
                    type='range'
                    min={0}
                    max={10000}
                    name='maxPrice'
              
                    ></input>

                    </div>
                    
                </div>

                </form>

               
            </div>
            <div  className="category__page__right display__products">
                    <div className="category__page__top">
                        <h2 className="category__title">{category}</h2>
                        <p>{filterProducts().length} results</p>
                    </div>
                    
                    <div className="category__products">
                    { 
                        filterProducts().length>0? filterProducts().map(product=><Product key={nanoid()} product={product} />) : 'No results'
                    }
                    </div>
            </div>
        </div>
    )
}

export default ShopByCategory;

/**
 * { Object.values(filters).some(value=>value!==null) ? productsByFilters.map(product=><Product product={product} />) : productsByCategory().map(product=><Product product={product} />) }
 */
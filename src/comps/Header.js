import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';

// Style
import '../style/Header.css';
// Img
import logo from '../img/Amazon-logo.png';
//Icons
import {FaSearch, FaAngleRight, FaAngleLeft
} from 'react-icons/fa';
 





import Button from './Button';

import SearchProduct from './SearchComponent';

import NavLinks from './navLinks';

const Header = ({allProducts, setAllProducts}) => {
    const [searchProducts, setSearchProducts] = useState([]); // Svi produkti koji sadrze ključnu riječ iz inputa
    const [productsForDisplay, setProductsForDisplay] = useState([]); // Produkti koji će se prikazati u dropdown search previewu
    const [inputValue, setInputValue] = useState(''); // Input value
    const [curPage, setCurPage] = useState(1); // Trenutna stranica u dropdown search preview
    const [nextBtn, setNextBtn] = useState(false); // Da li ce se prikazati NEXT BTN
    const [prevBtn, setPrevBtn] = useState(false); // Da li ce se prikazati PREV BTN


    // Trazi sve produkte koje sadrze kljucnu rijec koju upisemo u inputu.
    const searhProducts = (e) => {
        const value = e.target.value;
        setInputValue(value);
    

        const productsMatchingInputValue = allProducts.filter(product=>product.title.includes(inputValue.trim()) || product.category.includes(inputValue.trim()));
       

        setSearchProducts(productsMatchingInputValue);
        

    }


    // Produkti koji će biti prikazani u search dropdown preview
    useEffect(()=> {
        const firstIndex = (curPage-1) * 3;
        const lastIndex = curPage * 3;

        const notEmpty = inputValue.length>0;
        setProductsForDisplay(notEmpty ? searchProducts.slice(firstIndex, lastIndex) : []);

    }, [curPage, searchProducts]);


    // Pagination
    useEffect(()=>{
        const AllPages = Math.ceil(searchProducts.length/3);
    

        if(curPage===1 && AllPages>1) {
            setNextBtn(true);
            setPrevBtn(false);
            return;
        } 

        if(curPage<AllPages) {
            setNextBtn(true);
            setPrevBtn(true);
            return;
        }

        if(curPage===AllPages && AllPages>1) {
            setPrevBtn(true);
            setNextBtn(false);
            return;
        } 


       else {
        setPrevBtn(false);
        setNextBtn(false);
       }
    }, [productsForDisplay]);

 



    const searchListStyle = {
        transform: `translateY(${productsForDisplay.length<1 ? -250 : 0}%)`,
        zIndex:100,
    } 

    const insertProductsFromSearch = productsForDisplay.map(product=><SearchProduct key={nanoid()} className='search__result__div' title={product.title} src={product.thumbnail} price={product.price}  id={product.id} />);


    return (
        <header className='header'>
            <div className='inner__header container'>
            <div className='logo__place'>
                <Link to='/'><img className='logo header__logo' src={logo}></img></Link>
           </div>

           <div className='header__search__div'>
               <input
               onChange={searhProducts} 
               value={inputValue} 
               className='header__search__input' 
               placeholder='Search for your products'>   
               </input>

               <div className='header__icon__div'><FaSearch /></div>

               <ul style={searchListStyle} className='header__list__of__searchs'>

                   {insertProductsFromSearch}

                   {nextBtn && <Button title={<FaAngleRight />} className='pagination__right' setCurrentPage={()=>setCurPage(curPage+1)} />}
                   {prevBtn && <Button title={<FaAngleLeft />} className='pagination__left' setCurrentPage={()=>setCurPage(curPage-1)} />}

               </ul>
           </div>

            <NavLinks/>
            </div>
        </header>
    )
}






export default Header;
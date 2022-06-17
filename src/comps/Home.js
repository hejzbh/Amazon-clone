import Hero from "./Hero";
import HomePreviewCategory from "./HomePreviewCategory";
import { useContext } from "react";
import {AllProductsContext} from '../AllProducts';

const HomePage = () => {
    const allProducts = useContext(AllProductsContext);

    return (
        <>
            <Hero />
            <HomePreviewCategory allProducts={allProducts} />
        </>
        
    )
}

export default HomePage;
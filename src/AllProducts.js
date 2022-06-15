import { createContext } from "react";

export const AllProductsContext = createContext();

export const getProductsFromAPI = async () => {


        const productsFromAPI = await fetch('https://dummyjson.com/products');
        const products = await productsFromAPI.json();
    


        return products.products;
 
};
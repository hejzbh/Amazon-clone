// Function that returns the word after the "?" in the link, such as 
// LINK:(https.products?iphone
// const iphonePhones = categoryFromURL();


const categoryFromURL = ()=>{
    const url = window.location.href;

   return url.slice(url.lastIndexOf('?')).slice(1)
};


export default categoryFromURL;
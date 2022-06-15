
const categoryFromURL = ()=>{
    const url = window.location.href;

   return url.slice(url.lastIndexOf('?')).slice(1)
};


export default categoryFromURL;
import { useState, useEffect } from "react";


const HeroSlider = ({heroImages, index}) => {


    useEffect(()=>{
        document.querySelectorAll('.hero__image').forEach((img, i)=>{
            img.style.transform=`translateX(${100*(i-index)}%)`;
        })
    }, [index]);   
    
    const styleForImages={
        position:'absolute',
        top:'0',
        left:'0',
        width:'100%',
        height:'100%',
  
        transition:'0.4s ease all'
    }

    return (
         heroImages.map(src=><img style={styleForImages} className='hero__image' src={src}></img>)


    )
}

export default HeroSlider;
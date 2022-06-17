import heroImage1 from '../img/hero1.jpg';
import heroImage2 from '../img/hero2.jpg';
import heroImage3 from '../img/hero3.jpg';

import { useState, useEffect } from 'react';
import HeroSlider from './HeroSlider';
import heroCss from '../style/heroSection.css';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const Hero = () =>{
    const [heroImages, setHeroImages] = useState([heroImage1, heroImage2, heroImage3]);
    const [index, setIndex] = useState(0);

    const nextSlide = () => {
        index < heroImages.length-1 ? setIndex(index+1) : setIndex(0);
    }
    
    const prevSlide = () => {
        index===0 ? setIndex(heroImages.length-1) : setIndex(index-1);
    }


    
    return (
        <div className="hero__section">
            <HeroSlider index={index} heroImages={heroImages} />
            <div className='container'>
            <button onClick={prevSlide} className='btn__slide__left'><FaArrowLeft /></button>
            <button onClick={nextSlide} className='btn__slide__right'><FaArrowRight /></button>
            </div>
        </div>
    )
}


export default Hero;
import './Carousel.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {banners} from '../db/data.js';
import {home} from '../App'





export default function Carousel({ id, title, sub_title, text_color, url }) {
            
    const carouselImg = {
        width: window.innerWidth < 1100 ? '100vw' : '48em'
      };

   
      
      return (
        <div>
          <img
            style={carouselImg}
            className={`carousel-img${id}`}
            src={`banners-${id}.webp`}
            alt={`Banner ${id}`}
          />
      
          <div style={text_color && { color: text_color }} className='carousel-text'>
            <span className='carousel-title'>{title}</span> <br />
            <span className='carousel-sub_title'>{sub_title}</span>
          </div>
        </div>
        
      );
      
    
}
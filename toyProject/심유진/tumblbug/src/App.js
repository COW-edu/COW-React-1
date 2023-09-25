import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import MainBar from './component/MainBar';
import SideBar from './component/SideBar';
import Carousel from './component/Carousel.js';
import Search from './component/Search';
import {banners, notable_projects, popular_projects } from './db/data.js';
import Footer from './component/Footer';
import { useState } from 'react';
import './component/Carousel.css';
import Form from './component/Form.jsx';
import { useEffect } from 'react';
import './App.css';
import {carouselImg} from './component/Carousel'




function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Search" element={<Search />} />
          <Route path='/Form' element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Home() {
  const [carouselPosition, setCarouselPosition] = useState(0);
  
  const handlePrevClick = () => {
    if (carouselPosition === 0) {
      
      setCarouselPosition(3); 
    } else {
      setCarouselPosition(carouselPosition - 1);
    }
  };

  const handleNextClick = () => {
    if (carouselPosition === 3) {
     
      setCarouselPosition(0);
    } else {
      setCarouselPosition(carouselPosition + 1);
    }
  };
  const ScreenSize = window.innerWidth < 1100;
const width = ScreenSize ? '100' : '48';
const unit = ScreenSize ? 'vw' : 'em';

const containerStyle = {
  transform: `translateX(-${carouselPosition * width}${unit})`,
  transition: 'transform 0.5s ease-in-out'
};

  

  useEffect(() => {
    const interval = setInterval(handleNextClick, 4000);
    return () => clearInterval(interval);
  }, [carouselPosition]);

  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {

    const updateDateTime = () => {
      const currentDate = new Date();
      const year = (currentDate.getFullYear() % 100).toString().padStart(2, '0'); 
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
      const day = currentDate.getDate().toString().padStart(2, '0');
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');

      const dateTimeString = `${year}.${month}.${day} ${hours}:${minutes}`;
 
      setCurrentDateTime(dateTimeString);
    };


    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    
    <div>
      <Header/>
    
     

    <div className='content-container'>
      <div className='content-conteiner-container'>

          <div className='content-container-left'>
      
            <div className='titlee0'  >
                <div className="carousel-container" style={containerStyle} >

     
        {banners.map((project) => (
          <Carousel
            key={project.id}
            id={project.id}
            title={project.title}
            sub_title={project.sub_title}
            text_color={project.text_color}
            url={project.url}
          />
        ))}
        </div>
      </div>
      
      <div className='carousel-allow'>
      <div className='swipe'>{carouselPosition+1}/4</div>
                    <button className='carousel-left-allow'  onClick={handlePrevClick}> ﹤ </button>
                    <button className='carousel-right-allow'onClick={handleNextClick} > ﹥ </button>
        </div>
        </div>

      <div className='titlee'>
        <div className='titleaa'>주목할 만한 프로젝트</div>
        <div className="App-container">
          {notable_projects.map((project) => (
            <MainBar
              key={project.id}
              id={project.id}
              title={project.title}
              category={project.category}
              creator={project.creator}
              sponsorship_rate={project.sponsorship_rate}
              url={project.url}
            />
          ))}
        </div>
      </div>

      </div>
      <div className='titlee1'> 
        <div className='titleaa1-1'>
        <div className='titleaa1-2'><a href='https://tumblbug.com/discover?projectSort=popular&ongoing=onGoing'>
          인기 프로젝트</a></div>
        
        <div className='titleaa1-3'>
        <a href='https://tumblbug.com/discover?projectSort=popular&ongoing=onGoing'>
          전체보기</a></div>
        </div>
        <div>
       <div className='current-time'>{currentDateTime} 기준</div>
        </div>
        <div className='App-container1'>
          {popular_projects.map((project) => (
            <SideBar
              key={project.id}
              id={project.id}
              title={project.title}
              category={project.category}
              creator={project.creator}
              sponsorship_rate={project.sponsorship_rate}
              url={project.url}
            />
          ))}
          <div className='titleaa1'>
          <a href='https://tumblbug.com/discover?projectSort=popular&ongoing=onGoing'>
            인기 프로젝트 전체보기</a></div>
        </div>
        
      
      </div>
    </div>
        
        <Footer/>
    </div>
  );
}

export default App;

import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

// Styles
import './index.css';

// Components
import MiniCircle from './components/MiniCircle';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  const mainRef = useRef(null);

  useEffect(() => {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: mainRef.current,
      smooth: true,
      smoothMobile: true
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return (
    <>
      <MiniCircle />
      
      <div id="main" ref={mainRef} data-scroll-container>
        <Hero />
        <Work />
        <About />
        <Footer />
      </div>
    </>
  );
}

export default App;

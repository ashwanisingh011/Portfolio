import React, { useEffect } from 'react';
import gsap from 'gsap'; // Make sure to npm install gsap
import Navbar from './Navbar';
import LogoLoop from './LogoLoop';

const Hero = () => {
    useEffect(() => {
        const tl = gsap.timeline();

        tl.from("#nav", {
            y: "-10",
            duration: 1.5,
            ease: "expo.inOut"
        }, 0)
        .to(".boundingelem", {
            y: 0,
            ease: "expo.inOut",
            delay: -1,
            duration: 2,
            stagger: 0.2
        }, 0)
        .from("#herofooter", {
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: "expo.inOut"
        }, 0);
    }, []);

    return (
        <div id="hero">
            <Navbar />

            <div id="heading">
                <div className="bounding">
                    <h1 className="boundingelem">Full-Stack</h1>
                </div>
                <div className="blocktext">
                    <div className="bounding">
                        <h1 className="boundingelem" id="secondh1">Developer</h1>
                    </div>
                    <div className="bounding">
                        <h5 className="boundingelem">Brewing code & ideas</h5>
                    </div>
                </div>
            </div>

            <div id="smallheadings">
                <div className="bounding">
                    <h5 className="boundingelem">Available for Full Time Roles</h5>
                </div>
                <div className="bounding">
                    <h5 className="boundingelem">Open to Remote & On-site Roles</h5>
                </div>
            </div>

            <div id="herofooter">
                <a href="https://www.advrd.com/">
                    Previously worked at Advrd <i className="ri-arrow-right-up-line"></i>
                </a>
                <a href="https://drive.google.com/file/d/1v7iAgMEm1ugt3SKIjJR080Xep7vT1xBv/view?usp=drive_link">
                    Resume <i className="ri-arrow-right-up-line"></i>
                </a>
                <div id="iconset">
                    <div className="circle"><i className="ri-arrow-down-line"></i></div>
                    <div className="circle"><i className="ri-arrow-down-line"></i></div>
                </div>
            </div>
            {/* <LogoLoop /> */}
        </div>
    );
};

export default Hero;
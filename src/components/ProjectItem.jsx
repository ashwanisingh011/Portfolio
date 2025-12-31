import React, { useRef, useState } from 'react';
import gsap from 'gsap';

const ProjectItem = ({ title, date, imageSrc, isLast, link }) => {
  const itemRef = useRef(null);
  const imgRef = useRef(null);
  const [rotate, setRotate] = useState(0);

  const handleMouseMove = (e) => {
    if (!itemRef.current || !imgRef.current) return;

    const elem = itemRef.current;
    const diff = e.clientY - elem.getBoundingClientRect().top;
    const diffRotate = e.clientX - rotate;
    setRotate(e.clientX); 

    gsap.to(imgRef.current, {
      opacity: 1,
      ease: "power3",
      top: diff,
      left: e.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffRotate * 0.5),
      duration: 0.5 
    });
  };

  const handleMouseLeave = () => {
    if (!imgRef.current) return;
    gsap.to(imgRef.current, {
      opacity: 0,
      ease: "power3",
      duration: 0.5
    });
  };

  const handleClick = () => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <div 
      ref={itemRef}
      className={`elem ${isLast ? 'elemlast' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ cursor: link ? 'pointer' : 'default' }}
    >
      <img ref={imgRef} src={imageSrc} alt={title} />
      <h1>{title}</h1>
      <h5>{date}</h5>
    </div>
  );
};

export default ProjectItem;
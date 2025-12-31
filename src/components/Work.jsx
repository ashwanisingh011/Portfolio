import React from 'react';
import ProjectItem from './ProjectItem';
// Import your local images here instead of placeholders
// import plugImg from '../assets/plug.png';
import expenseTracker from '../assets/expensetracker.png';
import generativeAI from '../assets/generativeAI.png';
const Work = () => {
    const projects = [
        { title: "Expense Tracker", date: "2025", img: expenseTracker, link: "https://expense-trakker.netlify.app/" },
        { title: "Generative AI", date: "2025", img: generativeAI, link: "https://ashwanisinghproject1.netlify.app/" },
        { title: "hudu", date: "2025", img: "https://placehold.co/600x400/1a1a1a/white?text=CommingSoon", link: "#", isLast: true },
    ];

    return (
        <div id="second">
            {projects.map((proj, i) => (
                <ProjectItem 
                    key={i}
                    title={proj.title} 
                    date={proj.date} 
                    imageSrc={proj.img}
                    isLast={proj.isLast}
                    link={proj.link}
                />
            ))}
        </div>
    );
};

export default Work;
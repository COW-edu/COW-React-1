import './Mainbar.css';
import React from 'react';


export default function MainBar ({id, title, category, creator, sponsorship_rate, url }) {
    return (
        <div className="mainbar-container">
            <div>
                <img className='mainbar-img' src={'notable_projects-' + id + '.webp'} />

            </div>
            <div >
                <div className='mainbar-text'>
                    <span className='mainbar-category'>{category}</span>
                    <span> | </span>
                    <span className='mainbar-creator'>{creator}</span>
                </div>
                <a className='mainbar-title'>{title}</a>
                
            </div>
                <a className='mainbar-sponsorship_rate'>{sponsorship_rate}% 달성</a>

        </div>
    )

};

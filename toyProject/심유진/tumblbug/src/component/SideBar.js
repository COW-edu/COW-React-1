import './SideBar.css';
import React from 'react';


export default function SideBar ({id, title, category, creator, sponsorship_rate, url }) {
    return (
        <div className="sidebar-container">
            <div>
                <img className='sidebar-img' src={'popular_projects-' + id + '.webp'} />

            </div>
            <a  className='sidebar-num'>{id+1}</a>
            <div>
                <div className='sidebar-text'>
                    <span className='sidebar-category'>{category}&nbsp;</span>
                    
                    <span> | </span>
                    <span className='sidebar-creator'>&nbsp;{creator}</span>
                </div>
                <a className='sidebar-title'>{title}</a>
                
            
                <a className='sidebar-sponsorship_rate'>{sponsorship_rate}% 달성</a>
                </div>

        </div>
    )

};
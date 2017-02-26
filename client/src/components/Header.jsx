import React from 'react';
import logo from '../assets/iota_logo.png';

const Header = () => {
  return (
    <div className="top_nav">
        <div className="nav_menu">
            <nav className="dashboardHeader">
                <img src={logo} height="150"/>
            </nav>
        </div>
    </div>
  );
};

export default Header;

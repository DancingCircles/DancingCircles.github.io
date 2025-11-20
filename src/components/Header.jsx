import React from 'react';
import './Header.css';

const Header = () => {
  const navItems = [
    "ISLANDS",
    "TRIP PLAN",
    "ACTIVITIES",
    "ABOUT HAWAII",
    "ABOUT US",
    "CONTACTS"
  ];

  return (
    <header className="header">
      <nav className="nav container">
        <ul className="nav-list">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              <a href={`#${item}`} className="nav-link">{item}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

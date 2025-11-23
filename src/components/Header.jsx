import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if at top (homepage)
      setIsAtTop(currentScrollY < 100);

      // Hide if scrolling down and past 50px, show if scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    "ABOUT",
    "SERVICES",
    "DESTINATIONS",
    "JOURNAL",
    "CONTACT"
  ];

  return (
    <header className={`header ${isVisible ? 'visible' : 'hidden'} ${isAtTop ? 'centered' : ''}`}>
      <nav className="nav">
        <ul className="nav-list">
          {navItems.map((item, index) => (
            <li key={index} className={`nav-item item-${index + 1}`}>
              <a href={`#${item}`} className="nav-link">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

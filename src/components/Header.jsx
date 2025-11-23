import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import './Header.css';

const Header = ({ lenisInstance }) => {
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

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // 创建圆形扩散遮罩
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: #FF3300;
        z-index: 10000;
        pointer-events: none;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(overlay);

      // 动画时间轴
      const tl = gsap.timeline({
        onComplete: () => {
          overlay.remove();
        }
      });

      // 圆形扩散
      tl.to(overlay, {
        width: '300vw',
        height: '300vw',
        duration: 0.4,
        ease: 'power2.in'
      })
      .call(() => {
        // 在遮罩完全覆盖时跳转
        if (window.lenis) {
          if (targetId === 'agency') {
            window.lenis.scrollTo('bottom', { immediate: true });
          } else {
            window.lenis.scrollTo(targetElement, { immediate: true, offset: 0 });
          }
        } else {
          targetElement.scrollIntoView({ behavior: 'instant' });
        }
      })
      // 圆形收缩
      .to(overlay, {
        width: 0,
        height: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  const navItems = [
    { name: "HOME", target: "hero" },
    { name: "ABOUT", target: "collage1" },
    { name: "FAQ", target: "faq" },
    { name: "CONTACT", target: "agency" }
  ];

  return (
    <header className={`header ${isVisible ? 'visible' : 'hidden'}`}>
      <nav className="nav">
        <ul className="nav-list">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              <a 
                href={`#${item.target}`} 
                className="nav-link"
                onClick={(e) => handleNavClick(e, item.target)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// 导入 Three.js 初始化（会自动执行）
import './init/initThree.jsx';
// 导入 Quote 旋转文字初始化
import './init/initQuote.jsx';
// 导入 Waves 初始化
import './init/initWaves.jsx';
// 导入自定义鼠标
import { initCustomCursor } from './utils/customCursor.js';
// 导入导航栏
import { initNavbar } from './utils/navbar.js';

// ============================================
// 开场加载动画
// ============================================
function initLoader() {
  const loader = document.getElementById('loader');
  const yearCounter = document.getElementById('yearCounter');
  const body = document.body;
  
  if (!loader || !yearCounter) return;
  
  // 防止页面滚动
  body.classList.add('loading');
  
  // 年份计数动画：从1950到2025
  const startYear = 1950;
  const endYear = 2025;
  const duration = 2200; // 2.2秒
  const startTime = Date.now();
  
  let lastDisplayedYear = startYear - 1; // 确保第一帧就开始更新
  
  function animateCounter() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // 使用更平滑的缓动函数
    const easeProgress = progress < 0.5 
      ? 4 * progress * progress * progress  // easeInCubic 前半段
      : 1 - Math.pow(-2 * progress + 2, 3) / 2; // easeOutCubic 后半段
    
    const currentYear = Math.round(startYear + (endYear - startYear) * easeProgress);
    
    // 只在数字变化时更新DOM，避免不必要的重绘
    if (currentYear !== lastDisplayedYear) {
      yearCounter.textContent = currentYear;
      lastDisplayedYear = currentYear;
    }
    
    if (progress < 1) {
      requestAnimationFrame(animateCounter);
    } else {
      // 确保显示最终年份
      yearCounter.textContent = endYear;
      
      // 计数完成后立即消失，不停顿
      setTimeout(() => {
        loader.classList.add('fade-out');
        body.classList.remove('loading');
        
        // 动画完成后移除元素
        setTimeout(() => {
          loader.remove();
        }, 800);
      }, 100);
    }
  }
  
  // 立即开始计数动画
  requestAnimationFrame(animateCounter);
}

// 立即初始化加载动画
initLoader();

document.addEventListener("DOMContentLoaded", () => {
  // 初始化自定义鼠标
  initCustomCursor();
  
  // 初始化导航栏
  initNavbar();
  
  // 注册 GSAP 插件
  gsap.registerPlugin(ScrollTrigger);

  // 优化 ScrollTrigger 配置
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true
  });

  // 初始化 Lenis 平滑滚动 - 优化配置
  const lenis = new Lenis({
    lerp: 0.08, // 稍微降低平滑度，提升响应速度
    duration: 1.2,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false
  });

  // 使用 RAF 优化 ScrollTrigger 更新
  let ticking = false;
  lenis.on("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        ScrollTrigger.update();
        ticking = false;
      });
      ticking = true;
    }
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // ============================================
  // Horizontal Marquee Effect
  // ============================================
  
  const initMarquee = () => {
    const marqueeTexts = [
      'GOLANG',
      'LEARNER',
      'BACKEND',
      'FRONTEND',
      'DESIGNER',
      'COLLEGE',
      'STUDENT',
      'CREATIVE',
      'CODER'
    ];

    const container = document.getElementById('marquee-footer');
    const track1 = document.getElementById('marquee-track-1');
    const track2 = document.getElementById('marquee-track-2');

    if (!container || !track1 || !track2) return;

    // 创建滚动带的函数
    const createTrack = (track, isReverse = false) => {
      const repetitions = 4;
      let allItems = [];

      for (let i = 0; i < repetitions; i++) {
        marqueeTexts.forEach(text => {
          const span = document.createElement('span');
          span.className = 'marquee-item';
          span.textContent = text;
          track.appendChild(span);
          allItems.push(span);
        });
      }

      let position = 0;
      const speed = isReverse ? -1.2 : 1.2; // 像素/帧，第二层反向更快一点

      const getSingleSetWidth = () => {
        let width = 0;
        for (let i = 0; i < marqueeTexts.length; i++) {
          if (allItems[i]) {
            width += allItems[i].offsetWidth;
          }
        }
        return width;
      };

      setTimeout(() => {
        const singleSetWidth = getSingleSetWidth();
        position = isReverse ? 0 : -singleSetWidth;

        const animate = () => {
          position += speed;

          if (isReverse) {
            // 反向滚动（从左到右）
            if (position <= -singleSetWidth) {
              position = 0;
            }
          } else {
            // 正向滚动（从右到左）
            if (position >= 0) {
              position = -singleSetWidth;
            }
          }

          track.style.transform = `translateX(${position}px)`;
        };

        gsap.ticker.add(animate);
      }, 100);
    };

    // 创建两条滚动带，第二条反向
    createTrack(track1, false);
    createTrack(track2, true);
  };

  // 初始化 Marquee
  initMarquee();

  // ============================================
  // Project A1: WonJYou Scroll Animation
  // ============================================
  
  // A1: 文字渐显动画 - .about section
  document.querySelectorAll(".project-a1 .animate-text").forEach((textElement) => {
    // 创建覆盖层，直接克隆内容
    const overlay = document.createElement('div');
    overlay.className = 'text-overlay';
    overlay.innerHTML = textElement.innerHTML;
    textElement.appendChild(overlay);

    ScrollTrigger.create({
      trigger: textElement,
      start: "top 50%",
      end: "bottom 50%",
      scrub: 1,
      onUpdate: (self) => {
        const clipValue = Math.max(0, 100 - self.progress * 100);
        overlay.style.setProperty('--clip-value', `${clipValue}%`);
      },
    });
  });

  // A1: services-copy section 渐入动画
  const servicesCopySection = document.querySelector(".project-a1 .services-copy");
  if (servicesCopySection) {
    ScrollTrigger.create({
      trigger: ".project-a1 .services-copy",
      start: "top 80%",
      end: "top 20%",
      scrub: 1,
      onUpdate: (self) => {
        servicesCopySection.style.opacity = self.progress;
      },
    });
  }

  // A1: WHOAMI 动画 - 缓存 DOM 元素
  const servicesHeaders = document.querySelectorAll(".project-a1 .services-header");
  
  if (servicesHeaders.length > 0) {
    // A1: WHOAMI 动画 - 滑入
    ScrollTrigger.create({
      trigger: ".project-a1 .services",
      start: "top bottom",
      end: "top top",
      scrub: 1,
      onUpdate: (self) => {
        // 滑入时就设置大尺寸 scale: 1.5
        gsap.set(servicesHeaders[0], { x: `${100 - self.progress * 100}%`, scale: 1.5 });
        gsap.set(servicesHeaders[1], { x: `-${100 - self.progress * 100}%`, scale: 1.5 });
        gsap.set(servicesHeaders[2], { x: `${100 - self.progress * 100}%`, scale: 1.5 });
      },
    });

    // A1: WHOAMI 动画 - 固定和缩放
    ScrollTrigger.create({
      trigger: ".project-a1 .services",
      start: "top top",
      end: `+=${window.innerHeight * 2}`,
      pin: true,
      scrub: 1,
      pinSpacing: false,
      onUpdate: (self) => {
        if (self.progress <= 0.5) {
          const yProgress = self.progress / 0.5;
          gsap.set(servicesHeaders[0], { y: `${yProgress * 100}%` });
          gsap.set(servicesHeaders[2], { y: `${yProgress * -100}%` });
          
          // 前50%保持大尺寸（scale: 1.5）
          servicesHeaders.forEach((header) => gsap.set(header, { scale: 1.5 }));
        } else {
          gsap.set(servicesHeaders[0], { y: "100%" });
          gsap.set(servicesHeaders[2], { y: "-100%" });
          
          // 后50%从1.5缩放到最小尺寸
          const scaleProgress = (self.progress - 0.5) / 0.5;
          const minScale = window.innerWidth < 1000 ? 0.6 : 0.5;
          const scale = 1.5 - scaleProgress * (1.5 - minScale);
          
          servicesHeaders.forEach((header) => gsap.set(header, { scale }));
        }
      },
    });
  }

  // ============================================
  // Project A2: Phive Text Scroll Animation (完整版本)
  // ============================================
  
  // A2: 准备 header 文字拆分动画（如果需要 SplitText 效果，需要单独引入 GSAP SplitText 插件）
  const a2Header = document.querySelector(".project-a2 .header h1");
  
  const a2TargetScales = [0, 0, 0];

  // A2: 计算动态缩放比例
  function calculateDynamicScaleA2() {
    for (let i = 1; i <= 3; i++) {
      const section = document.querySelector(`.project-a2 .sticky-text-${i}`);
      const text = document.querySelector(`.project-a2 .sticky-text-${i} .text-container h1`);
      if (!section || !text) continue;

      const sectionHeight = section.offsetHeight;
      const textHeight = text.offsetHeight;
      if (textHeight > 0) {
        a2TargetScales[i - 1] = sectionHeight / textHeight;
      }
    }
  }
  calculateDynamicScaleA2();

  // A2: 优化的 resize 处理（使用防抖 + RAF）
  let a2ResizeTimeout = null;
  let a2ResizeRaf = null;
  
  window.addEventListener("resize", () => {
    // 清除之前的定时器
    if (a2ResizeTimeout) {
      clearTimeout(a2ResizeTimeout);
    }
    
    // 使用防抖，只在停止 resize 300ms 后执行
    a2ResizeTimeout = setTimeout(() => {
      if (a2ResizeRaf) return;
      a2ResizeRaf = requestAnimationFrame(() => {
        calculateDynamicScaleA2();
        ScrollTrigger.refresh();
        a2ResizeRaf = null;
      });
    }, 300);
  }, { passive: true });

  // A2: Elements and helpers
  const a2TextElement1 = document.querySelector(".project-a2 .sticky-text-1 .text-container h1");
  const a2TextElement2 = document.querySelector(".project-a2 .sticky-text-2 .text-container h1");
  const a2TextElement3 = document.querySelector(".project-a2 .sticky-text-3 .text-container h1");
  const a2TextContainer3 = document.querySelector(".project-a2 .sticky-text-3 .text-container");
  const a2OutroTextBgColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--bg-secondary")
    .trim() || "#F4E4C1";

  function setScaleYA2(element, scale) {
    if (!element) return;
    const s = Math.max(0.0001, scale || 0);
    element.style.transform = `scaleY(${s})`;
    element.style.transformOrigin = "50% 0%";
  }

  // A2: 确保初始状态
  setScaleYA2(a2TextElement1, 0.0001);
  setScaleYA2(a2TextElement2, 0.0001);
  setScaleYA2(a2TextElement3, 0.0001);

  // A2: sticky-text-1 - 接近动画
  ScrollTrigger.create({
    trigger: ".project-a2 .sticky-text-1",
    start: "top bottom",
    end: "top top",
    scrub: 1,
    onUpdate: (self) => {
      const currentScale = (a2TargetScales[0] || 0) * self.progress;
      setScaleYA2(a2TextElement1, currentScale);
    },
  });

  // A2: sticky-text-1 - 固定和缩小动画
  ScrollTrigger.create({
    trigger: ".project-a2 .sticky-text-1",
    start: "top top",
    end: () => `+=${window.innerHeight * 1}px`,
    pin: true,
    pinSpacing: false,
    scrub: 1,
    onUpdate: (self) => {
      const currentScale = (a2TargetScales[0] || 0) * (1 - self.progress);
      setScaleYA2(a2TextElement1, currentScale);
    },
  });

  // A2: sticky-text-2 - 接近动画
  ScrollTrigger.create({
    trigger: ".project-a2 .sticky-text-2",
    start: "top bottom",
    end: "top top",
    scrub: 1,
    onUpdate: (self) => {
      const currentScale = (a2TargetScales[1] || 0) * self.progress;
      setScaleYA2(a2TextElement2, currentScale);
    },
  });

  // A2: sticky-text-2 - 固定和缩小动画
  ScrollTrigger.create({
    trigger: ".project-a2 .sticky-text-2",
    start: "top top",
    end: () => `+=${window.innerHeight * 1}px`,
    pin: true,
    pinSpacing: false,
    scrub: 1,
    onUpdate: (self) => {
      const currentScale = (a2TargetScales[1] || 0) * (1 - self.progress);
      setScaleYA2(a2TextElement2, currentScale);
    },
  });

  // A2: sticky-text-3 - 接近动画
  ScrollTrigger.create({
    trigger: ".project-a2 .sticky-text-3",
    start: "top bottom",
    end: "top top",
    scrub: 1,
    onUpdate: (self) => {
      const currentScale = (a2TargetScales[2] || 0) * self.progress;
      setScaleYA2(a2TextElement3, currentScale);
    },
  });

  // A2: sticky-text-3 - 复杂的固定、放大、背景渐隐动画（缓存 DOM 查询）
  const a2HeaderElement = document.querySelector(".project-a2 .header");
  
  ScrollTrigger.create({
    trigger: ".project-a2 .sticky-text-3",
    start: "top top",
    end: () => `+=${window.innerHeight * 4}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;

      if (a2TextContainer3) {
        // 0-75%: 文字放大从 1 倍到 10 倍
        const scaleProgress = Math.min(progress / 0.75, 1);
        const currentScale = 1 + 9 * scaleProgress;
        a2TextContainer3.style.transform = `scale3d(${currentScale}, ${currentScale}, 1)`;

        // 背景渐隐控制（优化逻辑）
        let bgColor;
        if (progress < 0.25) {
          bgColor = a2OutroTextBgColor;
        } else if (progress < 0.5) {
          const fadeProgress = (progress - 0.25) / 0.25;
          const opacity = 1 - fadeProgress;
          bgColor = `rgba(244, 228, 193, ${opacity})`;
        } else {
          bgColor = `rgba(244, 228, 193, 0)`;
        }
        a2TextContainer3.style.backgroundColor = bgColor;
      }

      // 控制 header 小字的显示
      if (a2HeaderElement) {
        let opacity;
        if (progress < 0.5) {
          opacity = 0;
        } else if (progress < 0.75) {
          opacity = (progress - 0.5) / 0.25;
        } else {
          opacity = 1;
        }
        a2HeaderElement.style.opacity = opacity;
      }
    },
  });

  // ============================================
  // Project A3: FAQ - 使用纯CSS Hover效果
  // ============================================
  // FAQ现在使用CSS :hover伪类，无需JavaScript

  // ============================================
  // Final Page: Slide Cover Effect
  // ============================================
  
  const slideCover = document.querySelector(".project-final .slide-cover");
  const aboutSection = document.querySelector(".project-a3");
  
  if (slideCover && aboutSection) {
    ScrollTrigger.create({
      trigger: ".project-a3",
      start: "top top",
      end: () => `+=${window.innerHeight * 1.5}`,
      pin: true,
      pinSpacing: false,
      scrub: 0.5,
      onUpdate: (self) => {
        // 从 100% 滑动到 0%
        const translateY = 100 - (self.progress * 100);
        slideCover.style.transform = `translateY(${translateY}%)`;
        
        // 只有当滑动覆盖层完全显示时才启用pointer-events
        if (self.progress > 0.9) {
          slideCover.classList.add('active');
        } else {
          slideCover.classList.remove('active');
        }
      },
    });
  }

  console.log("✅ 所有项目的动画已初始化完成！");
});


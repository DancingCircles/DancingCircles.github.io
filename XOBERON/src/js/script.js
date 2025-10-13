import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// 导入 Three.js 初始化（会自动执行）
import './initThree.jsx';
// 导入 Quote 旋转文字初始化
import './initQuote.jsx';
// 导入 Waves 初始化
import './initWaves.jsx';
// 导入自定义鼠标
import { initCustomCursor } from './customCursor.js';
// 导入导航栏
import { initNavbar } from './navbar.js';

document.addEventListener("DOMContentLoaded", () => {
  // 初始化自定义鼠标
  initCustomCursor();
  
  // 初始化导航栏
  initNavbar();
  
  // 注册 GSAP 插件
  gsap.registerPlugin(ScrollTrigger);

  // 初始化 Lenis 平滑滚动（所有项目共用）
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);

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
    const track = document.getElementById('marquee-track');

    if (!container || !track) return;

    // 创建足够多的重复文本以确保无缝循环
    const repetitions = 4; // 增加重复次数确保屏幕始终有文字
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
    const speed = 1; // 像素/帧，从左到右

    // 获取单组文字的宽度
    const getSingleSetWidth = () => {
      // 计算一组文字的总宽度
      let width = 0;
      for (let i = 0; i < marqueeTexts.length; i++) {
        if (allItems[i]) {
          width += allItems[i].offsetWidth;
        }
      }
      return width;
    };

    // 延迟获取宽度，确保元素已渲染
    setTimeout(() => {
      const singleSetWidth = getSingleSetWidth();
      
      // 从负位置开始，让文字从右侧进入
      position = -singleSetWidth;

      // 动画循环
      const animate = () => {
        position += speed;

        // 当移动到0时，重置到起始位置实现无缝循环
        if (position >= 0) {
          position = -singleSetWidth;
        }

        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
      };

      // 启动动画
      animate();
    }, 100);
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
  ScrollTrigger.create({
    trigger: ".project-a1 .services-copy",
    start: "top 80%",
    end: "top 20%",
    scrub: 1,
    onUpdate: (self) => {
      const section = document.querySelector(".project-a1 .services-copy");
      if (section) {
        section.style.opacity = self.progress;
      }
    },
  });

  // A1: WHOAMI 动画 - 滑入
  ScrollTrigger.create({
    trigger: ".project-a1 .services",
    start: "top bottom",
    end: "top top",
    scrub: 1,
    onUpdate: (self) => {
      const headers = document.querySelectorAll(".project-a1 .services-header");
      // 滑入时就设置大尺寸 scale: 1.5
      gsap.set(headers[0], { x: `${100 - self.progress * 100}%`, scale: 1.5 });
      gsap.set(headers[1], { x: `-${100 - self.progress * 100}%`, scale: 1.5 });
      gsap.set(headers[2], { x: `${100 - self.progress * 100}%`, scale: 1.5 });
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
      const headers = document.querySelectorAll(".project-a1 .services-header");

      if (self.progress <= 0.5) {
        const yProgress = self.progress / 0.5;
        gsap.set(headers[0], { y: `${yProgress * 100}%` });
        gsap.set(headers[2], { y: `${yProgress * -100}%` });
        
        // 前50%保持大尺寸（scale: 1.5）
        headers.forEach((header) => gsap.set(header, { scale: 1.5 }));
      } else {
        gsap.set(headers[0], { y: "100%" });
        gsap.set(headers[2], { y: "-100%" });
        
        // 后50%从1.5缩放到最小尺寸
        const scaleProgress = (self.progress - 0.5) / 0.5;
        const minScale = window.innerWidth < 1000 ? 0.6 : 0.5;
        const scale = 1.5 - scaleProgress * (1.5 - minScale);
        
        headers.forEach((header) => gsap.set(header, { scale }));
      }
    },
  });

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

  // A2: 优化的 resize 处理（使用 requestAnimationFrame 节流）
  let a2ResizeRaf = null;
  window.addEventListener("resize", () => {
    if (a2ResizeRaf) return;
    a2ResizeRaf = requestAnimationFrame(() => {
      a2ResizeRaf = null;
      calculateDynamicScaleA2();
      ScrollTrigger.refresh();
    });
  });

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

  // A2: sticky-text-3 - 复杂的固定、放大、背景渐隐动画
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
        // 初始状态
        if (progress === 0) {
          a2TextContainer3.style.backgroundColor = a2OutroTextBgColor;
          a2TextContainer3.style.opacity = 1;
        }

        // 0-75%: 文字放大从 1 倍到 10 倍
        if (progress <= 0.75) {
          const scaleProgress = progress / 0.75;
          const currentScale = 1 + 9 * scaleProgress;
          a2TextContainer3.style.transform = `scale3d(${currentScale}, ${currentScale}, 1)`;
        } else {
          a2TextContainer3.style.transform = "scale3d(10, 10, 1)";
        }

        // 背景渐隐控制
        if (progress < 0.25) {
          // 0-25%: 保持黑色背景
          a2TextContainer3.style.backgroundColor = a2OutroTextBgColor;
          a2TextContainer3.style.opacity = 1;
        } else if (progress >= 0.25 && progress < 0.5) {
          // 25%-50%: 背景渐隐
          const fadeProgress = (progress - 0.25) / 0.25;
          const opacity = 1 - fadeProgress;
          a2TextContainer3.style.backgroundColor = `rgba(244, 228, 193, ${opacity})`;
        } else if (progress >= 0.5) {
          // 50%+: 背景完全透明
          a2TextContainer3.style.backgroundColor = `rgba(244, 228, 193, 0)`;
        }
      }

      // 控制 header 小字的显示：在背景完全透明、图片完全显示后才出现
      const a2HeaderElement = document.querySelector(".project-a2 .header");
      if (a2HeaderElement) {
        if (progress < 0.5) {
          // 背景还在淡出中，小字保持不可见
          a2HeaderElement.style.opacity = 0;
        } else if (progress >= 0.5 && progress < 0.75) {
          // 背景已完全透明，图片完全显示，小字逐渐出现
          const fadeProgress = (progress - 0.5) / 0.25;
          const opacity = Math.max(0, Math.min(1, fadeProgress));
          a2HeaderElement.style.opacity = opacity;
        } else {
          // 完全显示
          a2HeaderElement.style.opacity = 1;
        }
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


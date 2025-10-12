import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", () => {
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
      gsap.set(headers[0], { x: `${100 - self.progress * 100}%` });
      gsap.set(headers[1], { x: `-${100 - self.progress * 100}%` });
      gsap.set(headers[2], { x: `${100 - self.progress * 100}%` });
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
      } else {
        gsap.set(headers[0], { y: "100%" });
        gsap.set(headers[2], { y: "-100%" });
      }

      const scaleProgress = (self.progress - 0.5) / 0.5;
      const minScale = window.innerWidth < 1000 ? 0.3 : 0.1;
      const scale = 1 - scaleProgress * (1 - minScale);

      headers.forEach((header) => gsap.set(header, { scale }));
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
  // Project A3: FAQ Accordion
  // ============================================
  
  const faqItems = document.querySelectorAll(".project-a3 .faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-q");
    const answer = item.querySelector(".faq-a");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // 关闭所有其他的 FAQ 项
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("open");
          const otherAnswer = otherItem.querySelector(".faq-a");
          otherAnswer.style.maxHeight = "0";
        }
      });

      // 切换当前项
      if (isOpen) {
        item.classList.remove("open");
        answer.style.maxHeight = "0";
      } else {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  console.log("✅ 所有三个项目的动画已初始化完成！");
});


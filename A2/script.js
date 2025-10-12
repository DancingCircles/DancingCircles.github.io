// Using GSAP, ScrollTrigger, and Lenis from CDN globals.
// SplitText may not be available (paid plugin); guard its usage.

document.addEventListener("DOMContentLoaded", () => {
  const gs = window.gsap;
  const ST = window.ScrollTrigger;
  const LenisGlobal = window.Lenis;
  const SplitTextGlobal = window.SplitText;

  if (gs && ST) {
    // Only register SplitText if available
    if (SplitTextGlobal) {
      gs.registerPlugin(ST, SplitTextGlobal);
    } else {
      gs.registerPlugin(ST);
    }
  }

  const lenis = LenisGlobal ? new LenisGlobal() : null;
  if (lenis && ST) {
    lenis.on("scroll", ST.update);
  }

  if (gs && lenis) {
    gs.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
  }

  if (gs) gs.ticker.lagSmoothing(0);

  const header = document.querySelector(".header h1");

  let headerSplit = null;
  if (header && SplitTextGlobal && gs) {
    headerSplit = new SplitTextGlobal(header, {
      type: "words",
      wordsClass: "spotlight-word",
    });
    if (headerSplit.words && headerSplit.words.length) {
      gs.set(headerSplit.words, { opacity: 0 });
    }
  }

  const targetScales = [0, 0, 0];

  function calculateDynamicScale() {
    for (let i = 1; i <= 3; i++) {
      const section = document.querySelector(`.sticky-text-${i}`);
      const text = document.querySelector(`.sticky-text-${i} .text-container h1`);
      if (!section || !text) continue;

      const sectionHeight = section.offsetHeight;
      const textHeight = text.offsetHeight;
      if (textHeight > 0) {
        targetScales[i - 1] = sectionHeight / textHeight;
      }
    }
  }
  calculateDynamicScale();

  // Throttle resize recalculation
  let resizeRaf = null;
  window.addEventListener("resize", () => {
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = null;
      calculateDynamicScale();
      if (ST) ST.refresh();
    });
  });

  // Elements and helpers for original behavior
  const textElement1 = document.querySelector(
    ".sticky-text-1 .text-container h1"
  );
  const textElement2 = document.querySelector(
    ".sticky-text-2 .text-container h1"
  );
  const textElement3 = document.querySelector(
    ".sticky-text-3 .text-container h1"
  );
  const textContainer3 = document.querySelector(
    ".sticky-text-3 .text-container"
  );
  const outroTextBgColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--dark")
    .trim();

  function setScaleY(element, scale) {
    if (!element) return;
    const s = Math.max(0.0001, scale || 0);
    element.style.transform = `scaleY(${s})`;
    element.style.transformOrigin = "50% 0%";
  }

  // Ensure initial state
  setScaleY(textElement1, 0.0001);
  setScaleY(textElement2, 0.0001);
  setScaleY(textElement3, 0.0001);

  if (ST) {
    // sticky-text-1: approach then pin + scale down
    ST.create({
      trigger: ".sticky-text-1",
      start: "top bottom",
      end: "top top",
      scrub: 1,
      onUpdate: (self) => {
        const currentScale = (targetScales[0] || 0) * self.progress;
        setScaleY(textElement1, currentScale);
      },
    });

    ST.create({
      trigger: ".sticky-text-1",
      start: "top top",
      end: () => `${window.innerHeight * 1}px`,
      pin: true,
      pinSpacing: false,
      scrub: 1,
      onUpdate: (self) => {
        const currentScale = (targetScales[0] || 0) * (1 - self.progress);
        setScaleY(textElement1, currentScale);
      },
    });

    // sticky-text-2: approach then pin + scale down
    ST.create({
      trigger: ".sticky-text-2",
      start: "top bottom",
      end: "top top",
      scrub: 1,
      onUpdate: (self) => {
        const currentScale = (targetScales[1] || 0) * self.progress;
        setScaleY(textElement2, currentScale);
      },
    });

    ST.create({
      trigger: ".sticky-text-2",
      start: "top top",
      end: () => `${window.innerHeight * 1}px`,
      pin: true,
      pinSpacing: false,
      scrub: 1,
      onUpdate: (self) => {
        const currentScale = (targetScales[1] || 0) * (1 - self.progress);
        setScaleY(textElement2, currentScale);
      },
    });

    // sticky-text-3: approach then pin with complex bg + zoom
    ST.create({
      trigger: ".sticky-text-3",
      start: "top bottom",
      end: "top top",
      scrub: 1,
      onUpdate: (self) => {
        const currentScale = (targetScales[2] || 0) * self.progress;
        setScaleY(textElement3, currentScale);
      },
    });

    ST.create({
      trigger: ".sticky-text-3",
      start: "top top",
      end: () => `${window.innerHeight * 4}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        if (textContainer3) {
          if (progress === 0) {
            textContainer3.style.backgroundColor = outroTextBgColor;
            textContainer3.style.opacity = 1;
          }

          if (progress <= 0.75) {
            const scaleProgress = progress / 0.75;
            const currentScale = 1 + 9 * scaleProgress;
            textContainer3.style.transform = `scale3d(${currentScale}, ${currentScale}, 1)`;
          } else {
            textContainer3.style.transform = "scale3d(10, 10, 1)";
          }

          if (progress < 0.25) {
            textContainer3.style.backgroundColor = outroTextBgColor;
            textContainer3.style.opacity = 1;
          } else if (progress >= 0.25 && progress < 0.5) {
            const fadeProgress = (progress - 0.25) / 0.25;
            const bgOpacity = Math.max(0, Math.min(1, 1 - fadeProgress));
            textContainer3.style.backgroundColor = outroTextBgColor.replace("1)", `${bgOpacity})`);
          } else if (progress > 0.5) {
            textContainer3.style.backgroundColor = outroTextBgColor.replace("1)", "0)");
          }
        }

        // 控制 header 小字的显示：在背景完全透明、图片完全显示后才出现
        const headerElement = document.querySelector(".header");
        if (headerElement) {
          if (progress < 0.5) {
            // 背景还在淡出中，小字保持不可见
            headerElement.style.opacity = 0;
          } else if (progress >= 0.5 && progress < 0.75) {
            // 背景已完全透明，图片完全显示，小字逐渐出现
            const fadeProgress = (progress - 0.5) / 0.25;
            const opacity = Math.max(0, Math.min(1, fadeProgress));
            headerElement.style.opacity = opacity;
          } else {
            // 完全显示
            headerElement.style.opacity = 1;
          }
        }
      },
    });
  }



});

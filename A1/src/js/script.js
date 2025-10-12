import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll(".animate-text").forEach((textElement) => {
    textElement.setAttribute("data-text", textElement.textContent.trim());

    ScrollTrigger.create({
      trigger: textElement,
      start: "top 50%",
      end: "bottom 50%",
      scrub: 1,
      onUpdate: (self) => {
        const clipValue = Math.max(0, 100 - self.progress * 100);
        textElement.style.setProperty("--clip-value", `${clipValue}%`);
      },
    });
  });

  // WHOAMI 动画
  ScrollTrigger.create({
    trigger: ".services",
    start: "top bottom",
    end: "top top",
    scrub: 1,
    onUpdate: (self) => {
      const headers = document.querySelectorAll(".services-header");
      gsap.set(headers[0], { x: `${100 - self.progress * 100}%` });
      gsap.set(headers[1], { x: `-${100 - self.progress * 100}%` });
      gsap.set(headers[2], { x: `${100 - self.progress * 100}%` });
    },
  });

  ScrollTrigger.create({
    trigger: ".services",
    start: "top top",
    end: `+=${window.innerHeight * 2}`,
    pin: true,
    scrub: 1,
    pinSpacing: false,
    onUpdate: (self) => {
      const headers = document.querySelectorAll(".services-header");

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
});

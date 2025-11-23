import { useEffect, useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
    const lenisRef = useRef(null);

    useLayoutEffect(() => {
        // 初始化 Lenis
        const lenis = new Lenis({
            duration: 1.2, // 滚动持续时间，值越大越平滑
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 缓动函数
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1, // 鼠标滚轮灵敏度
            smoothTouch: false, // 移动端通常使用原生滚动体验更好
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;
        
        // 将lenis实例挂载到window，供其他组件使用
        window.lenis = lenis;

        // 将 Lenis 的滚动事件同步给 ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // 将 GSAP 的 ticker 接管 Lenis 的 requestAnimationFrame
        // 这样可以保证动画和滚动完全同步，不会抖动
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // 关闭 GSAP ticker 的默认滞后平滑，以获得更即时的响应
        gsap.ticker.lagSmoothing(0);

        return () => {
            // 清理
            lenis.destroy();
            window.lenis = null;
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
        };
    }, []);

    return <div className="smooth-wrapper">{children}</div>;
};

export default SmoothScroll;

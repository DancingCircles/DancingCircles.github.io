// 全局导航栏 - 滚动检测与跳转
export function initNavbar() {
  const navbar = document.querySelector('.global-navbar');
  if (!navbar) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  // 滚动方向检测
  function updateNavbar() {
    const currentScrollY = window.scrollY;
    
    // 在页面顶部时始终显示
    if (currentScrollY < 100) {
      navbar.classList.remove('hidden');
    } 
    // 向下滚动时隐藏
    else if (currentScrollY > lastScrollY && currentScrollY > 200) {
      navbar.classList.add('hidden');
    } 
    // 向上滚动时显示
    else if (currentScrollY < lastScrollY) {
      navbar.classList.remove('hidden');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  }

  // 使用 requestAnimationFrame 优化性能
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // 平滑滚动跳转
  function setupSmoothScroll() {
    const links = navbar.querySelectorAll('.navbar-pill a');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const href = link.getAttribute('href');
        
        // 立即执行跳转，不受导航栏状态影响
        performScroll(href);
      });
    });
  }
  
  // 执行滚动函数
  function performScroll(href) {
    // 回到顶部
    if (href === '#' || href === '#home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    // 跳转到指定section
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      let targetSection = document.querySelector(`[data-project="${targetId}"]`);
      
      if (targetSection) {
        let targetElement = targetSection;
        
        // 特殊处理：对于a1页面，定位到3D模型区域
        if (targetId === 'a1') {
          const threeContainer = targetSection.querySelector('#three-container');
          if (threeContainer) {
            targetElement = threeContainer.parentElement; // services-copy section
          }
        }
        
        // 获取元素顶部位置（使用原生offsetTop更稳定）
        let targetPosition = 0;
        let element = targetElement;
        
        while (element) {
          targetPosition += element.offsetTop;
          element = element.offsetParent;
        }
        
        // 对于a1页面，稍微向上偏移一点，避免超过
        if (targetId === 'a1') {
          targetPosition -= 230; // 向上偏移230px
        }
        
        // 对于final页面，需要额外滚动到实际内容区域
        if (targetId === 'final') {
          // 获取视口高度，滚动到倒数第二页的底部触发final页面动画
          const viewportHeight = window.innerHeight;
          targetPosition = document.documentElement.scrollHeight - viewportHeight;
        }
        
        // 平滑滚动到目标位置
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }

  setupSmoothScroll();

  console.log('✅ 导航栏已初始化');
}


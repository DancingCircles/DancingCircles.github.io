import React from 'react';
import ReactDOM from 'react-dom/client';
import Waves from '../components/Waves.jsx';

// 初始化 Waves 组件
const wavesContainer = document.getElementById('waves-container');

if (wavesContainer) {
  const root = ReactDOM.createRoot(wavesContainer);
  root.render(
    <Waves
      lineColor="#E85D3F"
      backgroundColor="transparent"
      waveSpeedX={0.02}
      waveSpeedY={0.01}
      waveAmpX={40}
      waveAmpY={20}
      friction={0.9}
      tension={0.01}
      maxCursorMove={120}
      xGap={12}
      yGap={36}
    />
  );
}


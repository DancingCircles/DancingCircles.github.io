import React from 'react';
import { createRoot } from 'react-dom/client';
import { X1Scene } from './X1Scene';

function mountX1() {
  const container = document.getElementById('x1-container');
  if (container && !container.__x1Mounted) {
    const root = createRoot(container);
    root.render(<X1Scene />);
    container.__x1Mounted = true;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountX1);
} else {
  mountX1();
}



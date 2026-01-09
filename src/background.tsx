import React from 'react';
import { createRoot } from 'react-dom/client';
import LiquidEther from './components/LiquidEther.jsx';

// Background Component - alleen voor de achtergrond animatie
function Background() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: -1,
      pointerEvents: 'none' 
    }}>
      <LiquidEther
        mouseForce={15}
        cursorSize={80}
        colors={['#252525', '#404040', '#606060']} //gray tones from palette
        autoDemo={true}
        autoSpeed={0.3}
        autoIntensity={1.5}
        resolution={0.6}
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
}

// Initialize the background when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Create background container
  const backgroundDiv = document.createElement('div');
  backgroundDiv.id = 'react-background';
  document.body.appendChild(backgroundDiv);
  
  // Render the React background
  const root = createRoot(backgroundDiv);
  root.render(<Background />);
});

export default Background;
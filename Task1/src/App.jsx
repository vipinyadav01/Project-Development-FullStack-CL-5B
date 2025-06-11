import { useState, useEffect, useRef } from 'react';
import './App.css';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(null);
  const animationRef = useRef(null);
  
  useEffect(() => {
    startTimeRef.current = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      const duration = 2000;
      
      const newProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(newProgress);
      
  // Continue the animation until progress reaches 100%
      if (newProgress < 100) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    // Clean up animation on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return (
    <div className="bar-bg">
      <div 
        className="bar-fg" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

const ProgressBars = () => {
  const [bars, setBars] = useState([]);
  const nextIdRef = useRef(0);
  
  const handleAdd = () => {
    const newId = nextIdRef.current++;
    setBars(prevBars => [...prevBars, { id: newId }]);
  };
  
  return (
    <div className="container">
      <button className="add-btn" onClick={handleAdd}>Add</button>
      <div className="bars">
        {bars.map(bar => (
          <ProgressBar key={bar.id} />
        ))}
      </div>
    </div>
  );
};

export default ProgressBars;
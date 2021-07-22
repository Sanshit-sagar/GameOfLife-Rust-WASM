import {useEffect, useRef, useState} from "react";
import { useIsSsr } from './useIsSsr'

export const useFps = (windowWidth: number) => {
  const isSsr = useIsSsr();
  
  const lastFpsValues = useRef<number[]>([]);
  const [fps, setFps] = useState<number[]>([]);
  const prevTime = isSsr ? null : useRef(window.performance.now());
  const frames = useRef(0);
  const animRef = useRef(0);

  const calcFps = () => {
    const t = isSsr ? null : window.performance.now();
    frames.current += 1;

    if (!isSsr && prevTime && t && t > prevTime.current + 1000) {
      const elapsedTime = t - prevTime.current;
      const currentFps = Math.round((frames.current * 1000) / elapsedTime);
      lastFpsValues.current = lastFpsValues.current.concat(currentFps);
      
      if (elapsedTime > 1500) {
        for (let i = 1; i <= (elapsedTime - 1000) / 1000; i++) {
          lastFpsValues.current = lastFpsValues.current.concat(0);
        }
      }

      lastFpsValues.current = lastFpsValues.current.slice(Math.max(lastFpsValues.current.length - windowWidth, 0));
      setFps(lastFpsValues.current);
      frames.current = 0;
      prevTime.current = window.performance.now();
    }
    animRef.current = requestAnimationFrame(calcFps);
  };

  useEffect(() => {
    animRef.current = requestAnimationFrame(calcFps);
    return () => {
      cancelAnimationFrame(animRef.current);
    }
  }, []);

  const avgFps = (fps.reduce((a,b) => a + b, 0) / fps.length).toFixed(2);
  const maxFps = Math.max.apply(Math.max, fps);
  const minFps = Math.min.apply(Math.min, fps);
  const currentFps = fps[fps.length - 1];

  return {fps, avgFps, maxFps, minFps, currentFps, lastFpsValues};
}
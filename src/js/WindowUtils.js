import { useState, useEffect } from 'react';

export const mobile_max_width = 599;

export const tablet_max_width = 839;


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export function isMobileMode(windowDimensions){
  return windowDimensions.width <= mobile_max_width;
}

export function isTabletMode(windowDimensions){
  return windowDimensions.width > mobile_max_width && windowDimensions.width < tablet_max_width;
}
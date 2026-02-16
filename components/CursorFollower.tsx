
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CursorFollower: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useSpring(0, { damping: 20, stiffness: 200 });
  const mouseY = useSpring(0, { damping: 20, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.getAttribute('role') === 'button' ||
        target.closest('button') ||
        target.closest('a');
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-blue-500/50 pointer-events-none z-[100] hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-blue-500 rounded-full pointer-events-none z-[101] hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
};

export default CursorFollower;

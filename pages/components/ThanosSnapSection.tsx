// components/ThanosSnapSection.tsx
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { easeInOut } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function ThanosSnapSection({ children, className }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-20% 0px' });
  const controls = useAnimation();
  

  useEffect(() => {
    if (!inView) {
      controls.start('snapOut');
    } else {
      controls.start('visible');
    }
  }, [inView, controls]);

 const variants = {
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: easeInOut, // ⬅️ ini tipe yang valid
    },
  },
  snapOut: {
    opacity: 0,
    filter: 'blur(8px)',
    transition: {
      duration: 1.5,
      ease: easeInOut, // ⬅️ jangan string 'easeInOut'
    },
  },
};

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="visible"
      animate={controls}
    >
      {children}
    </motion.div>
  );
}

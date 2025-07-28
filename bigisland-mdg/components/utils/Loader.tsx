'use client';

import { motion } from 'framer-motion';

interface LoaderProps {
  size?: number;
  color?: string;
  speed?: number;
  lineType?: 'solid' | 'dashed';
  bgColor?: string;
}

export default function Loader({
  size = 70,
  color = '#3b82f6', // blue-500
  speed = 1.5,
  lineType = 'solid',
  bgColor = 'white'
}: LoaderProps) {
  const loaderVariants = {
    start: {
      rotate: 0,
      opacity: 0.7
    },
    end: {
      rotate: 360,
      opacity: 1,
      transition: {
        rotate: {
          repeat: Infinity,
          ease: "linear",
          duration: speed
        },
        opacity: {
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
          duration: speed * 0.5
        }
      }
    }
  };

  const pathVariants = {
    start: {
      pathLength: 0.1,
      opacity: 0.5
    },
    end: {
      pathLength: 0.8,
      opacity: 1,
      transition: {
        pathLength: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: speed * 0.8,
          ease: "easeInOut"
        },
        opacity: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: speed * 0.8
        }
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      <motion.div
        initial="start"
        animate="end"
        variants={loaderVariants}
        style={{
          width: size,
          height: size,
          position: 'relative'
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 4}
            stroke={color}
            strokeWidth={4}
            strokeDasharray={lineType === 'dashed' ? '10, 5' : 'none'}
            strokeLinecap="round"
            variants={pathVariants}
          />
        </svg>
        
        {/* Point accentué pour mieux voir la rotation */}
        <motion.div
          style={{
            position: 'absolute',
            top: 2,
            left: '50%',
            width: 6,
            height: 6,
            backgroundColor: color,
            borderRadius: '50%',
            transform: 'translateX(-50%)'
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            repeat: Infinity,
            duration: speed * 0.5,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
}
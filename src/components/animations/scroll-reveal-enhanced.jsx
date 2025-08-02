import React, { useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, useInView } from "framer-motion";

export function ScrollRevealEnhanced({
  children,
  width = "fit-content",
  delay = 0,
  direction = "up",
  duration = 0.6,
  className = "",
  threshold = 0.1,
  once = true,
  stagger = 0,
  justify = "center",
  fullWidth = false, // 👈 NEW prop to disable flex wrapper
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, isInView, once]);

  const getVariants = () => {
    const baseTransition = {
      duration,
      delay: delay + stagger,
      ease: [0.25, 0.46, 0.45, 0.94],
    };

    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: 60, scale: 0.95 },
          visible: { opacity: 1, y: 0, scale: 1, transition: baseTransition },
        };
      case "down":
        return {
          hidden: { opacity: 0, y: -60, scale: 0.95 },
          visible: { opacity: 1, y: 0, scale: 1, transition: baseTransition },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: 60, scale: 0.95 },
          visible: { opacity: 1, x: 0, scale: 1, transition: baseTransition },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -60, scale: 0.95 },
          visible: { opacity: 1, x: 0, scale: 1, transition: baseTransition },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: baseTransition },
        };
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: baseTransition },
        };
      default:
        return {
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0, transition: baseTransition },
        };
    }
  };

  const motionContent = (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={getVariants()}
      style={{ width, transformOrigin: "center" }}
      className={`text-left ${className}`}
    >
      {children}
    </motion.div>
  );

  if (fullWidth) return motionContent;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: justify,
        width: "100%",
      }}
    >
      {motionContent}
    </div>
  );
}

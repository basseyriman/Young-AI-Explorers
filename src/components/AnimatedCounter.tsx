"use client";

import { motion, useInView, useSpring, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
}

export function AnimatedCounter({ value, suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  useMotionValueEvent(springValue, "change", (latest) => {
    setDisplay(Math.floor(latest));
  });

  return (
    <span ref={ref} className="tabular-nums">
      {display}{suffix}
    </span>
  );
}

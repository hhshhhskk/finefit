import {
  useMotionValue,
  motion,
  animate,
  useInView,
  useMotionValueEvent,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

type CounterProps = {
  target: number;
};

export function Counter({ target }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const count = useMotionValue(0);
  const [displayNumber, setDisplayNumber] = useState(0);

  // motionValue가 바뀔 때마다 리렌더될 수 있도록 감지
  useMotionValueEvent(count, "change", (latest) => {
    setDisplayNumber(Math.round(latest));
  });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(count, target, {
      duration: 2,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [isInView, target]);

  return <motion.pre ref={ref}>{displayNumber}</motion.pre>;
}

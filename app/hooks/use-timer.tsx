import { useEffect, useRef, useState } from "react";

export default function useTimer(initialTime: number, delay = 1000) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (isRunning && intervalIdRef.current === undefined) {
      intervalIdRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime === 0) setIsRunning(false);
          return newTime;
        });
      }, delay);
    }

    return () => {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = undefined;
    };
  }, [isRunning, delay]);

  return {
    time,
    isRunning,
    start() {
      if (time > 0 && !isRunning) setIsRunning(true);
    },
    reset() {
      if (isRunning) setIsRunning(false);
      setTime(initialTime);
    },
  };
}

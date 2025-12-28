import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";
import { motion } from "framer-motion";
import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

// acceptance criteria:
// Clicking the “Play” button should start a long-running process which increments the timeElapsed value by 1 every second, like a stopwatch.
// The selectedColor should be calculated using the timeElapsed. It's shown as a black rectangle around 1 of the colors, and it should cycle through the 3 colors as shown in the GIF above.
// When the stopwatch is running, the “Play” button should switch to a “Pause” button, using the Pause icon. Clicking the “Pause” button should stop the timer.
// Clicking the “Reset” button should stop the timer, and reset the timeElapsed to 0.
// A layout animation should be used on the selectedColor outline, causing it to glide smoothly between the 3 colors.
// Like all layout animations, this should be disabled if the user has enabled the “Reduce motion” setting.

function CircularColorsDemo() {
  const id = React.useId();
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  const colorsIndex = timeElapsed % COLORS.length;
  const selectedColor = COLORS[colorsIndex];

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  React.useEffect(() => {
    if (!isTimerRunning) {
      return;
    }

    let intervalId = setInterval(() => {
      setTimeElapsed((currentTimeElapsed) => currentTimeElapsed + 1);
    }, [1000]);

    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerRunning]);

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeElapsed(0);
  };

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={`${id}-selectedColorOutline`}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={toggleTimer}>
            {isTimerRunning ? <Pause /> : <Play />}
            <VisuallyHidden>{isTimerRunning ? "Pause" : "Play"}</VisuallyHidden>
          </button>
          <button onClick={resetTimer}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;

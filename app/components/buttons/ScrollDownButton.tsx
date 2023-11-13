'use client'

import {animated, easings, useSpring} from "@react-spring/web";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import styles from './ScrollDownButton.module.css';

interface Props {
  scrollToId: string;
}

export function ScrollDownButton({ scrollToId }: Props) {
  const chevronDownAnim = useSpring(
    {
      from: {
        bottom: "0%"
      },
      to: [
        {
          bottom: "2%"
        },
        {
          bottom: "0%"
        }
      ],
      config: {
        easing: easings.easeInOutCubic,
        duration: 3000,
      },
      loop: true
    }
  )

  function onButtonClick() {
    let element = document.getElementById(scrollToId);
    element && element.scrollIntoView({ behavior: "smooth", block: "start"});
  }

  return (
    <animated.div style={{position: "absolute", left: 0, right: 0, marginRight: "auto", marginLeft: "auto", marginBottom: "20px", width: "20px", ...chevronDownAnim}}>
      <button onClick={onButtonClick} className={styles.scrollDownButton}>
        <ArrowDownwardIcon fontSize="large" />
      </button>
    </animated.div>
  )
}
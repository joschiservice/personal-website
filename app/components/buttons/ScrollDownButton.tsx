'use client'

import { motion } from 'framer-motion';
import { MdArrowDownward } from 'react-icons/md';
import styles from './ScrollDownButton.module.css';

interface Props {
  scrollToId: string;
}

export function ScrollDownButton({ scrollToId }: Props) {
  function onButtonClick() {
    let element = document.getElementById(scrollToId);
    element && element.scrollIntoView({ behavior: "smooth", block: "start"});
  }

  return (
    <motion.div
      style={{ position: 'absolute', left: 0, right: 0, bottom: 0, marginRight: 'auto', marginLeft: 'auto', marginBottom: '20px', width: '20px', willChange: 'transform' }}
      initial={{ y: '0vh' }}
      animate={{ y: ['0vh', '-2vh', '0vh'] }}
      transition={{ duration: 4, ease: [0.645, 0.045, 0.355, 1.0], repeat: Infinity, repeatType: 'loop' }}
    >
      <motion.button
        onClick={onButtonClick}
        className={styles.scrollDownButton}
        aria-label="Scroll down"
        whileHover={{ scale: 1.1, y: -4, opacity: 1 }}
        whileTap={{ scale: 0.96, y: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <MdArrowDownward className="h-8 w-8" />
      </motion.button>
    </motion.div>
  )
}
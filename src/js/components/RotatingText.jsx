import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RotatingText({
  texts = [],
  mainClassName = '',
  staggerFrom = 'first',
  initial = { y: '100%' },
  animate = { y: 0 },
  exit = { y: '-120%' },
  staggerDuration = 0.025,
  splitLevelClassName = '',
  transition = { type: 'spring', damping: 30, stiffness: 400 },
  rotationInterval = 2000,
}) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  const splitIntoCharacters = (text) => {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' })
      return Array.from(segmenter.segment(text), (segment) => segment.segment)
    }
    return Array.from(text)
  }

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex]
    const words = currentText.split(' ')
    return words.map((word, i) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== words.length - 1,
    }))
  }, [texts, currentTextIndex])

  const getStaggerDelay = useCallback(
    (index, totalChars) => {
      const total = totalChars
      if (staggerFrom === 'first') return index * staggerDuration
      if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration
      if (staggerFrom === 'center') {
        const center = Math.floor(total / 2)
        return Math.abs(center - index) * staggerDuration
      }
      return Math.abs(staggerFrom - index) * staggerDuration
    },
    [staggerFrom, staggerDuration]
  )

  const next = useCallback(() => {
    setCurrentTextIndex((prev) => (prev + 1) % texts.length)
  }, [texts.length])

  useEffect(() => {
    const intervalId = setInterval(next, rotationInterval)
    return () => clearInterval(intervalId)
  }, [next, rotationInterval])

  return (
    <motion.span className={mainClassName} layout transition={transition}>
      <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={currentTextIndex} className="text-rotate" layout aria-hidden="true">
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array
              .slice(0, wordIndex)
              .reduce((sum, word) => sum + word.characters.length, 0)
            return (
              <span key={wordIndex} className="text-rotate-word">
                {wordObj.characters.map((char, charIndex) => (
                  <span key={charIndex} className={splitLevelClassName}>
                    <motion.span
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(
                          previousCharsCount + charIndex,
                          array.reduce((sum, word) => sum + word.characters.length, 0)
                        ),
                      }}
                      className="text-rotate-element"
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
                {wordObj.needsSpace && <span className="text-rotate-space"> </span>}
              </span>
            )
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  )
}


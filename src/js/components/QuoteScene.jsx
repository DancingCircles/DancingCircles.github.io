import React from 'react'
import RotatingText from './RotatingText'

export const QuoteScene = () => {
  return (
    <div className="quote-rotating-wrapper">
      <div className="quote-static-part">
        <h1 className="quote-line">design is not just</h1>
        <h1 className="quote-line">what it looks like.</h1>
        <h1 className="quote-line quote-with-rotate">
          design is{' '}
          <RotatingText
            texts={['function', 'emotion', 'solving', 'beauty']}
            mainClassName="rotating-highlight"
            staggerFrom="last"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName="char-wrapper"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={3000}
          />
        </h1>
      </div>
    </div>
  )
}


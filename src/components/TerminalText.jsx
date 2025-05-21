
import React, { useState, useEffect } from 'react';

const TerminalText = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <div className="terminal">
      <div className="flex items-center gap-2">
        <span className="text-cyber-green">$</span>
        <div className="terminal-text">{displayedText}</div>
        {currentIndex < text.length && <span className="animate-pulse">▋</span>}
      </div>
    </div>
  );
};

export default TerminalText;

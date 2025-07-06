// components/Typewriter.tsx
import React, { useState, useEffect } from 'react';

// Definisi tipe untuk props Typewriter
interface TypewriterProps {
  text?: string; // Opsional jika 'phrases' digunakan
  phrases?: string[]; // Opsional jika 'text' digunakan
  delay?: number;
  eraseDelay?: number;
  pause?: number;
  loop?: boolean;
  onTypingComplete?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, phrases, delay = 150, eraseDelay = 100, pause = 1000, loop = true, onTypingComplete = () => {} }) => {
  const textsToType = phrases && phrases.length > 0 ? phrases : (text ? [text] : ['']); // Pastikan selalu array string

  const [currentText, setCurrentText] = useState<string>('');
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [animationFinished, setAnimationFinished] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout; // Tentukan tipe timer
    const currentPhrase = textsToType[phraseIndex];

    if (animationFinished && !loop) {
      return;
    }

    const handleTyping = () => {
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setCurrentText(prev => prev + currentPhrase.charAt(charIndex));
          setCharIndex(prev => prev + 1);
          timer = setTimeout(handleTyping, delay);
        } else {
          if (loop) {
            timer = setTimeout(() => setIsDeleting(true), pause);
          } else {
            setAnimationFinished(true);
            onTypingComplete();
          }
        }
      } else {
        if (charIndex > 0) {
          setCurrentText(prev => prev.substring(0, prev.length - 1));
          setCharIndex(prev => prev - 1);
          timer = setTimeout(handleTyping, eraseDelay);
        } else {
          if (loop) {
            setIsDeleting(false);
            setPhraseIndex(prev => (prev + 1) % textsToType.length);
            timer = setTimeout(handleTyping, delay);
          }
        }
      }
    };

    timer = setTimeout(handleTyping, delay);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, textsToType, delay, eraseDelay, pause, loop, animationFinished, onTypingComplete]);

  return (
    <>
      {currentText}
      {/* Kursor berkedip hanya jika animasi belum selesai atau sedang looping */}
      {(!animationFinished || loop) && <span className="typing-cursor border-r-2 border-solid border-white animate-blink-caret">|</span>}
    </>
  );
};

export default Typewriter;

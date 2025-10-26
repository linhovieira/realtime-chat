const keyStrokeSounds = [
   new Audio('sounds/keystroke-1.mp3'),
   new Audio('sounds/keystroke-2.mp3'),
   new Audio('sounds/keystroke-3.mp3'),
   new Audio('sounds/keystroke-4.mp3'),
];

function useKeyboardSound() {
   const playRandomKeyStrokeSound = () => {
      const randomSound = keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];
      randomSound.currentTime = 0;
      randomSound.play().catch((error: any) => console.error('Error playing sound:', error));
   };

   return { playRandomKeyStrokeSound }
}

export default useKeyboardSound;
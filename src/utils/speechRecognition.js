function createSpeechRecognition({ onStart, onResult, onError, onEnd }) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.error('Speech Recognition API not supported in this browser.');
    return null;
  }
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  recognition.onstart = onStart;
  recognition.onresult = onResult;
  recognition.onerror = onError;
  recognition.onend = onEnd;
  return recognition;
}

export { createSpeechRecognition };
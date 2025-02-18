import React, { useState, useEffect } from 'react';
import { createSpeechRecognition } from '../utils/speechRecognition';
import Conversation from '../components/Conversation';

export default function GameScreen() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [conversation, setConversation] = useState([]);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const recog = createSpeechRecognition({
      onStart: () => {
        console.log('Voice recognition started.');
      },
      onResult: (event) => {
        const result = event.results[0][0].transcript;
        console.log('Voice recognition result:', result);
        setTranscript(result);
        handleQuestion(result);
      },
      onError: (event) => {
        console.error('Voice recognition error:', event.error);
      },
      onEnd: () => {
        setListening(false);
        console.log('Voice recognition ended.');
      }
    });

    if (recog) {
      setRecognition(recog);
    }
  }, []);

  const startListening = () => {
    if (recognition && !listening) {
      setListening(true);
      setTranscript('');
      recognition.start();
    }
  };

  const handleQuestion = (question) => {
    console.log('User asked:', question);
    const responses = [
      "I swear, I didn't do it!",
      "What are you insinuating?",
      "I was nowhere near the scene of the crime.",
      "Perhaps, but I have nothing to hide."
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    console.log('NPC response:', randomResponse);
    setConversation(prev => [...prev, { question, response: randomResponse }]);
  };

  const resetGame = () => {
    console.log('Game reset initiated');
    setConversation([]);
    setTranscript('');
  };

  return (
    <div className="flex-1 p-4 flex flex-col">
      <h2 className="text-3xl font-bold mb-4 text-center">Detective Mode</h2>
      <Conversation conversation={conversation} />
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={startListening}
          className="cursor-pointer bg-green-600 text-white px-5 py-2 rounded-md shadow-lg hover:bg-green-700 active:opacity-75"
          disabled={listening}
        >
          {listening ? 'Listening...' : 'Ask Question'}
        </button>
        <button
          onClick={resetGame}
          className="cursor-pointer bg-red-600 text-white px-5 py-2 rounded-md shadow-lg hover:bg-red-700 active:opacity-75"
        >
          Reset Conversation
        </button>
      </div>
    </div>
  );
}
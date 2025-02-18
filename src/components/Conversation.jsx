import React from 'react';

function Conversation({ conversation }) {
  return (
    <div className="flex-1 overflow-y-auto mb-4">
      {conversation.map((entry, index) => (
        <div key={index} className="mb-4 p-4 border rounded-md shadow-sm">
          <p className="font-semibold">You: {entry.question}</p>
          <p className="mt-2">Suspect: {entry.response}</p>
        </div>
      ))}
      {conversation.length === 0 && (
        <p className="text-center text-gray-500">
          No conversation yet. Press the button and ask a question!
        </p>
      )}
    </div>
  );
}

export default Conversation;
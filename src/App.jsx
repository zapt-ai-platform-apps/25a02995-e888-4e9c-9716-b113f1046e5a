import React, { useState } from 'react';
import CalculatorScreen from './screens/CalculatorScreen';
import * as Sentry from '@sentry/browser';

export default function App() {
  const [calculatorStarted, setCalculatorStarted] = useState(false);
  const [startButtonDisabled, setStartButtonDisabled] = useState(false);

  const handleStartCalculation = () => {
    if (!startButtonDisabled) {
      console.log('Starting Smart Energy Savings Calculator');
      setStartButtonDisabled(true);
      // Simulate a short delay before showing the calculator
      setTimeout(() => {
        setCalculatorStarted(true);
        setStartButtonDisabled(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen text-gray-900 flex flex-col">
      {!calculatorStarted && (
        <div className="flex-1 flex flex-col justify-center items-center px-4">
          <h1 className="text-5xl font-bold mb-4">Smart Energy Savings Calculator – Solar & Wind Edition</h1>
          <p className="text-lg mb-8 text-center max-w-2xl">
            Estimate your energy savings, cost reductions, and environmental impact when switching to solar and wind energy.
            Input your monthly energy consumption, electricity cost, location details, roof size, and average wind speed to get started.
          </p>
          <button
            onClick={handleStartCalculation}
            className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 active:opacity-75 disabled:opacity-50"
            disabled={startButtonDisabled}
          >
            Start Calculation
          </button>
        </div>
      )}
      {calculatorStarted && <CalculatorScreen />}
      <footer className="p-4 text-center">
        <a href="https://www.zapt.ai" target="_blank" rel="noreferrer" className="text-sm text-blue-600">
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}
import React, { useState } from 'react';
import * as Sentry from '@sentry/browser';
import { calculateSavings } from '../utils/calculateSavings';

const CalculatorScreen = () => {
  const [monthlyConsumption, setMonthlyConsumption] = useState('');
  const [costPerKwh, setCostPerKwh] = useState('');
  const [location, setLocation] = useState('');
  const [roofSize, setRoofSize] = useState('');
  const [averageWindSpeed, setAverageWindSpeed] = useState('');
  const [solarResults, setSolarResults] = useState(null);
  const [windResults, setWindResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    setIsCalculating(true);
    console.log('Calculation initiated with inputs:', {
      monthlyConsumption,
      costPerKwh,
      location,
      roofSize,
      averageWindSpeed,
    });

    try {
      const { solarResults, windResults } = calculateSavings({
        monthlyConsumption,
        costPerKwh,
        location,
        roofSize,
        averageWindSpeed
      });

      setSolarResults(solarResults);
      setWindResults(windResults);
      console.log('Calculation completed successfully');
    } catch (error) {
      console.error('Error during calculation:', error);
      Sentry.captureException(error);
      alert(error.message);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="h-full p-6">
      <h2 className="text-4xl font-bold mb-6 text-center">Energy Savings Calculator</h2>
      <div className="max-w-xl mx-auto space-y-4">
        <div>
          <label className="block font-medium mb-1">Monthly Electricity Consumption (kWh)</label>
          <input
            type="number"
            value={monthlyConsumption}
            onChange={(e) => setMonthlyConsumption(e.target.value)}
            className="box-border w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Electricity Cost per kWh ($)</label>
          <input
            type="number"
            value={costPerKwh}
            onChange={(e) => setCostPerKwh(e.target.value)}
            className="box-border w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="box-border w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Roof Size (sq ft)</label>
          <input
            type="number"
            value={roofSize}
            onChange={(e) => setRoofSize(e.target.value)}
            className="box-border w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Average Wind Speed (mph)</label>
          <input
            type="number"
            value={averageWindSpeed}
            onChange={(e) => setAverageWindSpeed(e.target.value)}
            className="box-border w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleCalculate}
          disabled={isCalculating}
          className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 active:opacity-75 disabled:opacity-50 w-full"
        >
          {isCalculating ? 'Calculating...' : 'Calculate Savings'}
        </button>
      </div>

      {solarResults && windResults && (
        <div className="mt-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-center">Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded">
              <h4 className="text-xl font-semibold mb-2">Solar Energy</h4>
              <p>Panels Needed: {solarResults.panelsNeeded}</p>
              <p>Installation Cost: ${solarResults.installationCost}</p>
              <p>Estimated Monthly Savings: ${solarResults.monthlySavingsSolar}</p>
              <p>Payback Period: {solarResults.solarPaybackMonths} months</p>
            </div>
            <div className="p-4 border rounded">
              <h4 className="text-xl font-semibold mb-2">Wind Energy</h4>
              <p>Turbines Needed: {windResults.turbinesNeeded}</p>
              <p>Total Energy Generation: {windResults.totalWindEnergy} kWh/month</p>
              <p>Installation Cost: ${windResults.windInstallationCost}</p>
              <p>Estimated Monthly Savings: ${windResults.monthlySavingsWind}</p>
              <p>Payback Period: {windResults.windPaybackMonths} months</p>
            </div>
          </div>
          <div className="mt-6 p-4 border rounded">
            <h4 className="text-xl font-semibold mb-2 text-center">Comparison</h4>
            <p className="text-center">
              Switch to renewable energy and significantly reduce your CO₂ emissions while saving money over time. Compare your current electricity costs with the benefits of solar and wind installations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorScreen;
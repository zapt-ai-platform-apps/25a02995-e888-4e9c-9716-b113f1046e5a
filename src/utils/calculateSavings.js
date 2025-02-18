import * as Sentry from '@sentry/browser';

export function calculateSavings({ monthlyConsumption, costPerKwh, location, roofSize, averageWindSpeed }) {
  const consumption = parseFloat(monthlyConsumption);
  const cost = parseFloat(costPerKwh);
  const roof = parseFloat(roofSize);
  const windSpeed = parseFloat(averageWindSpeed);

  if (isNaN(consumption) || isNaN(cost) || isNaN(roof) || isNaN(windSpeed) || !location) {
    throw new Error('Please fill in all fields with valid numbers.');
  }

  const panelsNeeded = Math.ceil(consumption / 300);
  const installationCost = panelsNeeded * 250 + 1000;
  const monthlySavingsSolar = consumption * cost * 0.7;
  const solarPaybackMonths = installationCost / monthlySavingsSolar;
      
  const turbinesNeeded = Math.ceil(windSpeed / 5);
  const windEnergyPerTurbine = windSpeed * 15;
  const totalWindEnergy = turbinesNeeded * windEnergyPerTurbine;
  const windInstallationCost = turbinesNeeded * 5000;
  const monthlySavingsWind = totalWindEnergy * cost * 0.6;
  const windPaybackMonths = windInstallationCost / monthlySavingsWind;

  return {
    solarResults: {
      panelsNeeded,
      installationCost,
      monthlySavingsSolar: monthlySavingsSolar.toFixed(2),
      solarPaybackMonths: solarPaybackMonths.toFixed(1)
    },
    windResults: {
      turbinesNeeded,
      totalWindEnergy: totalWindEnergy.toFixed(2),
      windInstallationCost,
      monthlySavingsWind: monthlySavingsWind.toFixed(2),
      windPaybackMonths: windPaybackMonths.toFixed(1)
    }
  };
}
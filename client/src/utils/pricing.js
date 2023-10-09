// pricing.js

// Function to calculate the transport cost based on distance and weight
const calculatePrice = (distance, weight) => {
    const baseCost = 5000; // Base cost in your currency
    const costPerKilometer = 1000; // Cost per kilometer in your currency
    const weightMultiplier = 0.2; // Adjust this based on your pricing strategy
  
    const distanceCost = distance * costPerKilometer;
    const weightCost = weight * weightMultiplier;
  
    const totalCost = baseCost + distanceCost + weightCost;
  
    return totalCost;
  };
  
  
  export default calculatePrice;
  
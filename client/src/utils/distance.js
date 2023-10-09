// distance.js

// Function to calculate the distance between two sets of coordinates using Haversine formula
const calculateDistance = (coords1, coords2) => {
    const earthRadius = 6371; // Earth's radius in kilometers
    const lat1 = deg2rad(coords1.lat);
    const lon1 = deg2rad(coords1.lng);
    const lat2 = deg2rad(coords2.lat);
    const lon2 = deg2rad(coords2.lng);
  
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = earthRadius * c; // Distance in kilometers
  
    return distance;
  };
  
  // Helper function to convert degrees to radians
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  
  
  export default calculateDistance;
  
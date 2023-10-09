import  NodeGeocoder from "node-geocoder";

// Create a geocoder instance with Nominatim provider
const geocoder = NodeGeocoder({
  provider: "openstreetmap",
});

const geocodeAddress = async (address) => {
  try {
    const result = await geocoder.geocode(address);
    if (result.length > 0) {
      return {
        lat: result[0].latitude,
        lng: result[0].longitude,
      };
    } else {
      throw new Error("Address not found");
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
};

export default geocodeAddress;

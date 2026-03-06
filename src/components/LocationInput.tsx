import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

import "../styles/LocationSelector.css";
import type { GeoAPIfyObject, LocationInputProps } from "../types";

// API key can be acquired for free here: https://myprojects.geoapify.com/
// Example return JSON: https://api.geoapify.com/v1/geocode/search?text=11%20Av.%20de%20la%20Bourdonnais%2C%2075007%20Paris%2C%20France&format=json&apiKey=d548c5ed24604be6a9dd0d989631f783
const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

export function LocationInput({
  attendee,
  handleUpdateLocation,
}: LocationInputProps) {
  function onPlaceSelect(value: GeoAPIfyObject) {
    const placeInfo = value.properties;
    const timezoneInfo = placeInfo.timezone;
    handleUpdateLocation(
      attendee.id,
      placeInfo.city,
      placeInfo.country,
      timezoneInfo.name,
      timezoneInfo.offset_STD,
      timezoneInfo.offset_STD_seconds,
      timezoneInfo.offset_DST,
      timezoneInfo.offset_DST_seconds,
    );
  }

  return (
    <div className="geoapify-container">
      <GeoapifyContext apiKey={apiKey}>
        <GeoapifyGeocoderAutocomplete
          placeholder="Search for a location"
          type="city"
          lang="en"
          addDetails={true}
          limit={5}
          placeSelect={onPlaceSelect}
        />
      </GeoapifyContext>
    </div>
  );
}

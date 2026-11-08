import { memo } from "react";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

import "../styles/LocationSelector.css";
import type { GeoAPIfyObject, LocationInputProps } from "../types";
import { handleUpdateLocation } from "../utils";

// API key can be acquired for free here: https://myprojects.geoapify.com/
// Example return JSON: https://api.geoapify.com/v1/geocode/search?text=11%20Av.%20de%20la%20Bourdonnais%2C%2075007%20Paris%2C%20France&format=json&apiKey=d548c5ed24604be6a9dd0d989631f783
const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

function LocationInputComponent({
  singleAttendee,
  setAttendees,
}: LocationInputProps) {
  function onPlaceSelect(value: GeoAPIfyObject) {
    const placeInfo = value.properties;
    const timezoneInfo = placeInfo.timezone;

    handleUpdateLocation(
      singleAttendee.id,
      placeInfo.city,
      placeInfo.country,
      timezoneInfo.name,
      setAttendees,
    );
  }

  return (
    <label htmlFor="City">
      City
      <div className="geoapify-container">
        <GeoapifyContext apiKey={apiKey}>
          <GeoapifyGeocoderAutocomplete
            placeholder={
              singleAttendee.city
                ? `${singleAttendee.city}, ${singleAttendee.country}`
                : "Search for a city"
            }
            type="city"
            lang="en"
            addDetails={true}
            limit={5}
            placeSelect={onPlaceSelect}
          />
        </GeoapifyContext>
      </div>
    </label>
  );
}

export const LocationInput = memo(
  LocationInputComponent,
  (prevProps, nextProps) => {
    // Only re-render if the attendee id changes, not if other attendee properties change
    return prevProps.singleAttendee.id === nextProps.singleAttendee.id;
  },
);

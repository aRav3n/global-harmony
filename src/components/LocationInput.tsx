import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

import type { LocationInputProps } from "../types";

// Can be acquired for free here: https://myprojects.geoapify.com/
const geoapifyApiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

export function LocationInput({ attendee, handleAttendeeChange }: LocationInputProps) {
  return (
    <input
      type="text"
      placeholder={`City ${attendee.id}`}
      value={attendee.city}
      onChange={(e) =>
        handleAttendeeChange(attendee.id, "city", e.target.value)
      }
      className="city-input"
    />
  );
}

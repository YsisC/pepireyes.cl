import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

type LatLngLiteral = google.maps.LatLngLiteral;
type PlacesProps = {
  setOffice: (position: google.maps.LatLngLiteral) => void;
  fetchDirections: (home: google.maps.LatLngLiteral) => void;
};

export const Places = ({ setOffice, fetchDirections }: PlacesProps) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address: val });
      const { lat, lng } = await getLatLng(results[0]);
      setOffice({ lat, lng });
  
    
    
    } catch (error) {
      // Handle any errors that may occur during geocoding or setting the office
      console.error("Error in handleSelect:", error);
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Ingresa tu direccion"
      />
      <ComboboxPopover>
        <ComboboxList className="combobox">
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                className="combobox-option"
                key={place_id}
                value={description}
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

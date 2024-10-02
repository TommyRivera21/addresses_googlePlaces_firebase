import { useState } from "react";
import { Input, Box, Alert, AlertIcon } from "@chakra-ui/react";
import {
  useJsApiLoader,
  Autocomplete,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import { db } from "../services/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import AnimatedHeading from "./AnimatedHeading";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: -0.0021218123199020318,
  lng: -78.45573309080531,
};

const AddressSearch = () => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [address, setAddress] = useState<string>("");
  const [location, setLocation] = useState<{ lat: number; lng: number }>(
    defaultCenter
  );
  const [mapLoaded, setMapLoaded] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setAddress(place.formatted_address || "");

      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setLocation({ lat, lng });
        saveAddressToFirestore(place.formatted_address || "", lat, lng);
      }
    }
  };

  const saveAddressToFirestore = async (
    selectedAddress: string,
    lat: number,
    lng: number
  ) => {
    try {
      await addDoc(collection(db, "addresses"), {
        address: selectedAddress,
        lat,
        lng,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return isLoaded ? (
    <Box p={5}>
      {/* Componente del título animado */}
      {mapLoaded && <AnimatedHeading />}

      {/* Input de búsqueda con fuente personalizada */}
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <Input placeholder="Busca una dirección" mb={5} />
      </Autocomplete>

      {/* Alerta con la dirección seleccionada */}
      {address && (
        <Alert status="success" mb={5} borderRadius="md">
          <AlertIcon />
          Dirección seleccionada: {address}
        </Alert>
      )}

      {/* Mapa Google */}
      <Box w="100%" h={{ base: "300px", md: "400px" }} mb={5}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={location}
          zoom={17}
          onLoad={handleMapLoad}
        >
          <Marker position={location} />
        </GoogleMap>
      </Box>
    </Box>
  ) : null;
};

export default AddressSearch;

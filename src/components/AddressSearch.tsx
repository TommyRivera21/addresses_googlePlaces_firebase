import { useState } from 'react';
import { Input, Box } from '@chakra-ui/react';
import { useJsApiLoader, Autocomplete, GoogleMap, Marker } from '@react-google-maps/api';
import { db } from '../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};
const defaultCenter = {
  lat: 0,
  lng: -50,
};

const AddressSearch = () => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [address, setAddress] = useState<string>('');
  const [location, setLocation] = useState<{ lat: number; lng: number }>(defaultCenter); // Coordenadas iniciales

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
      setAddress(place.formatted_address || '');

      // Si el lugar tiene información de geometría, actualizamos la ubicación
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setLocation({ lat, lng });
        saveAddressToFirestore(place.formatted_address || '', lat, lng);
      }
    }
  };

  const saveAddressToFirestore = async (selectedAddress: string, lat: number, lng: number) => {
    try {
      await addDoc(collection(db, 'addresses'), {
        address: selectedAddress,
        lat,
        lng,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return isLoaded ? (
    <Box>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <Input placeholder="Busca una dirección" />
      </Autocomplete>
      
      {address && <Box mt={4}>Dirección seleccionada: {address}</Box>}
      
      {/* Mapa que muestra la ubicación seleccionada */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location} // Centra el mapa en la ubicación seleccionada
        zoom={3} // Zoom para ver la ubicación con detalles
      >
        <Marker position={location} /> {/* Marcador en la ubicación */}
      </GoogleMap>
    </Box>
  ) : null;
};

export default AddressSearch;

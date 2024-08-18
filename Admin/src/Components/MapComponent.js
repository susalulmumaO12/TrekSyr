import React, { useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '400px',
  width: '500px',
};

const defaultCenter = {
  lat: 33.5138,
  lng: 36.2765,
};

function MapComponent({ selectedLocation, setSelectedLocation }) {
  const onMapClick = useCallback((event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, [setSelectedLocation]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBaBhyr4j0vOHSeAuFw7S28i0icWefAzjA">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={10}
        onClick={onMapClick}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;

import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import type { GraphEntity } from '../models/GraphEntity';
import { getEntities } from '../services/entityService';

function MapPage() {
  const [places, setPlaces] = useState<GraphEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getEntities()
      .then((data) => {
        const destinations = data.filter(
          (entity) =>
            entity.type === 'DESTINATION' &&
            entity.latitude !== null &&
            entity.longitude !== null
        );

        setPlaces(destinations);
      })
      .catch(() => {
        setError('Failed to load map data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading map...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main
      style={{
        width: '100%',
        height: 'calc(100vh - 73px)',
      }}
    >
      <MapContainer
        center={[41.6, 21.7]}
        zoom={8}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.latitude!, place.longitude!]}
          >
            <Popup>
              <strong>{place.name}</strong>
              <br />
              {place.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </main>
  );
}

export default MapPage;


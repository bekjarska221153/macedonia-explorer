import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { GraphEntity } from '../models/GraphEntity';
import { getEntities } from '../services/entityService';

function PlacesPage() {
  const [places, setPlaces] = useState<GraphEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getEntities()
      .then((data) => {
        const destinations = data.filter(
          (entity) => entity.type === 'DESTINATION'
        );

        setPlaces(destinations);
      })
      .catch(() => {
        setError('Failed to load places.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading places...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="places-page">
      <section className="places-header">
        <h1>Explore Places</h1>
        <p>Discover interesting places across Macedonia.</p>
      </section>

      <section className="places-grid">
        {places.map((place) => (
          <article className="place-card" key={place.id}>
            <span className="place-category">
              {place.type}
            </span>

            {place.imageUrl && (
              <img
                src={place.imageUrl}
                alt={place.name}
                className="place-card-image"
              />
            )}

            <h2>{place.name}</h2>

            <p>{place.description}</p>

            <Link to={`/places/${place.id}`}>View Details</Link>
          </article>
        ))}
      </section>
    </main>
  );
}


export default PlacesPage;

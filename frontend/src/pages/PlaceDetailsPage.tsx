import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { EntityDetails } from '../models/EntityDetails';
import { getEntityDetails } from '../services/entityService';

function PlaceDetailsPage() {
  const { id } = useParams();

  const [details, setDetails] = useState<EntityDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('Invalid place ID.');
      setLoading(false);
      return;
    }

    getEntityDetails(Number(id))
      .then((data) => {
        setDetails(data);
      })
      .catch(() => {
        setError('Failed to load place details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!details) {
    return <p>Place not found.</p>;
  }

  return (
    <main className="place-details-page">
      <section className="place-details-header">
        <span className="place-details-category">
          {details.entity.type}
        </span>

        <h1>{details.entity.name}</h1>

        <p>{details.entity.description}</p>

        <p className="place-details-region">
          Region: <strong>{details.region?.name ?? 'Unknown'}</strong>
        </p>
      </section>

      <section className="place-details-content">
        {/* Attractions */}
        <div className="details-section">
          <h2>Attractions</h2>

          {details.attractions.length > 0 ? (
            <div className="details-list">
              {details.attractions.map((attraction) => (
                <div className="details-card" key={attraction.id}>
                  {attraction.imageUrl && (
                    <img
                      src={attraction.imageUrl}
                      alt={attraction.name}
                      className="details-card-image"
                    />
                  )}

                  <h3>{attraction.name}</h3>

                  <p>{attraction.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No attractions available.</p>
          )}
        </div>

        {/* Activities */}
        <div className="details-section">
          <h2>Activities</h2>

          {details.activities.length > 0 ? (
            <div className="details-list">
              {details.activities.map((activity) => (
                <div className="details-card" key={activity.id}>
                  <h3>{activity.name}</h3>

                  <p>{activity.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No activities available.</p>
          )}
        </div>
      </section>

      <div className="place-details-actions">
        <Link to="/graph">Explore in Graph</Link>
        <Link to="/places">Back to Places</Link>
      </div>
    </main>
  );
}

export default PlaceDetailsPage;


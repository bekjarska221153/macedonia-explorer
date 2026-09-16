import { useEffect, useState } from 'react';
import type { GraphEntity } from '../models/GraphEntity';
import { getEntities } from '../services/entityService';

function ActivitiesPage() {
  const [activities, setActivities] = useState<GraphEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getEntities()
      .then((data) => {
        const activityEntities = data.filter(
          (entity) => entity.type === 'ACTIVITY'
        );

        setActivities(activityEntities);
      })
      .catch(() => {
        setError('Failed to load activities.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading activities...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="activities-page">
      <section className="activities-header">
        <h1>Discover Activities</h1>
        <p>Find interesting things to do across Macedonia.</p>
      </section>

      <section className="activities-grid">
        {activities.map((activity) => (
          <article className="activity-card" key={activity.id}>
            <span className="activity-category">
              {activity.type}
            </span>

            <h2>{activity.name}</h2>

            <p>{activity.description}</p>

          </article>
        ))}
      </section>
    </main>
  );
}

export default ActivitiesPage;

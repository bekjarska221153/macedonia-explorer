import { useEffect, useState } from 'react';
import type { GraphEntity } from '../models/GraphEntity';
import { getEntities } from '../services/entityService';

function ExplorePage() {
    const [entities, setEntities] = useState<GraphEntity[]>([]);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getEntities()
            .then((data) => {
                setEntities(data);
            })
            .catch(() => {
                setError('Failed to load entities.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        setError('');

        try {
            const data = await getEntities(search, type);
            setEntities(data);
        } catch {
            setError('Failed to search entities.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="explore-page">
            <section className="explore-header">
                <h1>Explore Macedonia</h1>

                <p>
                    Search and discover places, attractions and activities.
                </p>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="DESTINATION">Destinations</option>
                        <option value="ATTRACTION">Attractions</option>
                        <option value="ACTIVITY">Activities</option>
                        <option value="REGION">Regions</option>
                        <option value="CATEGORY">Categories</option>
                    </select>

                    <button onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </section>

            {loading && <p>Loading...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && (
                <section className="explore-grid">
                    {entities.map((entity) => (
                        <article className="explore-card" key={entity.id}>
                            <span>{entity.type}</span>

                            {entity.type === 'DESTINATION' ? (
                                <h2>
                                    <a href={`/places/${entity.id}`}>
                                        {entity.name}
                                    </a>
                                </h2>
                            ) : (
                                <h2>{entity.name}</h2>
                            )}

                            <p>{entity.description}</p>
                        </article>
                    ))}
                </section>
            )}
        </main>
    );
}

export default ExplorePage;

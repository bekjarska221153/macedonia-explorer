function HomePage() {
    return (
        <main className="home-page">
            <section className="hero">
                <div className="hero-content">
                    <h1>Discover Macedonia</h1>
                    <p>
                        Explore beautiful places, cultural landmarks and exciting
                        activities across Macedonia.
                    </p>
                    <div className="hero-buttons">
                        <a href="/places">Explore Places</a>
                        <a href="/activities">Discover Activities</a>
                    </div>
                </div>

                <div className="hero-illustration">
                    <svg viewBox="0 0 420 320" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="330" cy="66" r="32" fill="#c99a4a" opacity="0.85" />
                        <polygon
                            points="0,220 60,140 120,200 180,110 240,190 300,130 360,210 420,160 420,320 0,320"
                            fill="#aebd9c"
                            opacity="0.55"
                        />
                        <polygon
                            points="0,250 70,180 140,230 210,150 280,220 350,170 420,230 420,320 0,320"
                            fill="#5c7754"
                            opacity="0.85"
                        />
                        <polygon
                            points="0,280 80,220 160,260 240,190 320,250 420,210 420,320 0,320"
                            fill="#33492f"
                        />
                        <ellipse cx="210" cy="298" rx="190" ry="12" fill="#c99a4a" opacity="0.3" />
                    </svg>
                </div>
            </section>

            <section className="home-section">
                <h2>Explore Macedonia</h2>
                <p>
                    Find inspiration for your next trip and discover what Macedonia
                    has to offer.
                </p>
            </section>
        </main>
    );
}

export default HomePage;

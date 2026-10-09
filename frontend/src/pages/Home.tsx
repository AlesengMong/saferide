
type HomeProps = {
  onHome: () => void;
  onLogin: () => void;
  onRequestRide: () => void;
  onBecomeDriver: () => void;
  onSignUp: () => void;
};

function Home({
  onHome,
  onLogin,
  onRequestRide,
  onBecomeDriver,
  onSignUp,
}: HomeProps) {
  return (
    <>
      <header className="navbar">
        <button className="logo" onClick={onHome}>
          Safe<span>Ride</span>
        </button>

        <span className="status">
          <span className="status-dot"></span>
          Safety starts here
        </span>

        <button className="login-button" onClick={onLogin}>
          Log in
        </button>
      </header>

      <main className="hero">
        <section className="hero-content">
          <p className="eyebrow">YOUR JOURNEY, YOUR SAFETY</p>

          <h1>
            Every journey
            <br />
            deserves to be <span>safer.</span>
          </h1>

          <p className="description">
            Leave uncertain lifts behind. Connect with registered
            drivers through a platform designed with your safety
            in mind.
          </p>

          <div className="actions">
            <button
              className="primary-button"
              onClick={onRequestRide}
            >
              Request a ride <span>→</span>
            </button>

            <button
              className="secondary-button"
              onClick={onBecomeDriver}
            >
              Become a driver
            </button>

            <button
              className="secondary-button"
              onClick={onSignUp}
            >
              Sign up
            </button>
          </div>

          <div className="trust-note">
            <span className="shield">✓</span>
            Registered drivers. A safer way to travel.
          </div>
        </section>

        <section className="visual">
          <div className="map-card">
            <div className="map-label">
              <span className="map-dot"></span>
              YOUR NEXT JOURNEY
            </div>

            <div className="route">
              <div className="route-line">
                <span className="route-point start"></span>
                <span className="route-point end"></span>
              </div>

              <div className="location">
                <small>PICKUP LOCATION</small>
                <strong>Where are you?</strong>
              </div>

              <div className="location destination">
                <small>YOUR DESTINATION</small>
                <strong>Where to?</strong>
              </div>
            </div>

            <div className="map-footer">
              <span>Designed around your safety</span>
              <span className="map-arrow">↗</span>
            </div>
          </div>

          <div className="floating-card">
            <span className="check-circle">✓</span>
            <div>
              <strong>Safety comes first</strong>
              <p>Driver approval required</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>SafeRide SA</span>
        <span>A better way to get there.</span>
      </footer>
    </>
  );
}

export default Home;


import { useState } from "react";
import type { FormEvent } from "react";
import "./index.css";
import Home from "./pages/Home";
import Register from "./pages/Register";

type Screen = "home" | "signup" | "login" | "ride" | "driver";

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [message, setMessage] = useState("");

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  function goTo(nextScreen: Screen) {
    setMessage("");
    setScreen(nextScreen);
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Login form submitted. Secure authentication will be connected next."
    );
  }

  function handleRide(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      `Ride request prepared: ${pickup} to ${destination}. Booking will be connected next.`
    );
  }

  function handleDriver(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Driver application form completed. Driver verification will be connected next."
    );
  }

  function renderForm() {
    switch (screen) {
      case "signup":
        return (
          <Register
            onLogin={() => goTo("login")}
            onSuccess={(successMessage) => setMessage(successMessage)}
          />
        );

      case "login":
        return (
          <>
            <h2>Welcome back</h2>
            <p>Log in to continue with SafeRide.</p>

            <form onSubmit={handleLogin} className="app-form">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />

              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
              />

              <button className="primary-button" type="submit">
                Log in
              </button>
            </form>

            <p>
              New to SafeRide?{" "}
              <button
                className="text-button"
                type="button"
                onClick={() => goTo("signup")}
              >
                Sign up
              </button>
            </p>
          </>
        );

      case "ride":
        return (
          <>
            <h2>Request a ride</h2>
            <p>Where would you like your journey to begin and end?</p>

            <form onSubmit={handleRide} className="app-form">
              <label htmlFor="pickup">Pickup location</label>
              <input
                id="pickup"
                value={pickup}
                onChange={(event) => setPickup(event.target.value)}
                required
                placeholder="Enter pickup location"
              />

              <label htmlFor="destination">Destination</label>
              <input
                id="destination"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                required
                placeholder="Where would you like to go?"
              />

              <button className="primary-button" type="submit">
                Continue
              </button>
            </form>
          </>
        );

      case "driver":
        return (
          <>
            <h2>Become a SafeRide driver</h2>
            <p>
              Start your application. Drivers must be reviewed and
              approved before they can accept rides.
            </p>

            <form onSubmit={handleDriver} className="app-form">
              <label htmlFor="driver-name">Full name</label>
              <input
                id="driver-name"
                required
                placeholder="Enter your full name"
              />

              <label htmlFor="driver-email">Email address</label>
              <input
                id="driver-email"
                type="email"
                required
                placeholder="you@example.com"
              />

              <label htmlFor="driver-phone">Phone number</label>
              <input
                id="driver-phone"
                type="tel"
                required
                placeholder="Enter your phone number"
              />

              <button className="primary-button" type="submit">
                Submit application
              </button>
            </form>
          </>
        );

      default:
        return null;
    }
  }

  return (
    <div className="app">
      {screen === "home" ? (
        <Home
          onHome={() => goTo("home")}
          onLogin={() => goTo("login")}
          onRequestRide={() => goTo("ride")}
          onBecomeDriver={() => goTo("driver")}
          onSignUp={() => goTo("signup")}
        />
      ) : (
        <>
          <header className="navbar">
            <button
              className="logo"
              type="button"
              onClick={() => goTo("home")}
            >
              Safe<span>Ride</span>
            </button>

            <span className="status">
              <span className="status-dot"></span>
              Safety starts here
            </span>

            <button
              className="login-button"
              type="button"
              onClick={() => goTo("login")}
            >
              Log in
            </button>
          </header>

          <main className="form-page">
            <section className="form-card">
              <button
                className="back-button"
                type="button"
                onClick={() => goTo("home")}
              >
                ← Back to home
              </button>

              {renderForm()}

              {message && (
                <div className="form-message" role="status">
                  {message}
                </div>
              )}
            </section>
          </main>

          <footer>
            <span>SafeRide SA</span>
            <span>A better way to get there.</span>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;

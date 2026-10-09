
import { useState } from "react";
import type { FormEvent } from "react";

type RegisterProps = {
  onLogin: () => void;
  onSuccess: (message: string) => void;
};

function Register({ onLogin, onSuccess }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSuccess(
      `Registration form completed for ${name}. Account creation will be connected next.`
    );
  }

  return (
    <>
      <h2>Create your SafeRide account</h2>
      <p>Join SafeRide and plan your journeys with confidence.</p>

      <form onSubmit={handleSubmit} className="app-form">
        <label htmlFor="signup-name">Full name</label>
        <input
          id="signup-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          required
          placeholder="Enter your full name"
        />

        <label htmlFor="signup-email">Email address</label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          placeholder="you@example.com"
        />

        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          minLength={8}
          required
          placeholder="At least 8 characters"
        />

        <button className="primary-button" type="submit">
          Create account
        </button>
      </form>

      <p>
        Already registered?{" "}
        <button
          className="text-button"
          type="button"
          onClick={onLogin}
        >
          Log in
        </button>
      </p>
    </>
  );
}

export default Register;

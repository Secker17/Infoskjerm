import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Pass på at denne stien stemmer med din faktiske firebase konfigurasjonsfil
import { useNavigate } from 'react-router-dom';
import '../signup.css'; // Pass på å opprette og stilsette denne CSS-filen for SignUp siden

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passordene matcher ikke.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Endrer til ønsket rute etter vellykket registrering, f.eks. hjemmesiden eller innloggingssiden
    } catch (error) {
      console.error("Registreringsfeil:", error.message);
      setError(error.message);
    }
  };

  return (
    <main>
      <section>
        <div>
          <p>Registrer Ny Bruker</p>
          {error && <p className="error">{error}</p>}
          <form onSubmit={onSignUp}>
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="E-postadresse"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Passord"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                placeholder="Bekreft Passord"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Registrer</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default SignUp;

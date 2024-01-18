import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { auth } from '../firebase'; // Endre denne stien til den faktiske stien til din firebase.js
import { onAuthStateChanged } from 'firebase/auth';
import '../admin.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Brukeren er logget inn.
        setIsLoggedIn(true);
      } else {
        // Brukeren er ikke logget inn.
        navigate('/login');
      }
    });

    // Rens opp lytteren når komponenten blir fjernet
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setIsLoggedIn(false);
      navigate('/login');
    }).catch((error) => {
      // Håndter feil her.
      console.error('Logout Error:', error);
    });
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Admin Panel</h1>
        <p>You are not logged in. Please log in to access the admin panel.</p>
        <Button variant="primary" onClick={() => navigate('/login')}>Login</Button>
      </div>
    );
  }
  return (
    <div className="admin-container">
      <h1 className="admin-header">Admin Panel</h1>
      <div className="admin-dashboard">
        <h2>Dashboard</h2>
        {/* Dashboard widgets or summary cards */}
      </div>
      <div className="admin-user-management">
        <h2>Brukerhåndtering</h2>
        {/* User management functionalities */}
      </div>
      <div className="admin-content-management">
        <h2>Innholdsadministrasjon</h2>
        {/* Content management functionalities */}
      </div>
      <div className="admin-settings">
        <h2>Innstillinger</h2>
        {/* Settings functionalities */}
      </div>
      <div className="admin-analytics">
        <h2>Analyserapporter</h2>
        {/* Analytics and reports */}
      </div>
      <div className="admin-support">
        <h2>Støtteforespørsler</h2>
        {/* Support request functionalities */}
      </div>
      <div className="admin-notifications">
        <h2>Varslinger</h2>
        {/* Notifications functionalities */}
      </div>
      <Button className="admin-button" variant="danger" onClick={handleLogout}>Logout</Button>
    </div>
  );
  
};

export default AdminPanel;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { auth, firestore } from '../firebase.js'; // Adjust this path to your actual firebase.js path
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { updateDoc } from 'firebase/firestore';

import '../admin.css';


  const AdminPanel = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [content, setContent] = useState(''); // State for the content you want to edit
  const [userRole, setUserRole] = useState(''); // Declare userRole state variable

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is logged in.
        setIsLoggedIn(true);

        // Fetch user role from Firestore
        try {
          const docRef = doc(firestore, 'user', '0JUZErvwmTE6jy4Wc7fr'); // Replace YOUR_DOCUMENT_ID 
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserRole(docSnap.data().role);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        // User is not logged in.
        navigate('/login');
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [navigate]);


  const handleLogout = () => {
    auth.signOut().then(() => {
      setIsLoggedIn(false);
      navigate('/login');
    }).catch((error) => {
      // Handle logout error here
      console.error('Logout Error:', error);
    });
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSave = async () => {
    try {
      const docRef = doc(firestore, 'yourCollection', 'yourDoc');
      await updateDoc(docRef, {
        yourField: content // Update this with your specific field
      });
      // Add success notification here if needed
    } catch (error) {
      console.error('Error updating content:', error);
      // Add error notification here if needed
    }
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

  // Render the admin panel when the user is logged in
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h1>SECKER ADMIN</h1>
        <nav className="menu">
          <a href="#">Dashboard</a>
          <a href="#" className="active">Admin Profile</a>
          <a href="#">Utilities</a>
          <a href="#">Pages</a>
          <a href="#">Charts</a>
          <a href="#">Tables</a>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <input type="search" placeholder="Search for..."></input>
          <button onClick={handleLogout}>Logout</button>
        </header>

        <div>
          <h2>Edit Screen Content</h2>
          <p>You can change the content displayed on your screen by editing the text below. Changes will be reflected on the screen in real-time.</p>
          <textarea value={content} onChange={handleContentChange}></textarea>
          <button onClick={handleSave}>Save Changes</button>
        </div>
        
        <div>
          <p>User Role: {userRole}</p> {/* Display user role */}
        </div>
        
        <footer className="footer">
          <p>Copyright © Your Website 2019</p>
        </footer>
      </main>
    </div>
  );
};

export default AdminPanel;

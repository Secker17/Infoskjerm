// Importerer nødvendige biblioteker og stilark
import React, { useState } from 'react'; // React og useState hook
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase-funksjon for innlogging med e-post og passord
import { auth } from '../firebase'; // Firebase-autentiseringsinstans
import { NavLink, useNavigate } from 'react-router-dom'; // React Router for navigering og lenker
import '../login.css'; // Importerer CSS-filen for stil

// Komponent for innloggingssiden
const Login = () => {
    const navigate = useNavigate(); // Hook for å programmere navigasjon, bruke visse react funksjoner.
    const [email, setEmail] = useState(''); // State for brukerens e-post
    const [password, setPassword] = useState(''); // State for brukerens passord
       
    // Funksjonen som kjøres når brukeren prøver å logge inn
    const onLogin = (e) => {
        e.preventDefault(); // Forhindrer standard oppførsel for skjemaet (sideoppdatering)
        signInWithEmailAndPassword(auth, email, password) // Prøver å logge inn med e-post og passord
        .then((userCredential) => {
            // Hvis innloggingen er vellykket
            const user = userCredential.user; // Henter brukerdata
            navigate("/admin") // Navigerer til admin-siden
            console.log(user); // Logger brukerdata til konsollen
        })
        .catch((error) => {
            // Hvis det er en feil under innloggingen
            const errorCode = error.code; // Feilkoden fra Firebase
            const errorMessage = error.message; // Feilmeldingen fra Firebase
            console.log(errorCode, errorMessage); // Logger feilkode og melding til konsollen
        });
    }
 
    // Render-funksjonen for komponenten
    return(
        <>
            <main >        
                <section>
                    <div>                                            
                        <p> Infoskjerm </p>                       
                                                       
                        <form>                                              
                            <div>
                                {/* E-postinngangsfelt */}
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                {/* Passordinngangsfelt */}
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                                                
                            <div>
                                {/* Innloggingsknapp */}
                                <button                                    
                                    onClick={onLogin}                                        
                                >      
                                    Login                                                                  
                                </button>
                            </div>                               
                        </form>
                    </div>
                </section>
            </main>
            
        </>
        
    )
}
 
export default Login; // Eksporterer komponenten for bruk i andre deler av applikasjonen

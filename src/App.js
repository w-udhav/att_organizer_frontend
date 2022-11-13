import Home from "./component/Home";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from "./component/Signup";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import { CredentialContext } from "./component/contexts/CredentialContext";
import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import Footer from "./component/Footer";

function App() {
  const { currentUser, setCurrentUser } = useContext(CredentialContext)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user !== null) {
        setCurrentUser([user.uid, user.email]);
      } else {
        setCurrentUser('')
      }
    });
    return unsub;
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home user={currentUser} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </div >
  );
}

export default App;

import Home from "./component/Home";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from "./component/Signup";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import CredentialContextProvider from "./component/contexts/CredentialContext";

function App() {
  return (
    <div className="">
      <Router>
        <CredentialContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </CredentialContextProvider>
      </Router>
    </div>
  );
}

export default App;

import Home from "./component/Home";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from "./component/Signup";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";

function App() {
  return (
    <div className="">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

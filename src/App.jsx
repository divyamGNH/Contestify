import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import ContestFilter from "./components/ContestFilter.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";

function App() {
  const [isRegistered, setIsRegistered] = useState(null); // null = loading

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/check", { withCredentials: true })
      .then(() => setIsRegistered(true))
      .catch(() => setIsRegistered(false));
  }, []);

  if (isRegistered === null) return <div>Loading...</div>; // while checking

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isRegistered ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/register"
          element={isRegistered ? <Navigate to="/home" /> : <Register />}
        />
        <Route
          path="/login"
          element={
            isRegistered ? (
              <Navigate to="/home" />
            ) : (
              <Login setIsRegistered={setIsRegistered} />
            )
          }
        />
        <Route
          path="/home"
          element={isRegistered ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={isRegistered ? <ContestFilter /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

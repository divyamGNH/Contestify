import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import ContestFilter from "./components/ContestFilter.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";

import { messaging } from "./firebase.js";
import { getToken } from "firebase/messaging";

const vapid = import.meta.env.VITE_VAPID_KEY;

//Just to check is the vapid is being processed or not;
console.log(vapid);

function App() {
  const [isRegistered, setIsRegistered] = useState(null); // null = loading

  async function requestPermission() {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      try {
        const token = await getToken(messaging, { vapidKey: vapid });
        console.log("FCM Token:", token);
      } catch (err) {
        console.error("Error getting FCM token:", err);
      }
    } else if (permission === "denied") {
      alert("You denied the notification permission");
    }
  }

  useEffect(() => {
    requestPermission();
  }, []); // run only once on mount

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/check", { withCredentials: true })
      .then(() => setIsRegistered(true))
      .catch(() => setIsRegistered(false));
  }, []);

  if (isRegistered === null) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={isRegistered ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/register" element={isRegistered ? <Navigate to="/home" /> : <Register />} />
        <Route
          path="/login"
          element={isRegistered ? <Navigate to="/home" /> : <Login setIsRegistered={setIsRegistered} />}
        />
        <Route path="/home" element={isRegistered ? <Home /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isRegistered ? <ContestFilter /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

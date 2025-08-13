import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ContestFilter from "./components/ContestFilter.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";

function App() {
  const isRegistered = Boolean(localStorage.getItem("token")); // or your auth token key

  return (
    <Router>
      <Routes>
        <Route path="/" element={isRegistered ? <Navigate to="/settings" /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<ContestFilter />} />
      </Routes>
    </Router>
  );
}

export default App;

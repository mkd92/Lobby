import { Route, Routes } from "react-router-dom";

import UnitSelector from "./components/unitSelector/UnitSelector";

import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";

import Home from "./pages/Home";

import Signup from "./pages/Signup";

import "./App.css";
import Navbar from "./components/navbar/navbar";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/:prop_id" element={<UnitSelector />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

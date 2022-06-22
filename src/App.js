import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

import Transactions from "./components/transactions/Transactions";

import UnitSelector from "./components/unitSelector/UnitSelector";

import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";

import Home from "./pages/Home";

import Signup from "./pages/Signup";

import "./App.css";
import Navbar from "./components/navbar/Navbar";
function App() {
  return (
    <div>
      <Navbar />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/:prop_id" element={<UnitSelector />}>
              <Route
                path="/dashboard/:prop_id/:unit_id"
                element={<Transactions />}
              />
            </Route>
          </Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;

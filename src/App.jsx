import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Policies from "./pages/Policies";
import Claims from "./pages/Claims";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Documents from "./pages/Documents";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/documents" element={<Documents />} />
        </Routes>

      </div>
    </>
  );
}

export default App;
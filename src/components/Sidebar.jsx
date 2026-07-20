import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Menu</h3>

      <ul>
        <li><Link to="/">🏠 Dashboard</Link></li>
        <li><Link to="/customers">👤 Customers</Link></li>
        <li><Link to="/policies">📄 Policies</Link></li>
        <li><Link to="/claims">💰 Claims</Link></li>
        <li><Link to="/reports">📊 Reports</Link></li>
        <li><Link to="/settings">⚙️ Settings</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
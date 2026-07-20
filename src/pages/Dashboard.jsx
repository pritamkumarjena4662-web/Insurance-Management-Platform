import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>Total Customers</h3>
          <p>120</p>
        </div>

        <div className="card">
          <h3>Total Policies</h3>
          <p>85</p>
        </div>

        <div className="card">
          <h3>Total Claims</h3>
          <p>25</p>
        </div>

        <div className="card">
          <h3>Revenue</h3>
          <p>₹5,40,000</p>
        </div>
        <div className="chart">
  <h2>Monthly Policy Overview</h2>
  <div className="chart-box">
    📊 Chart Coming Soon
  </div>
</div>

<div className="activity">
  <h2>Recent Activities</h2>
  <ul>
    <li>✅ New Customer Added</li>
    <li>📄 Policy Approved</li>
    <li>💰 Claim Processed</li>
    <li>📊 Monthly Report Generated</li>
  </ul>
</div>
      </div>
    </div>
  );
}

export default Dashboard;
import "../styles/Dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Policies",
      data: [10, 20, 15, 30, 25, 35],
      backgroundColor: [
        "#2196f3",
        "#4caf50",
        "#ff9800",
        "#9c27b0",
        "#00bcd4",
        "#f44336",
      ],
      borderRadius: 8,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Policy Overview",
    },
  },
};

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>📊 Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>👤 Total Customers</h3>
          <p>120</p>
        </div>

        <div className="card">
          <h3>📄 Total Policies</h3>
          <p>85</p>
        </div>

        <div className="card">
          <h3>💰 Total Claims</h3>
          <p>25</p>
        </div>

        <div className="card">
          <h3>💵 Revenue</h3>
          <p>₹5,40,000</p>
        </div>

        <div className="chart">
          <h2>📈 Monthly Policy Overview</h2>

          <div
            style={{
              width: "90%",
              maxWidth: "800px",
              margin: "20px auto",
              background: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Bar data={data} options={options} />
          </div>
        </div>

        <div className="activity">
          <h2>📝 Recent Activities</h2>
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
function Reports() {
  return (
    <div style={{ padding: "30px", width: "100%" }}>
      <h2
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "20px",
        }}
      >
        Reports
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "white",
            color: "black",
            padding: "20px",
            borderRadius: "10px",
            width: "180px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "black" }}>Total Customers</h3>
          <h2 style={{ color: "black" }}>120</h2>
        </div>

        <div
          style={{
            background: "white",
            color: "black",
            padding: "20px",
            borderRadius: "10px",
            width: "180px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "black" }}>Total Policies</h3>
          <h2 style={{ color: "black" }}>85</h2>
        </div>

        <div
          style={{
            background: "white",
            color: "black",
            padding: "20px",
            borderRadius: "10px",
            width: "180px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "black" }}>Total Claims</h3>
          <h2 style={{ color: "black" }}>25</h2>
        </div>

        <div
          style={{
            background: "white",
            color: "black",
            padding: "20px",
            borderRadius: "10px",
            width: "180px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "black" }}>Revenue</h3>
          <h2 style={{ color: "black" }}>₹5,40,000</h2>
        </div>
      </div>

      <table
        border="1"
        cellPadding="15"
        style={{
          width: "95%",
          margin: "0 auto",
          background: "white",
          color: "black",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Report Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>R101</td>
            <td>Monthly Policy Report</td>
            <td>20-07-2026</td>
            <td>Completed</td>
          </tr>

          <tr>
            <td>R102</td>
            <td>Claims Report</td>
            <td>19-07-2026</td>
            <td>Completed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Reports;
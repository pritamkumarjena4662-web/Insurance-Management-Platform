import { useState } from "react";

function Policies() {
  const [showForm, setShowForm] = useState(false);
  const [customer, setCustomer] = useState("");
  const [type, setType] = useState("");
  const [premium, setPremium] = useState("");

  const [policies, setPolicies] = useState([
    {
      id: 101,
      customer: "Rahul Sharma",
      type: "Health Insurance",
      premium: "₹12,000",
    },
    {
      id: 102,
      customer: "Priya Das",
      type: "Life Insurance",
      premium: "₹18,500",
    },
  ]);

  const addPolicy = () => {
    if (!customer || !type || !premium) {
      alert("Please fill all fields");
      return;
    }

    const newPolicy = {
      id: policies.length + 101,
      customer,
      type,
      premium,
    };

    setPolicies([...policies, newPolicy]);
    setCustomer("");
    setType("");
    setPremium("");
    setShowForm(false);
  };

  const deletePolicy = (id) => {
    setPolicies(policies.filter((policy) => policy.id !== id));
  };

  return (
    <div style={{ padding: "30px", width: "100%" }}>
      <h2 style={{ textAlign: "center", color: "white" }}>
        Policies
      </h2>

      <div style={{ textAlign: "center", margin: "20px" }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Policy
        </button>
      </div>

      {showForm && (
        <div
          style={{
            width: "350px",
            margin: "20px auto",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Customer Name"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            type="text"
            placeholder="Policy Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            type="text"
            placeholder="Premium"
            value={premium}
            onChange={(e) => setPremium(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <button
            onClick={addPolicy}
            style={{
              width: "100%",
              padding: "10px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Save Policy
          </button>
        </div>
      )}

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
            <th>Policy ID</th>
            <th>Customer</th>
            <th>Policy Type</th>
            <th>Premium</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {policies.map((policy) => (
            <tr key={policy.id}>
              <td>{policy.id}</td>
              <td>{policy.customer}</td>
              <td>{policy.type}</td>
              <td>{policy.premium}</td>
              <td>
                <button
                  onClick={() => deletePolicy(policy.id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Policies;
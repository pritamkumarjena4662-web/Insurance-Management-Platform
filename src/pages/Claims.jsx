import { useState } from "react";

function Claims() {
  const [showForm, setShowForm] = useState(false);
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const [claims, setClaims] = useState([
    {
      id: 201,
      customer: "Rahul Sharma",
      amount: "₹50,000",
      status: "Approved",
    },
    {
      id: 202,
      customer: "Priya Das",
      amount: "₹25,000",
      status: "Pending",
    },
  ]);

  const addClaim = () => {
    if (!customer || !amount || !status) {
      alert("Please fill all fields");
      return;
    }

    const newClaim = {
      id: claims.length + 201,
      customer,
      amount,
      status,
    };

    setClaims([...claims, newClaim]);
    setCustomer("");
    setAmount("");
    setStatus("");
    setShowForm(false);
  };

  const deleteClaim = (id) => {
    setClaims(claims.filter((claim) => claim.id !== id));
  };

  return (
    <div style={{ padding: "30px", width: "100%" }}>
      <h2 style={{ textAlign: "center", color: "white" }}>
        Claims
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
          Add Claim
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
            placeholder="Claim Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <button
            onClick={addClaim}
            style={{
              width: "100%",
              padding: "10px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Save Claim
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
            <th>Claim ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {claims.map((claim) => (
            <tr key={claim.id}>
              <td>{claim.id}</td>
              <td>{claim.customer}</td>
              <td>{claim.amount}</td>
              <td>{claim.status}</td>
              <td>
                <button
                  onClick={() => deleteClaim(claim.id)}
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

export default Claims;
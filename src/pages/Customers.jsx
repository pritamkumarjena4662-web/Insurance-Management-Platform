import { useState } from "react";

export default function Customers() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [policy, setPolicy] = useState("");
  const [phone, setPhone] = useState("");

  const [customers, setCustomers] = useState([
    { id: 1, name: "Rahul Sharma", policy: "Health Insurance", phone: "9876543210" },
    { id: 2, name: "Priya Das", policy: "Life Insurance", phone: "9123456789" },
  ]);

  const addCustomer = () => {
    if (!name || !policy || !phone) {
      alert("Fill all fields");
      return;
    }

    setCustomers([
      ...customers,
      {
        id: customers.length + 1,
        name,
        policy,
        phone,
      },
    ]);

    setName("");
    setPolicy("");
    setPhone("");
    setShowForm(false);
  };

  return (
    <div style={{ padding: "30px", width:"100%"}}>
      <h2
  style={{
    textAlign: "center",
    color: "white",
    marginBottom: "20px",
    fontSize: "32px",
  }}
>
  Customers
</h2>

<div style={{ textAlign: "center", marginBottom: "20px" }}>
  <button
    onClick={() => setShowForm(!showForm)}
    style={{
      background: "#2196f3",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    }}
  >
    + Add Customer
  </button>
</div>

      {showForm && (
        <div
         style={{
  width: "450px",
  margin: "20px auto",
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
}}
        >
          <input
  type="text"
  placeholder="Customer Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  }}
/>
          <br />
          <br />

          /<input
            type="text"
            placeholder="Policy"
            value={policy}
            onChange={(e) => setPolicy(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <br />
          <br />

         <input
  type="text"
  placeholder="Phone Number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  }}
/>
          <br />
          <br />

          <button
  onClick={addCustomer}
  style={{
    width: "100%",
    padding: "12px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  }}
>
  Save Customer
</button>
        </div>
      )}

      <table
        border="1"
        cellPadding="10"
       style={{
  width: "95%",
  margin: "20px auto",
  borderCollapse: "collapse",
  textAlign: "center",
  background: "white",
  color: "black",
}}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Policy</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.policy}</td>
              <td>{c.phone}</td>
              <td>
                <button
                  onClick={() => {
                    setCustomers(customers.filter((customer) => customer.id !== c.id));
                  }}
                  style={{
                    background: "#f44336",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
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
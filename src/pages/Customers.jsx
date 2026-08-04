import { useState } from "react";

export default function Customers() {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");
  const [policy, setPolicy] = useState("");
  const [phone, setPhone] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      policy: "Health Insurance",
      phone: "9876543210",
    },
    {
      id: 2,
      name: "Priya Das",
      policy: "Life Insurance",
      phone: "9123456789",
    },
  ]);

  const addCustomer = () => {
    if (!name || !policy || !phone) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      setCustomers(
        customers.map((c) =>
          c.id === editId
            ? {
                ...c,
                name,
                policy,
                phone,
              }
            : c
        )
      );

      alert("Customer Updated Successfully");
      setEditId(null);
    } else {
      setCustomers([
        ...customers,
        {
          id: customers.length + 1,
          name,
          policy,
          phone,
        },
      ]);

      alert("Customer Added Successfully");
    }

    setName("");
    setPolicy("");
    setPhone("");
    setShowForm(false);
  };

  const filteredCustomers = customers
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((c) =>
      filter === "All" ? true : c.policy === filter
    );

  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirst,
    indexOfLast
  );

  return (
    <div style={{ padding: "30px", width: "100%" }}>
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

      <h3
        style={{
          textAlign: "center",
          color: "#00ff99",
          marginBottom: "15px",
        }}
      >
        Total Customers: {customers.length}
      </h3>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: "#2196f3",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          + Add Customer
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            width: "220px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <option>All</option>
          <option>Health Insurance</option>
          <option>Life Insurance</option>
        </select>
      </div>

      {showForm && (
        <div
          style={{
            width: "450px",
            margin: "20px auto",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
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
            }}
          />

          <input
            type="text"
            placeholder="Policy"
            value={policy}
            onChange={(e) => setPolicy(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

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
            }}
          >
            {editId ? "Update Customer" : "Save Customer"}
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
          {currentCustomers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.policy}</td>
              <td>{c.phone}</td>

              <td>
                <button
                  onClick={() => {
                    setEditId(c.id);
                    setName(c.name);
                    setPolicy(c.policy);
                    setPhone(c.phone);
                    setShowForm(true);
                  }}
                  style={{
                    background: "#2196f3",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Delete this customer?")) {
                      setCustomers(
                        customers.filter(
                          (customer) => customer.id !== c.id
                        )
                      );
                    }
                  }}
                  style={{
                    background: "#f44336",
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

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: "8px 15px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Previous
        </button>

        <span
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Page {currentPage}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={
            currentPage * customersPerPage >=
            filteredCustomers.length
          }
          style={{
            padding: "8px 15px",
            marginLeft: "10px",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
function Settings() {
  return (
    <div style={{ padding: "30px", width: "100%" }}>
      <h2
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "20px",
        }}
      >
        Settings
      </h2>

      <div
        style={{
          width: "500px",
          margin: "0 auto",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          color: "black",
        }}
      >
        <p><strong>Company:</strong> Insurance Management Platform</p>
        <p><strong>Admin:</strong> Pritam Kumar Jena</p>
        <p><strong>Theme:</strong> Dark</p>
        <p><strong>Language:</strong> English</p>
        <button
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            background: "#2196f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;
import { useState } from "react";

function Documents() {
  const [files, setFiles] = useState([]);

  const uploadFile = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const newFile = {
      id: Date.now(),
      name: selectedFile.name,
      type: selectedFile.type,
      size: (selectedFile.size / 1024).toFixed(2) + " KB",
    };

    setFiles([...files, newFile]);
  };

  const deleteFile = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div style={{ padding: "30px", width: "100%" }}>
      <h2
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "20px",
        }}
      >
        Documents
      </h2>

      <div
        style={{
          width: "400px",
          margin: "20px auto",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          color: "black",
          textAlign: "center",
        }}
      >
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={uploadFile}
        />
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
            <th>File Name</th>
            <th>Type</th>
            <th>Size</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {files.map((file) => (
            <tr key={file.id}>
              <td>{file.name}</td>
              <td>{file.type}</td>
              <td>{file.size}</td>
              <td>
                <button
                  onClick={() => deleteFile(file.id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
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

export default Documents;
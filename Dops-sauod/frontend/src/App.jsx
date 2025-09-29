import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [sapId, setSapId] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  const addUser = async () => {
    await axios.post("http://localhost:5000/api/users", { name, sapId });
    setName(""); 
    setSapId(""); 
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>User List</h1>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="SAP ID"
        value={sapId}
        onChange={(e) => setSapId(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>

      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name} - {user.sapId}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

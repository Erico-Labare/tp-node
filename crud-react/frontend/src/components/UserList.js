import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3001/api/users/${id}`).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  return (
    <div>
      <h1>Users</h1>
      <Link to="/create">Créer un User</Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age} ans)
            <Link to={`/edit/${user.id}`}>Editer</Link>
            <button onClick={() => deleteUser(user.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
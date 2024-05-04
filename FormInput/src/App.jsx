import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:3001/getUsers')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/createusers', formData)
      .then(() => {
        fetchUsers(); // Refresh the user list after creating a new user
        setFormData({ name: '', age: '' }); // Clear the form fields
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
          />
          <button type="submit">Add User</button>
        </form>
      </div>
      <div>
        {users.map((user) => (
          <div key={user._id}>
            <h1>{user.name}</h1>
            <h2>{user.age}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactPopup from "../components/ContactPopup";
import Layout from "../components/Layout";

export default function Contacts() {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7265/api/ContactsList"
        );
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const togglePopup = () => {
    setShowPopup((prevState) => !prevState);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    togglePopup();
  };

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleDelete = (contactID) => {
    try {
      axios.delete(`https://localhost:7265/api/ContactsList/${contactID}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.contactID !== contactID)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchInput.toLowerCase())
    )
  );

  return (
    <Layout>
      <button onClick={togglePopup} className="btn">
        Add Contact
      </button>
      {showPopup && (
        <ContactPopup
          togglePopup={togglePopup}
          user={editUser}
          setUser={setEditUser}
        />
      )}

      <input
        type="text"
        className="search"
        placeholder="Search"
        onChange={handleChange}
      />

      <table className="contacts">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.contactID}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.city}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.contactID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

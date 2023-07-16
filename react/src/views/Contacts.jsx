import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactPopup from "../components/ContactPopup";
import Layout from "../components/Layout";
import EditIcon from "../assets/img/Edit_light.svg";
import TrashIcon from "../assets/img/Trash_light.svg";
import SearchIcon from "../assets/img/Search_light.svg";

export default function Contacts() {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7265/api/Employees"
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
      axios.delete(`https://localhost:7265/api/Employees/${contactID}`);
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
      <div className="top-wrapper">
        <button onClick={togglePopup} className="btn">
          Add Contact
        </button>
        <div className="search">
          <input type="text" placeholder="Search" onChange={handleChange} />
        </div>
      </div>
      {showPopup && (
        <ContactPopup
          togglePopup={togglePopup}
          user={editUser}
          setUser={setEditUser}
        />
      )}

      <div className="employees">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date of birth</th>
              <th>Position</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.employeeID}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                <td>{user.position}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                  <div className="employees__actions">
                    <button
                      onClick={() => handleEdit(user)}
                      className="employees__action"
                    >
                      Edit
                      <img src={EditIcon} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.contactID)}
                      className="employees__action"
                    >
                      Delete
                      <img src={TrashIcon} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

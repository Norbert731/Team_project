import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactPopup from "../components/ContactPopup";
import Layout from "../components/Layout";
import EditIcon from "../assets/img/Edit_light.svg";
import TrashIcon from "../assets/img/Trash_light.svg";

export default function Contacts() {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [sortOption, setSortOption] = useState("firstName"); // Add this line for sorting

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7265/api/Employees`
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

  const handleDelete = async (employeeID) => {
    try {
      await axios.delete(`https://localhost:7265/api/Employees/${employeeID}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.employeeID !== employeeID)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateUsersState = async () => {
    try {
      const response = await axios.get(`https://localhost:7265/api/Employees`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchInput.toLowerCase())
    )
  );

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
  };

  // Function to sort contacts based on the selected option
  const sortContacts = (contacts, sortOption) => {
    return [...contacts].sort((a, b) => {
      if (a[sortOption] < b[sortOption]) return -1;
      if (a[sortOption] > b[sortOption]) return 1;
      return 0;
    });
  };

  // Get the sorted users based on the selected sort option
  const sortedUsers = sortContacts(filteredUsers, sortOption);

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
      <div className="sort">
        <label htmlFor="sortSelect" className="sort__label">
          Sort By:
        </label>
        <select
          className="sort__select"
          id="sortSelect"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="email">Email</option>
          <option value="dateOfBirth">Date of Birth</option>
          <option value="position">Position</option>
          <option value="phone">Phone</option>
          <option value="address">Address</option>
        </select>
      </div>
      {showPopup && (
        <ContactPopup
          togglePopup={togglePopup}
          user={editUser}
          setUser={setEditUser}
          updateUsersState={updateUsersState}
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
            {sortedUsers.map((user) => (
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
                      <img src={EditIcon} alt="Edit" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.employeeID)}
                      className="employees__action"
                    >
                      Delete
                      <img src={TrashIcon} alt="Delete" />
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

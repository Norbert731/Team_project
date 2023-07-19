import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const ContactPopup = ({ togglePopup, user, setUser, updateUsersState }) => {
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.userID : "";
  const [contact, setContact] = useState({
    userID: userId,
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    position: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      // Convert the date to "yyyy-MM-dd" format
      const formattedDate = user.dateOfBirth.split("T")[0];
      setContact((prevContact) => ({
        ...prevContact,
        ...user,
        dateOfBirth: formattedDate,
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (user) {
        // Existing contact
        response = await axios.put(
          `https://localhost:7265/api/Employees/${contact.employeeID}`,
          { ...contact, employeeID: contact.employeeID }
        );
      } else {
        // New contact
        response = await axios.post(
          `https://localhost:7265/api/Employees`,
          contact
        );
      }

      if (response.status === 201 || response.status === 204) {
        console.log("Employee saved successfully");
        // Reset the form
        setContact({
          userID: userId,
          firstName: "",
          lastName: "",
          email: "",
          dateOfBirth: "",
          position: "",
          phone: "",
          address: "",
        });
        setUser(null); // Clear the edit user
        togglePopup(); // Close the popup
        updateUsersState();
      } else {
        console.log("Employee saving failed");
      }
    } catch (error) {
      console.error("An error occurred while saving the Employee", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dateOfBirth") {
      // Format the date to "yyyy-MM-dd" format
      const formattedDate = new Date(value).toISOString().split("T")[0];
      setContact((prevContact) => ({
        ...prevContact,
        [name]: formattedDate,
      }));
    } else {
      setContact((prevContact) => ({
        ...prevContact,
        [name]: value,
      }));
    }
  };

  const handleClose = () => {
    setContact({
      userID: userId,
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      position: "",
      phone: "",
      address: "",
    });
    setUser(null); // Clear the edit user
    togglePopup(); // Close the popup
  };

  console.log(contact);
  return (
    <>
      <div className="overlay" onClick={handleClose}></div>
      <div className="contact-form">
        <button
          onClick={handleClose}
          className="contact-form__close secondary-btn "
        >
          Close
        </button>
        <h2>{contact.firstName ? "Edit Employee" : "Add Employee"}</h2>
        <form onSubmit={handleSubmit} className="contact-form__form">
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={contact.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={contact.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={contact.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="position">Position:</label>
            <input
              type="text"
              id="position"
              name="position"
              value={contact.position}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={contact.address}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactPopup;

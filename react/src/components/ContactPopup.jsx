import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const ContactPopup = ({ togglePopup, user, setUser }) => {
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.userID : "";

  const [contact, setContact] = useState({
    userID: userId,
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    city: "",
  });

  useEffect(() => {
    if (user) {
      setContact(user);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      console.log(user);
      if (user) {
        // Existing contact
        response = await axios.put(
          `https://localhost:7265/api/ContactsList/${contact.contactID}`,
          contact
        );
      } else {
        // New contact
        response = await axios.post(
          `https://localhost:7265/api/ContactsList`,
          contact
        );
      }

      if (response.status === 201) {
        console.log("Contact saved successfully");
        // Reset the form
        setContact({
          userID: 0,
          firstName: "",
          lastName: "",
          email: "",
          gender: "",
          city: "",
        });
        togglePopup(); // Close the popup
      } else {
        console.log("Contact saving failed");
      }
    } catch (error) {
      console.error("An error occurred while saving the contact", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setContact({
      userID: 0,
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      city: "",
    });
    setUser(null); // Clear the edit user
    togglePopup(); // Close the popup
  };

  return (
    <>
      <div className="overlay" onClick={handleClose}></div>
      <div className="contact-form">
        <button onClick={handleClose} className="contact-form__close">
          Close
        </button>
        <h2>{contact.userID === 0 ? "Add Contact" : "Edit Contact"}</h2>
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
            <label htmlFor="gender">Gender:</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={contact.gender}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={contact.city}
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

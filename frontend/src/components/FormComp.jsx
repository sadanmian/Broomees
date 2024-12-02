/* eslint-disable no-unused-vars */
import React, { useState } from "react";

function FormComp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setIsSubmitting(true);
      console.log("Form Data:", formData);
      try {
        const response = await fetch("http://localhost:8080/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        console.log("API Response:", result);
        setSuccessMessage("Form submitted successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        setIsSubmitting(false);
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    }
  };

  return (
    <div className="right-panel">
      <div className="sign-in">
        <button>Sign In</button>
      </div>
      <h2>Explore & Experience</h2>
      <p>Get onto your most comfortable journey yet. All the way up.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <span className="error">{errors.firstName}</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Get Started"}
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
}

export default FormComp;

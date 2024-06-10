"use client";

import { FormEvent } from "react";

const EmployeeApplicationForm = () => {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault;

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    // Handle response if necessary
    const data = await response.json();
    // ....

    if (response.ok) {
      alert("Form submitted sucessfully!");
    } else {
      alert("Error occurred submitting form. Try again later.");
    }
  }

  return (
    <>
      {/* <form onSubmit={onSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form> */}
    </>
  );
};

export default EmployeeApplicationForm;

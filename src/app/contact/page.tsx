"use client";

import React, { FormEvent } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

emailjs.init("XYCXeYWt28fkRnocH");

const Contact = () => {
  const handleContactForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });
    emailjs
      .send("service_xvdnhxd", "template_cecilgl", {
        to_name: "amitbadala07@gmail.com",
        from_name: "thehroad.com",
        message: JSON.stringify(data, null, 2),
      })
      .then((response) => {
        toast.success("Contact form sent successfully");
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.error("Error sending email:", error);
      });
  };

  return (
    <section
      id="contact"
      className="section-sm"
      style={{
        backgroundImage: 'url("/images/location.png")',
        backgroundSize: "contain",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        paddingBottom: 400,
      }}
    >
      <div className="container">
        <h2 className="mb-4 text-center text-blue-600">Contact</h2>
        <h4
          className="pb-10 text-center"
          style={{
            fontWeight: 100,
            padding: "10px 20px",
            background: "white",
            border: "1px solid #5f18e7",
          }}
        >
          Contact Us: Stay connected, share your feedback, or simply say hello.
        </h4>
        <div className="row">
          <div
            className="mx-auto md:col-10 lg:col-6"
            style={{
              fontWeight: 100,
              padding: "10px 20px",
              background: "white",
              border: "1px solid #5f18e7",
              borderTop: "unset",
              textAlign: "center",
            }}
          >
            {/* <form onSubmit={handleContactForm} method="POST">
              <div className="mb-6">
                <label htmlFor="name" className="form-label">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  className="form-input"
                  placeholder="John Doe"
                  type="text"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="mail" className="form-label">
                  Email id <span className="text-red-500">*</span>
                </label>
                <input
                  name="mail"
                  className="form-input"
                  placeholder="john.doe@email.com"
                  type="email"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-input"
                  placeholder="Message goes here..."
                  name="message"
                  rows={8}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </form> */}
            NOVELTY CREATIONS SHOP NO E-199 NEW TEXTILE MARKET RING ROAD SURAT
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Contact;

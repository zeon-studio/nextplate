"use client";

import { FormEvent, useState } from "react";

const EmployeeApplicationForm = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      // Handle response if necessary
      const data = await response.json();
      console.log("DATA: ", data);
      // ....
    } catch (err) {
      const error = err as Error;
      // Capture the error message to display to the user
      setError(error.message);
    } finally {
      setLoading(false);
    }

    // if (response.ok) {
    //   alert("Form submitted sucessfully!");
    // } else {
    //   alert("Error occurred submitting form. Try again later.");
    // }
  }

  return (
    <>
      <div className="animate-fade ease-in mx-auto md:col-6 mb-20 md:mb-0">
        {error && <div className="text-red-500 ">{error}</div>}
        <form onSubmit={onSubmit} method="POST">
          <div className="flex flex-wrap md:-mx-6 mx-8">
            <div className="w-full md:w-1/2 px-1 md:mb-6 mb-3">
              <label htmlFor="name" className="form-label text-dark-grey">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                placeholder="Name"
                type="text"
              />
            </div>
            {/* <div className="w-full md:w-1/2 px-1 md:mb-6 mb-3">
              <label htmlFor="lname" className="form-label text-dark-grey">
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                id="lname"
                name="lname"
                className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                placeholder="Last name"
                type="text"
              />
            </div> */}
            <div className="w-full md:w-1/2 px-1 md:mb-6 mb-3">
              <label htmlFor="email" className="form-label text-dark-grey">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                placeholder="john.doe@email.com"
                type="email"
              />
            </div>
            {/* <div className="w-full md:w-1/2 px-1 md:mb-6 mb-3">
              <label htmlFor="interest" className="form-label text-dark-grey">
                Area of Interest <span className="text-red-500">*</span>
              </label>
              <input
                id="interest"
                name="interest"
                className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                placeholder="I am interested in..."
              />
            </div> */}
            <div className="w-full px-1 md:mb-6 mb-3">
              <label htmlFor="message" className="form-label text-dark-grey">
                Anything else? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full border-mischka"
                placeholder="Leave a message..."
                rows={7}
              ></textarea>
            </div>
            <div className="px-1">
              <button
                type="submit"
                className="btn btn-primary hover:bg-dark-grey hover:border-dark-grey shadow-sm w-full"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmployeeApplicationForm;

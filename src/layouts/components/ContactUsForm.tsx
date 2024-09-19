"use client";

import { FormEvent, useState, useEffect } from "react";

const ContactUsForm = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(false);

    try {
      // Create FormData from the event target
      const formData = new FormData(event.currentTarget);

      //   Submit the form data
      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }
      //   else {
      //     setSucess("Form submitted successfully!");
      //   }
    } catch (err) {
      const error = err as Error;
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {/* Form */}
      <div className="animate-fade ease-in mx-auto md:col-6 mb-20 md:mb-0">
        <div className="flex items-center md:col-6 col-7 pb-6 py-5">
          <div className="flex-grow border opacity-40 border-t border-light-green invisible lg:visible"></div>
          <h5 className="lg:mx-4 text-dark-green text-xl font-light tracking-widest">
            Let&apos;s Connect
          </h5>
          <div className="flex-grow border opacity-40 border-t border-light-green invisible lg:visible"></div>
        </div>
        <form method="POST" onSubmit={onSubmit}>
          <div className="flex flex-wrap md:-mx-6 mx-8">
            <div className="w-full md:w-1/2 px-1 md:mb-6 mb-3">
              <label htmlFor="fname" className="form-label text-dark-grey">
                First name <span className="text-red-500">*</span>
              </label>
              <input
                id="fname"
                name="fname"
                className="form-input bg-light-grey shadow-sm placeholder-gray-400 w-full h-12 border-mischka"
                placeholder="First name"
                type="text"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-1 md:mb-6 mb-3">
              <label htmlFor="lname" className="form-label text-dark-grey">
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                id="lname"
                name="lname"
                className="form-input bg-light-grey shadow-sm placeholder-gray-400 w-full h-12 border-mischka"
                placeholder="Last name"
                type="text"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-1 md:mb-6 mb-3">
              <label htmlFor="email" className="form-label text-dark-grey">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                className="form-input bg-light-grey shadow-sm placeholder-gray-400 w-full h-12 border-mischka"
                placeholder="john.doe@email.com"
                type="email"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-1 md:mb-6 mb-3">
              <label htmlFor="interest" className="form-label text-dark-grey">
                Area of Interest <span className="text-red-500">*</span>
              </label>
              <input
                id="interest"
                name="interest"
                className="form-input bg-light-grey shadow-sm placeholder-gray-400 w-full h-12 border-mischka"
                placeholder="I am interested in..."
                required
              />
            </div>
            <div className="w-full px-1 md:mb-6 mb-3">
              <label htmlFor="message" className="form-label text-dark-grey">
                Anything else? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                className="form-input bg-light-grey shadow-sm placeholder-gray-400 w-full border-mischka"
                placeholder="Leave a message..."
                rows={7}
                required
              ></textarea>
            </div>

            {/* Submit form button */}
            <div className="px-1">
              <button
                type="submit"
                className="btn btn-primary hover:bg-dark-grey hover:border-dark-grey shadow-sm w-full"
                disabled={isLoading}
              >
                <svg
                  aria-hidden="true"
                  className={`${isLoading ? "inline w-6 h-6 text-gray-200 animate-spin fill-blue-600 mr-2" : "hidden"}`}
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                {isLoading ? "Loading..." : "Send message"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactUsForm;

"use client";

import Image from "next/image";

interface SuccessMessageProps {
  return_to_link: string; // Expecting a string as a prop
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ return_to_link }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
      <div className="relative bg-white py-10 px-14 rounded-md shadow-lg text-center">
        <h3 className="font-bold text-dark-green font-primary">
          Thank you for submitting
        </h3>
        <div className="flex items-center justify-center">
          <Image
            src={"/images/send-mail.png"}
            width={512}
            height={512}
            alt="Message icon"
            className="max-w-[160px] w-3/5"
          />
        </div>
        <div className="text-dark-grey mb-6">
          <p>Your form submission has been received.</p>
          <p>We will be in touch with you shortly.</p>
        </div>
        <a
          href={return_to_link}
          className="mx-4 text-white rounded-md bg-blue-500 hover:bg-blue-600 py-2 text-center flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Return to site
        </a>
      </div>
    </div>
  );
};

export default SuccessMessage;

"use client";

import Image from "next/image";

interface SubmissionMessageProps {
  title: string;
  message: string;
  submessage?: string;
  return_to_link: string;
  image: string;
}

const SubmissionMessage: React.FC<SubmissionMessageProps> = ({
  title,
  message,
  submessage,
  return_to_link,
  image,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
      <div className="relative bg-white py-10 px-8 rounded-md shadow-lg text-center">
        <h3 className="font-bold text-dark-green font-primary">{title}</h3>
        <div className="flex items-center justify-center p-2">
          <Image
            src={image}
            width={512}
            height={512}
            alt="Message icon"
            className="max-w-[160px] w-3/5"
          />
        </div>
        <div className="text-dark-grey mb-6">
          <p>{message}</p>
          <p>{submessage}</p>
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

export default SubmissionMessage;

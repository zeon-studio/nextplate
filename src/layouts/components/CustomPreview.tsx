import React from "react";

interface JobPreviewProps {
  document: {
    fname?: string;
    lname?: string;
    jobPositionID?: {
      jobTitle?: string;
    };
    jobSnapshot?: {
      jobTitle?: string;
    };
  };
}

const CustomPreview: React.FC<JobPreviewProps> = ({ document }) => {
  const { fname, lname, jobPositionID, jobSnapshot } = document || {};
  const jobTitleFromRef = jobPositionID?.jobTitle;
  const jobTitleFromSnapshot = jobSnapshot?.jobTitle;

  return (
    <div>
      <strong>
        {fname} {lname}
      </strong>
      <div>
        {jobTitleFromRef ? (
          <span>Applied for: {jobTitleFromRef}</span>
        ) : jobTitleFromSnapshot ? (
          <span>
            Applied for:{" "}
            <span style={{ color: "red" }}>
              {jobTitleFromSnapshot} (Removed)
            </span>
          </span>
        ) : (
          <span>No data available</span>
        )}
      </div>
    </div>
  );
};

export default CustomPreview;

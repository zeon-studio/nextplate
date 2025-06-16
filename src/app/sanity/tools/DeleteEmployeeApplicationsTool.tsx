"use client";

import React, { useState, useEffect } from "react";
import { Tool } from "sanity";

const DeleteEmployeeApplicationsToolComponent: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [jobPositions, setJobPositions] = useState<
    Record<string, { jobTitle: string; location: string }>
  >({});

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("/api/sanity-get-employee-applications");
        if (response.ok) {
          const data = await response.json();

          if (Array.isArray(data)) {
            setApplications(data);

            const jobPositionIds = data
              .map((app: any) => app.jobPositionID?._ref)
              .filter(Boolean);

            await fetchJobPositions(jobPositionIds);
          } else {
            setApplications([]); // Make sure table doesn’t crash
          }
        } else {
          setStatus("Failed to fetch applications");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setStatus("Error fetching applications: " + String(error));
      }
    };

    fetchApplications();
  }, []);

  const fetchJobPositions = async (ids: string[]) => {
    const uniqueIds = [...new Set(ids)];

    const idsToFetch = uniqueIds.filter((id) => !jobPositions[id]);

    if (idsToFetch.length === 0) return;

    const newJobPositions: Record<
      string,
      { jobTitle: string; location: string }
    > = {};

    await Promise.all(
      idsToFetch.map(async (id) => {
        try {
          const response = await fetch(`/api/sanity-get-job-position?id=${id}`);
          const data = await response.json();
          console.log("Response: ", response);
          newJobPositions[id] = {
            jobTitle: data.jobTitle,
            location: data.location,
          };
        } catch (error) {
          console.error(`Error fetching job position for ID ${id}:`, error);
          newJobPositions[id] = {
            jobTitle: `Error fetching job position (error: ${error})`,
            location: `Error fetching location (error: ${error})`,
          };
        }
      }),
    );

    // Important: this merges jobPositions correctly
    setJobPositions((prev) => ({ ...prev, ...newJobPositions }));
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  };

  const handleDeleteSelected = async () => {
    if (!selectedIds.length) {
      setStatus("No applications selected for deletion");
      return;
    }

    try {
      const response = await fetch("/api/sanity-delete-selected-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(data.message);
        setApplications((prev) =>
          prev.filter((app) => !selectedIds.includes(app._id)),
        );
        setSelectedIds([]);
      } else {
        setStatus("Error occurred during deletion");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      setStatus("Error occurred during deletion");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-dark-grey">
        Delete Employee Applications
      </h1>

      {applications.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Select
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Job Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Job Location
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Job Position ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Date of Application
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Is Job Position still Available?
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => {
              console.log("Applications: ", app);
              const jobPositionID = app.jobPositionID?._ref;
              const job = jobPositions[jobPositionID] || {};
              const isUnavailable =
                job.jobTitle === undefined || job.location === undefined;

              return (
                <tr key={app._id} className={isUnavailable ? "bg-red-100" : ""}>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(app._id)}
                      onChange={() => handleCheckboxChange(app._id)}
                      className="mr-2"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {app.fname} {app.mname || ""} {app.lname}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 ${
                      job.jobTitle === "" ? "text-red-600 font-bold" : ""
                    }`}
                  >
                    {job.jobTitle
                      ? job.jobTitle
                      : `${app.jobSnapshot.jobTitle}`}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 ${
                      job.location === "" ? "text-red-600 font-bold" : ""
                    }`}
                  >
                    {job.location
                      ? job.location
                      : `${app.jobSnapshot.jobLocation}`}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {jobPositionID || "Position no longer exists"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {app.dateOfApplication}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {isUnavailable ? (
                      <span>
                        The <b>{app.jobSnapshot.jobTitle}</b> title at location{" "}
                        <b>{app.jobSnapshot.jobLocation}</b> no longer exists
                      </span>
                    ) : (
                      <span>
                        <b>Yes</b>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No employee applications available</p>
      )}

      <button
        onClick={handleDeleteSelected}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete Selected Applications
      </button>

      {status && <p className="mt-4 text-gray-700">{status}</p>}
    </div>
  );
};

// Define the Tool object
const DeleteEmployeeApplicationsTool: Tool = {
  name: "delete-employee-applications-tool",
  title: "Delete Employee Applications Tool",
  component: DeleteEmployeeApplicationsToolComponent,
};

export default DeleteEmployeeApplicationsTool;

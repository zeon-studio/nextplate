"use client";

import { useState } from "react";

const EditableCard = () => {
  const [isEditableTitle, setIsEditableTitle] = useState(false);
  const [originalContentTitle, setOriginalContentTitle] = useState(
    "Editable content goes here...",
  );
  const [editedContentTitle, setEditedContentTitle] = useState(
    "Editable content goes here...",
  );

  const toggleEditMode = () => {
    setIsEditableTitle(!isEditableTitle);
    if (!isEditableTitle) {
      setEditedContentTitle(originalContentTitle);
    }
  };

  const handleSave = () => {
    // You can add save functionality here
    setOriginalContentTitle(editedContentTitle);
    setIsEditableTitle(false);
  };

  const handleCancel = () => {
    // Reset edited content and exit edit mode
    setEditedContentTitle(originalContentTitle);
    setIsEditableTitle(false);
  };

  return (
    <div className="max-w-2xl mx-auto my-4 bg-white shadow-md rounded-md overflow-hidden">
      {/* Card Header */}
      {/* <div className="px-6 py-4 bg-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Editable Card</h2>
      </div> */}

      {/* Card Body */}
      <div className="p-6">
        {/* Editable content */}

        <div>
          <h5 className="text-dark-grey">Job Title</h5>
          <div
            contentEditable={isEditableTitle}
            className="text-gray-700 mb-4 border-b border-gray-300"
            suppressContentEditableWarning={true}
            onBlur={(e) => setEditedContentTitle(e.target.innerText)}
          >
            {editedContentTitle}
          </div>
        </div>

        <div>
          <h5 className="text-dark-grey">Location</h5>
          <div
            contentEditable={isEditableTitle}
            className="text-gray-700 mb-4 border-b border-gray-300"
            suppressContentEditableWarning={true}
            onBlur={(e) => setEditedContentTitle(e.target.innerText)}
          >
            {editedContentTitle}
          </div>
        </div>

        {/* Edit button */}
        {!isEditableTitle && (
          <button
            onClick={toggleEditMode}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {/* {isEditableTitle ? "Cancel" : "Edit"} */}
            Edit
          </button>
        )}

        {/* Save and Cancel buttons */}
        {isEditableTitle && (
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-md mr-2 hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableCard;

"use client";

import { useState } from "react";

const EditableCard = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [originalContent, setOriginalContent] = useState(
    "Editable content goes here...",
  );
  const [editedContent, setEditedContent] = useState(
    "Editable content goes here...",
  );

  const toggleEditMode = () => {
    setIsEditable(!isEditable);
    if (!isEditable) {
      setEditedContent(originalContent);
    }
  };

  const handleSave = () => {
    // You can add save functionality here
    setOriginalContent(editedContent);
    setIsEditable(false);
  };

  const handleCancel = () => {
    // Reset edited content and exit edit mode
    setEditedContent(originalContent);
    setIsEditable(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
      {/* Card Header */}
      <div className="px-6 py-4 bg-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Editable Card</h2>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Editable content */}
        <div
          contentEditable={isEditable}
          className="text-gray-700 mb-4 border-b border-gray-300"
          suppressContentEditableWarning={true}
          onBlur={(e) => setEditedContent(e.target.innerText)}
        >
          {editedContent}
        </div>

        {/* Edit button */}
        <button
          onClick={toggleEditMode}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mb-2"
        >
          {isEditable ? "Cancel" : "Edit"}
        </button>

        {/* Save and Cancel buttons */}
        {isEditable && (
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

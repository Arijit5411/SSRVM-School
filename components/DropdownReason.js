import React from "react";

const DropdownReason = (props) => {
const {handleChange,selectedReasioError, selectedOption}=props
  return (
    <div>
      <div className="error">{selectedReasioError}</div>
      <div className="input_contact_popup mt-2">
        <select value={selectedOption} onChange={handleChange}>
          <option value="">Select Reason</option>
          <option value="To meet Principal">To meet Principal</option>
          <option value="To meet Administrator">To meet Administrator</option>
          <option value="To meet class teacher">To meet class teacher</option>
          <option value="Any other reason">Any other reason</option>
        </select>
      </div>
    </div>
  );
};

export default DropdownReason;

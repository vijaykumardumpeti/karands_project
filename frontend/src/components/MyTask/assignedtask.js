import React, { useState } from "react";
import MyTaskSideBar from "./MyTaskSideBar";
import MyTaskDetails from "./MyTaskDetails";
// import Box from '@mui/material/Box';
import { Button } from "@mui/material";

export default function Assignedtask() {
  const [inputValue, setInputValue] = useState("");
  const [showCompanies,setShowCompanies]=useState(false)
  const [isExpanding, setIsExpanding] = useState(false); // New state for expanding animation
  const [isFocused, setIsFocused] = useState(false); // New state for focus
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsExpanding(false);

    // setShowSuggestions(false)
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="" style={{ overflow: "scroll" }}>
      <div className="row flex-nowrap" style={{ width: "100%" }}>
        <MyTaskSideBar userPage="mytask" />
        <div className="col container" style={{ maxWidth: "80%" }}>
          <MyTaskDetails />

          <div className={`search-bar-container ${isFocused ? "focused" : ""}`}>
            <div className="search-icon" style={{ display: "flex" }}>
              <div className="InputContainer">
                <input
                  type="text"
                  placeholder="Search..."
                  onFocus={handleInputFocus}
                  onKeyUp={(e) => handleInputChange(e)}
                  onBlur={handleInputBlur}
                  className={`form-control ${isExpanding ? "expanding" : ""}`}
                  id="Searchbar-Input"
                />
              </div>

              <div style={{ marginLeft: "10px" }}>
                <Button onClick={() => setShowCompanies(false)}>Users</Button>
                <Button onClick={() => setShowCompanies(true)}>
                  Companies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

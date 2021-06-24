import React from "react";
import Navbar from "../Navbar/Navbar";

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="main">
        <div className="d-flex justify-content-center align-items-center h-100 p-2">
          <div className="text-center">
            <h1 className="hero-text">To Do List App</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;

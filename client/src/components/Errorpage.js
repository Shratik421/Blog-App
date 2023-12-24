import React from "react";
import { NavLink } from "react-router-dom";

const Errorpage = () => {
  return (
    <>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>WE ARE SORRY , PAGE NOT FOUND!</h2>
          <p className="mb-5">
            The page you are lookinng for mght have been removed had its name
            changed or is temporarily unavailable.
          </p>
          <NavLink to="/"> Back To Homepage</NavLink>
        </div>
      </div>
    </>
  )
}

export default Errorpage;

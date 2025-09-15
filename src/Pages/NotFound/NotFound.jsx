// <==========> <==========> <==========>
// <==========> NotFound.jsx imports <==========>
// <==========> <==========> <==========>
import "./NotFound.css";
import React from "react";
import not_found from "../../assets/Pictures/Not_Found.jpg";

// <==========> <==========> <==========>
// <==========> NotFound.jsx Component <==========>
// <==========> <==========> <==========>
const NotFound = () => {
  // <==========> NotFound.jsx Render <==========>
  return (
    <div className="not_found">
      <div id="container">
        <div className="not_found__container">
          <figure>
            <img src={not_found} alt="Not_Found.jpg" />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

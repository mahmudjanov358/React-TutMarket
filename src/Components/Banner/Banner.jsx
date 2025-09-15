// <==========> <==========> <==========>
// <==========> Banner.jsx imports <==========>
// <==========> <==========> <==========>
import React from "react";
import frame_1 from "../../assets/Pictures/Frame_1686560504.png";
import frame_2 from "../../assets/Pictures/Frame_1686560505.png";
import frame_3 from "../../assets/Pictures/Frame_1686560506.png";

// <==========> <==========> <==========>
// <==========> Banner.jsx Component <==========>
// <==========> <==========> <==========>
const Banner = () => {
  // <==========> Banner.jsx Render <==========>
  return (
    <div className="banner">
      <div id="container">
        <div
          className="banner__container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            padding: "0.5rem 1rem",
          }}
        >
          <div>
            <figure>
              <img
                src={frame_1}
                alt="Frame_1686560504.png"
                width={"100%"}
                height={"auto"}
              />
            </figure>
          </div>
          <div>
            <figure>
              <img
                src={frame_2}
                alt="Frame_1686560505.png"
                width={"100%"}
                height={"auto"}
              />
            </figure>
          </div>
          <div>
            <figure>
              <img
                src={frame_3}
                alt="Frame_1686560506.png"
                width={"100%"}
                height={"auto"}
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

// <==========> <==========> <==========>
// <==========> Footer_1.jsx Imports <==========>
// <==========> <==========> <==========>
import React from "react";

// <==========> <==========> <==========>
// <==========> Footer_1.jsx Component <==========>
// <==========> <==========> <==========>
const Footer_1 = () => {
  // <==========> Footer_1.jsx Render <==========>
  return (
    <footer className="footer_1">
      <div id="container">
        <section
          className="footer_1__container"
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
                src="https://cdn.cody.mn/img/348283/569x1019xwebp/Container.png?h=2277ca5ee7e5cfe43f9f3e6f1978a85f38064eaf"
                alt="Container.png"
                width={"100%"}
                height={"auto"}
                style={{ borderRadius: "1rem" }}
              />
            </figure>
          </div>
          <div>
            <figure>
              <img
                src="https://cdn.cody.mn/img/348551/569x1019xwebp/Contain2er.png?h=2277ca5ee7e5cfe43f9f3e6f1978a85f38064eaf"
                alt="Contain2er.png"
                width={"100%"}
                height={"auto"}
                style={{ borderRadius: "1rem" }}
              />
            </figure>
          </div>
          <div>
            <figure>
              <img
                src="https://cdn.cody.mn/img/284125/569x1019xwebp/Container.png?h=2277ca5ee7e5cfe43f9f3e6f1978a85f38064eaf"
                alt="Container.png"
                width={"100%"}
                height={"auto"}
                style={{ borderRadius: "1rem" }}
              />
            </figure>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer_1;

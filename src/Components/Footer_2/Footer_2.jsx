// <==========> <==========> <==========>
// <==========> Footer_2.jsx Imports <==========>
// <==========> <==========> <==========>
import React from "react";
import { Link } from "react-router-dom";

// <==========> Footer_2.jsx Massive <==========>
const footer_2__massive = [
  {
    id: 1,
    image:
      "https://cdn.cody.mn/img/268243/732x332xwebp/Inner_Banner_Desctop.jpg?h=3a65050f941002458b7ee8b88dab48b8349d902c",
    imageAlt: "Inner_Banner_Desctop.jpg",
    linkTo: "/",
  },
  {
    id: 2,
    image:
      "https://cdn.cody.mn/img/268244/732x332xwebp/Inner_Banner_Desctop-1.jpg?h=3a65050f941002458b7ee8b88dab48b8349d902c",
    imageAlt: "Inner_Banner_Desctop-1.jpg",
    linkTo: "/",
  },
  {
    id: 3,
    image:
      "https://cdn.cody.mn/img/268245/732x332xwebp/Inner_Banner_Desctop-2.jpg?h=3a65050f941002458b7ee8b88dab48b8349d902c",
    imageAlt: "Inner_Banner_Desctop-2.jpg",
    linkTo: "/",
  },
  {
    id: 4,
    image:
      "https://cdn.cody.mn/img/268246/732x332xwebp/Inner_Banner_Desctop-3.jpg?h=3a65050f941002458b7ee8b88dab48b8349d902c",
    imageAlt: "Inner_Banner_Desctop-3.jpg",
    linkTo: "/",
  },
];

// <==========> <==========> <==========>
// <==========> Footer_2.jsx Component <==========>
// <==========> <==========> <==========>
const Footer_2 = () => {
  // <==========> Footer_2.jsx Render <==========>
  return (
    <footer className="footer_2">
      <div id="container">
        <section className="footer_2__container">
          {/* <==========> Footer_2__container__left: Banner <==========> */}
          <div
            className="footer_2__container__left"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              padding: "0.5rem 1rem",
            }}
          >
            {footer_2__massive.map((item) => {
              return (
                <Link to={item.linkTo} key={item.id}>
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    width={"100%"}
                    height={"auto"}
                    style={{ borderRadius: "1rem" }}
                  />
                </Link>
              );
            })}
          </div>

          {/* <==========> Footer_2__container__right: Links <==========> */}
          <div className="footer_2__container__right">
            <figure>
              <img
                src="https://cdn.cody.mn/img/267601/1800x565xwebp/Inner_Banner_Desctop-1.png?h=7b41bacea0e33df1cd5e806b766a9276ce0e9ce9"
                alt="Inner_Banner_Desctop-1.png"
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

export default Footer_2;

// <==========> <==========> <==========>
// <==========> Header_3.jsx Imports <==========>
// <==========> <==========> <==========>
import "./Header_3.css";
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { t } from "../../i18n";

// <==========> <==========> <==========>
// <==========> Header_3.jsx Massive <==========>
// <==========> <==========> <==========>
const header_3__massive = [
  { id: 1, key: "cat_gobozor", linkTo: "/" },
  { id: 2, key: "cat_ikea", linkTo: "/" },
  { id: 3, key: "cat_decathlon", linkTo: "/" },
  { id: 4, key: "cat_new_products", linkTo: "/" },
  { id: 5, key: "cat_brands", linkTo: "/" },
  { id: 6, key: "cat_gifts", linkTo: "/" },
  { id: 7, key: "cat_discounts", linkTo: "/" },
];

// <==========> <==========> <==========>
// <==========> Header_3.jsx Component <==========>
// <==========> <==========> <==========>
const Header_3 = () => {
  // <==========> Header_3.jsx Render <==========>
  const { lang } = useContext(Context);
  return (
    <header className="header_3">
      <div id="container">
        <section className="header_3__container">
          {header_3__massive.map((item) => {
            return (
              <Link to={item.linkTo} key={item.id}>
                {t(lang, item.key)}
              </Link>
            );
          })}
        </section>
      </div>
    </header>
  );
};

export default Header_3;

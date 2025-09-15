// <==========> <==========> <==========>
// <==========> Admin.jsx imports <==========>
// <==========> <==========> <==========>
import "./Admin.css";
import React from "react";
import AdminSlide from "./AdminSlide/AdminSlide";
import AdminCategories from "./AdminCategories/AdminCategories";
import AdminProduct from "./AdminProduct/AdminProduct";

// <==========> <==========> <==========>
// <==========> Admin.jsx Component <==========>
// <==========> <==========> <==========>
const Admin = () => {
  return (
    <div className="admin">
      <div id="container">
        <div className="admin__container">
          {/* <==========> Admin__container__left: Slide <==========> */}
          <AdminSlide />

          {/* <==========> Admin__container__middle: Categories <==========> */}
          <AdminCategories />

          {/* <==========> Admin__container__right: Product <==========> */}
          <AdminProduct />
        </div>
      </div>
    </div>
  );
};

export default Admin;

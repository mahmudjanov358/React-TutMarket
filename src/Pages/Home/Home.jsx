// <==========> <==========> <==========>
// <==========> Home.jsx Imports <==========>
// <==========> <==========> <==========>
import React from "react";
import Slide from "../../Components/Slide/Slide";
import Banner from "../../Components/Banner/Banner";
import Categories from "../../Components/Categories/Categories";
import Products from "../../Components/Products/Products";
import Footer_1 from "../../Components/Footer_1/Footer_1";
import Footer_2 from "../../Components/Footer_2/Footer_2";

// <==========> <==========> <==========>
// <==========> Home.jsx Component <==========>
// <==========> <==========> <==========>
const Home = () => {
  // <==========> Home.jsx Render <==========>
  return (
    <main>
      <Slide />
      <Banner />
      <Categories />
      <Products />
      <Footer_1 />
      <Footer_2 />
    </main>
  );
};

export default Home;

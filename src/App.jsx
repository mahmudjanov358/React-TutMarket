// <==========> <==========> <==========>
// <==========> App.jsx imports <==========>
// <==========> <==========> <==========>
import "./App.css";
import Header_1 from "./Components/Header_1/Header_1";
import Header_2 from "./Components/Header_2/Header_2";
import Header_3 from "./Components/Header_3/Header_3";
import Footer_3 from "./Components/Footer_3/Footer_3";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Admin from "./Pages/Admin/Admin";
import Cart from "./Pages/Cart/Cart";
import Favorite from "./Pages/Favorite/Favorite";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import SinglePage from "./Pages/SinglePage/SinglePage";
import NotFound from "./Pages/NotFound/NotFound";

// <==========> <==========> <==========>
// <==========> App.jsx Root File <==========>
// <==========> <==========> <==========>
function App() {
  // <==========> App.jsx State <==========>
  const localtion = useLocation();
  if (localtion.pathname === "/sign-in" || localtion.pathname === "/sign-up") {
    return (
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    );
  }
  if (localtion.pathname === "/admin") {
    return (
      <>
        <Header_1 />
        <Header_2 />
        <Header_3 />
        <Routes>
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer_3 />
      </>
    );
  }

  // <==========> App.jsx Render <==========>
  return (
    <>
      {/* <==========> Headers <==========> */}
      <Header_1 />
      <Header_2 />
      <Header_3 />

      {/* <==========> Routes <==========> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/product/:id" element={<SinglePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* <==========> Footer <==========> */}
      <Footer_3 />
    </>
  );
}

export default App;

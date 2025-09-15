// <==========> <==========> <==========>
// <==========> main.jsx Imports <==========>
// <==========> <==========> <==========>
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Provider from "./Context/Context";

// <==========> <==========> <==========>
// <==========> main.jsx Code <==========>
// <==========> <==========> <==========>
createRoot(document.getElementById("root")).render(
  <>
    <Provider>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  </>
);

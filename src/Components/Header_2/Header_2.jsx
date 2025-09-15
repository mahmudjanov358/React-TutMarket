// <==========> <==========> <==========>
// <==========> Header_2.jsx Imports <==========>
// <==========> <==========> <==========>
import "./Header_2.css";
import React from "react";
import { IoIosMenu } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaWallet, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { PiStarFourFill } from "react-icons/pi";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { t } from "../../i18n";

// <==========> <==========> <==========>
// <==========> Header_2.jsx Component <==========>
// <==========> <==========> <==========>
const Header_2 = () => {
  // <==========> Header_2.jsx State <==========>
  const { profil, setProfil, setToken, lang } = useContext(Context);

  // <==========> Header_2.jsx Functions <==========>
  const handleLogout = () => {
    setToken(null);
    setProfil({});
    localStorage.removeItem("token");
    localStorage.removeItem("profil");
  };

  // <==========> Header_2.jsx Render <==========>
  return (
    <header className="header_2">
      <div id="container">
        <section className="header_2__container">
          {/* <==========> Header_2.jsx Left <==========> */}
          <div className="header_2__container__left">
            <Link to={"/"}>
              tut
              <sup>
                <PiStarFourFill />
              </sup>
            </Link>
          </div>

          {/* <==========> Header_2.jsx Middle <==========> */}
          <div className="header_2__container__middle">
            <button type="reset">
              <IoIosMenu /> <span>{t(lang, "catalog")}</span>
            </button>
          </div>

          {/* <==========> Header_2.jsx Right <==========> */}
          <div className="header_2__container__right">
            <form>
              <input
                type="search"
                placeholder={t(lang, "search_placeholder")}
              />

              <button>
                <FaSearch />
              </button>
            </form>
          </div>

          {/* <==========> Header_2.jsx Right Right <==========> */}
          <div className="header_2__container__right__right">
            {profil.id ? (
              <>
                <div>
                  <Link to={"/"}>
                    <FaWallet />
                    <span>{t(lang, "wallet")}</span>
                  </Link>
                </div>
                <div>
                  <Link to={"/favorite"}>
                    <FaHeart />
                    <span>{t(lang, "favorite")}</span>
                  </Link>
                </div>
                <div>
                  <Link to={"/cart"}>
                    <FaShoppingCart />
                    <span>{t(lang, "cart")}</span>
                  </Link>
                </div>
                <div>
                  <Link to={"/"}>
                    <FaUser />
                    <span>{profil.phone || t(lang, "profile")}</span>
                  </Link>
                </div>
                <div>
                  <Link to={"/sign-in"} onClick={handleLogout}>
                    <span>{t(lang, "logout")}</span>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div>
                    <Link to="/sign-in">{t(lang, "sign_in")}</Link>
                  </div>
                  <div>
                    <Link to="/sign-up">{t(lang, "sign_up")}</Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </header>
  );
};

export default Header_2;

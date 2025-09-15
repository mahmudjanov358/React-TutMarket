// <==========> <==========> <==========>
// <==========> Header_1.jsx Imports <==========>
// <==========> <==========> <==========>
import "./Header_1.css";
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { t } from "../../i18n";
import {
  FaInstagram,
  FaPhoneAlt,
  FaTelegram,
  FaFacebook,
} from "react-icons/fa";

// <==========> <==========> <==========>
// <==========> Header_1.jsx Component <==========>
// <==========> <==========> <==========>
const Header_1 = () => {
  // <==========> Header_1.jsx Render <==========>
  const { theme, setTheme, lang, setLang } = useContext(Context);

  const onThemeChange = (e) => {
    const value = e.target.value;
    setTheme(value);
  };

  const onLangChange = (e) => {
    const value = e.target.value;
    setLang(value);
  };
  return (
    <div className="header_1">
      <div id="container">
        <div className="header_1__container">
          {/* <==========> Header_1__left <==========> */}
          <div className="header_1__left">
            <p>{t(lang, "welcome")}</p>
          </div>

          {/* <==========> Header_1__right <==========> */}
          <div className="header_1__right">
            <div className="header_1__right__left">
              <div>
                <Link to={"/admin"}>Admin</Link>
              </div>
              <div>
                <Link to={"/"}>
                  <FaInstagram />
                </Link>
              </div>
              <div>
                <Link to={"/"}>
                  <FaTelegram />
                </Link>
              </div>
              <div>
                <Link to={"/"}>
                  <FaFacebook />
                </Link>
              </div>
              <div>
                <Link to={"/"}>
                  <FaPhoneAlt /> +99894 264 32 97
                </Link>
              </div>
              <div>
                <Link to={"/"}>Du-Ju, 9:00-20:00</Link>
              </div>
            </div>

            {/* <==========> Header_1__right__right <==========> */}
            <div className="header_1__right__right">
              <select value={theme} onChange={onThemeChange}>
                <option value="light">{t(lang, "light")}</option>
                <option value="dark">{t(lang, "dark")}</option>
              </select>
              <select value={lang} onChange={onLangChange}>
                <option value="uz">{t(lang, "uzbek")}</option>
                <option value="ru">{t(lang, "russian")}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header_1;

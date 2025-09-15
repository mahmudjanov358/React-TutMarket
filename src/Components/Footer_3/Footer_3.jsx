// <==========> <==========> <==========>
// <==========> Footer_3.jsx Imports <==========>
// <==========> <==========> <==========>
import "./Footer_3.css";
import React from "react";
import { Link } from "react-router-dom";
import { PiStarFourFill } from "react-icons/pi";
import { FaInstagram, FaTelegram, FaFacebook } from "react-icons/fa";

// <==========> <==========> <==========>
// <==========> Footer_3.jsx Component <==========>
// <==========> <==========> <==========>
const Footer_3 = () => {
  // <==========> Footer_3.jsx Render <==========>
  return (
    <footer className="footer_3">
      <div id="container">
        <section className="footer_3__container">
          {/* <==========> Footer_3__container__top <==========> */}
          <div className="footer_3__container__top">
            {/* <==========> Footer_3__container__top__left: Hepl <==========> */}
            <div className="footer_3__container__top__left">
              <h1>Yordam</h1>
              <ul>
                <li>
                  <Link to="/">Savollar va javoblar</Link>
                </li>
                <li>
                  <Link to="/">Maxfiylik siyosati</Link>
                </li>
                <li>
                  <Link to="/">Foydalanish shartlari</Link>
                </li>
              </ul>
            </div>

            {/* <==========> Footer_3__container__top__middle: About <==========> */}
            <div className="footer_3__container__top__middle">
              <h1>Kompaniya haqida</h1>
              <ul>
                <li>
                  <Link to="/">Biz haqimizda</Link>
                </li>
                <li>
                  <Link to="/">TUTdagi martaba</Link>
                </li>
                <li>
                  <Link to="/">TUTda soting</Link>
                </li>
              </ul>
            </div>

            {/* <==========> Footer_3__container__top__right: Contact <==========> */}
            <div className="footer_3__container__top__right">
              <h1>
                tut
                <sup>
                  <PiStarFourFill />
                </sup>
              </h1>

              {/* <==========> Footer_3__container__top__right__social: Social <==========> */}
              <div className="footer_3__container__top__right__social">
                <Link to="/">
                  <FaInstagram />
                </Link>
                <Link to="/">
                  <FaTelegram />
                </Link>
                <Link to="/">
                  <FaFacebook />
                </Link>
              </div>

              {/* <==========> Footer_3__container__top__right__contact: Contact <==========> */}
              <div className="footer_3__container__top__right__contact">
                <Link to="/">+99894 264 32 97</Link>
                <Link>info@tut.uz</Link>
              </div>
            </div>
          </div>

          {/* <==========> Footer_3__container__bottom: Copyright <==========> */}
          <div
            className="footer_3__container__bottom"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              padding: "0.5rem 1rem",
            }}
          >
            <p>© 2025 CODY LLC. Barcha huquqlar himoyalangan.</p>

            <article
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "18px",
              }}
            >
              <p>uchun ishlaydi</p>
              <Link to="/" style={{ color: "var(--green-color)" }}>
                cody
              </Link>
            </article>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer_3;

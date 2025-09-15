// <==========> <==========> <==========>
// <==========> Context.jsx imports <==========>
// <==========> <==========> <==========>
import React from "react";
import { api } from "../api";
import { toast } from "react-toastify";

// <==========> <==========> <==========>
// <==========> Context.jsx Code <==========>
// <==========> <==========> <==========>
export const Context = React.createContext();

// <==========> <==========> <==========>
// <==========> Context.jsx Provider <==========>
// <==========> <==========> <==========>
export default function Provider({ children }) {
  // <==========> Context.jsx State <==========>
  const [profil, setProfil] = React.useState(
    localStorage.getItem("profil")
      ? JSON.parse(localStorage.getItem("profil"))
      : {}
  );
  const [token, setToken] = React.useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );
  const [lang, setLang] = React.useState(localStorage.getItem("lang") || "uz");

  // <==========> Context.jsx Functions getMyProfil <==========>
  const getMyProfil = async () => {
    try {
      const { data, status } = await api.get(`/profil/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status === 200) {
        setProfil(data.profil);
        localStorage.setItem("profil", JSON.stringify(data.profil));
      }
    } catch (error) {
      console.error("getMyProfil error", error);
      if (error?.response?.status === 401) {
        setToken(null);
        setProfil({});
        localStorage.removeItem("token");
        localStorage.removeItem("profil");
        toast.warn(
          error?.response?.data?.message ||
            "Sessiya tugagan. Iltimos, qayta kiring."
        );
      }
    }
  };

  // <==========> Context.jsx Effects <==========>
  React.useEffect(() => {
    localStorage.getItem("token") ? getMyProfil() : null;
  }, [token]);

  React.useEffect(() => {
    getMyProfil();
  }, []);

  // <==========> Context.jsx Effects theme <==========>
  React.useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  // <==========> Context.jsx Effects lang <==========>
  React.useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);

  // <==========> Context.jsx Return <==========>
  return (
    <Context.Provider
      value={{
        profil,
        token,
        setToken,
        setProfil,
        theme,
        setTheme,
        lang,
        setLang,
      }}
    >
      {children}
    </Context.Provider>
  );
}

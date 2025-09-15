// <==========> <==========> <==========>
// <==========> SignUp.jsx Imports <==========>
// <==========> <==========> <==========>
import "./SignUp.css";
import React from "react";
import { api } from "../../api";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../Context/Context";

// <==========> <==========> <==========>
// <==========> SignUp.jsx Render <==========>
// <==========> <==========> <==========>
const SignUp = () => {
  // <==========> SignUp.jsx State <==========>
  const navigate = useNavigate();
  const { setToken } = useContext(Context);
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // <==========> SignUp.jsx Methods <==========>
  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // <==========> SignUp.jsx Submit <==========>
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { phone: form.phone, password: form.password };
      const { data, status } = await api.post(`/profil/create`, payload);
      if ((status === 201 || status === 200) && data?.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data?.message || "Ro'yxatdan o'tishda xatolik");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Ro'yxatdan o'tishda xatolik yuz berdi"
      );
    } finally {
      setLoading(false);
    }
  };

  // <==========> SignUp.jsx Render <==========>
  return (
    <div className="auth-page">
      <div className="auth-card compact">
        <form onSubmit={onSubmit} className="auth-form">
          <label>
            Telefon raqam (+998...)
            <input
              name="phone"
              type="tel"
              placeholder="+998951234567"
              value={form.phone}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Parol
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              required
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
          </button>
        </form>
        <p>
          Allaqachon hisob bormi? <Link to="/sign-in">Kirish</Link>
        </p>
        <p>
          <Link to="/">Bosh sahifa</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

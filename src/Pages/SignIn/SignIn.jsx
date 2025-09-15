// <==========> <==========> <==========>
// <==========> SignIn.jsx Imports <==========>
// <==========> <==========> <==========>
import "./SIgnIn.css";
import React from "react";
import { api } from "../../api";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../Context/Context";

// <==========> <==========> <==========>
// <==========> SignIn.jsx Component <==========>
// <==========> <==========> <==========>
const SignIn = () => {
  // <==========> SignIn.jsx State <==========>
  const navigate = useNavigate();
  const { setToken } = useContext(Context);
  const [form, setForm] = useState({ phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  // <==========> SignIn.jsx Methods <==========>
  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // <==========> SignIn.jsx Submit <==========>
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, status } = await api.post(`/profil/login`, {
        phone: form.phone,
        password: form.password,
      });
      if (status === 200 && data?.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(data?.message || "Tizimga kirildi!");
        navigate("/");
      } else {
        toast.error(data?.message || "Kirishda xatolik");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Kirishda xatolik yuz berdi";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // <==========> SignIn.jsx Render <==========>
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
              placeholder="Parol"
              value={form.password}
              onChange={onChange}
              required
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Yuklanmoqda..." : "Kirish"}
          </button>
        </form>
        <p>
          Hisob yo'qmi? <Link to="/sign-up">Ro'yxatdan o'tish</Link>
        </p>
        <p>
          <Link to="/">Bosh sahifa</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

// <==========> <==========> <==========>
// <==========> Cart.jsx Imports <==========>
// <==========> <==========> <==========>
import "./Cart.css";
import React from "react";
import { api } from "../../api";
import { toast } from "react-toastify";
import { Context } from "../../Context/Context";
import { Link } from "react-router-dom";

// <==========> <==========> <==========>
// <==========> Cart.jsx Component <==========>
// <==========> <==========> <==========>
const Cart = () => {
  // <==========> Cart.jsx State <==========>
  const { token } = React.useContext(Context);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // <==========> Cart.jsx Methods <==========>
  const loadCart = React.useCallback(() => {
    if (!token) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    api
      .get("/cart/my", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        const profil = res?.data?.profil || {};
        const carts = profil?.Carts || profil?.carts || profil?.Cart || [];
        const normalized = (carts || []).map((c) => ({
          id: c.id,
          quantity: c.quantity,
          product: c.product || c.Product || {},
        }));
        setItems(normalized);
      })
      .catch((err) => {
        console.error("Savatni yuklashda xatolik", err);
        toast.error(
          err?.response?.data?.message || "Savatni yuklashda xatolik"
        );
      })
      .finally(() => setLoading(false));
  }, [token]);

  // <==========> Cart.jsx Effects <==========>
  React.useEffect(() => {
    loadCart();
  }, [loadCart]);

  // <==========> Cart.jsx Methods <==========>
  const handleRemove = async (cartId) => {
    try {
      await api.delete(`/cart/delete/${cartId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.info("Savatdan o'chirildi!");
      setItems((prev) => prev.filter((i) => i.id !== cartId));
    } catch (err) {
      console.error("Savatdan o'chirishda xatolik", err);
      toast.error(
        err?.response?.data?.message || "Savatdan o'chirishda xatolik"
      );
    }
  };

  // <==========> Cart.jsx Render <==========>
  if (!token) {
    return (
      <div className="cart">
        <div id="container">
          <div className="cart__container">
            <p>Iltimos, savatni ko'rish uchun tizimga kiring.</p>
            <Link className="btn btn-primary" to="/sign-in">
              Tizimga kirish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // <==========> Cart.jsx Render <==========>
  return (
    <div className="cart">
      <div id="container">
        <h2>Savat</h2>
        {loading ? (
          <p>Yuklanmoqda...</p>
        ) : items.length === 0 ? (
          <p>Savatingiz bo'sh.</p>
        ) : (
          <div className="cart__grid">
            {items.map((item) => (
              <div className="cart__card card" key={item.id}>
                <div className="cart__image">
                  <img
                    src={item.product?.image}
                    alt={item.product?.imageAlt || item.product?.title}
                  />
                </div>
                <div className="cart__info">
                  <h3>{item.product?.title}</h3>
                  <p className="price">{item.product?.price}</p>
                  <div className="cart__actions">
                    <button
                      className="btn btn-outline"
                      onClick={() => handleRemove(item.id)}
                    >
                      O'chirish
                    </button>
                    <Link
                      className="btn btn-primary"
                      to={`/product/${item.product?.id}`}
                    >
                      Ko'rish
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

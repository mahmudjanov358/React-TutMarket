// <==========> <==========> <==========>
// <==========> Favorite.jsx Imports <==========>
// <==========> <==========> <==========>
import "./Favorite.css";
import React from "react";
import { api } from "../../api";
import { toast } from "react-toastify";
import { Context } from "../../Context/Context";
import { Link } from "react-router-dom";

// <==========> <==========> <==========>
// <==========> Favorite.jsx Component <==========>
// <==========> <==========> <==========>
const Favorite = () => {
  // <==========> Favorite.jsx Render <==========>
  const { token } = React.useContext(Context);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [posting, setPosting] = React.useState({});

  // <==========> Favorite.jsx Functions <==========>
  const loadFavorites = React.useCallback(() => {
    if (!token) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    api
      .get("/favorite/my", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        const favorites = res?.data?.favorite || res?.data?.favorites || [];
        const normalized = (favorites || []).map((f) => ({
          id: f.id,
          product: f.product || f.Product || {},
        }));
        setItems(normalized);
      })
      .catch((err) => {
        console.error("Sevimlilarni yuklashda xatolik", err);
        toast.error(
          err?.response?.data?.message || "Sevimlilarni yuklashda xatolik"
        );
      })
      .finally(() => setLoading(false));
  }, [token]);

  // <==========> Favorite.jsx Effects <==========>
  React.useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // <==========> Favorite.jsx Handlers <==========>
  const handleRemove = async (favId) => {
    try {
      await api.delete(`/favorite/delete/${favId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.info("Sevimlilardan o'chirildi!");
      setItems((prev) => prev.filter((i) => i.id !== favId));
    } catch (err) {
      console.error("Sevimlilardan o'chirishda xatolik", err);
      toast.error(
        err?.response?.data?.message || "Sevimlilardan o'chirishda xatolik"
      );
    }
  };

  // <==========> Favorite.jsx Handlers <==========>
  const handleAddToCart = async (productId) => {
    if (!token) {
      toast.warn("Iltimos, avval tizimga kiring!");
      return;
    }
    try {
      setPosting((p) => ({ ...p, [productId]: true }));
      const { data } = await api.post(
        "/cart/create",
        { product_id: Number(productId) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(data?.message || "Response");
    } catch (err) {
      const msg = err?.response?.data?.message;
      if (err?.response?.status === 400) {
        toast.info(msg || "Response");
      } else if (err?.response?.status === 401) {
        toast.warn(msg || "Sessiya tugagan. Qayta kiring.");
      } else {
        console.error("Savatga qo'shishda xatolik", err);
        toast.error(msg || "Savatga qo'shishda xatolik");
      }
    } finally {
      setPosting((p) => ({ ...p, [productId]: false }));
    }
  };

  // <==========> Favorite.jsx Render <==========>
  if (!token) {
    return (
      <div className="favorite">
        <div id="container">
          <div className="favorite__container">
            <p>Iltimos, sevimlilarni ko'rish uchun tizimga kiring.</p>
            <Link className="btn btn-primary" to="/sign-in">
              Tizimga kirish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // <==========> Favorite.jsx Render <==========>
  return (
    <div className="favorite">
      <div id="container">
        <h2>Sevimlilar</h2>
        {loading ? (
          <p>Yuklanmoqda...</p>
        ) : items.length === 0 ? (
          <p>Sevimlilar ro'yxati bo'sh.</p>
        ) : (
          <div className="favorite__grid">
            {items.map((item) => (
              <div className="favorite__card card" key={item.id}>
                <div className="favorite__image">
                  <img
                    src={item.product?.image}
                    alt={item.product?.imageAlt || item.product?.title}
                  />
                </div>
                <div className="favorite__info">
                  <h3>{item.product?.title}</h3>
                  <p className="price">{item.product?.price}</p>
                  <div className="favorite__actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(item.product?.id)}
                      disabled={posting[item.product?.id]}
                    >
                      {posting[item.product?.id]
                        ? "Yuklanmoqda..."
                        : "Savatga qo'shish"}
                    </button>
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

export default Favorite;

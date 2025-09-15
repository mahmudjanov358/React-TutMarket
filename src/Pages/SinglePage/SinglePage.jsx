// <==========> <==========> <==========>
// <==========> SinglePage.jsx Imports <==========>
// <==========> <==========> <==========>
import "./SinglePage.css";
import React from "react";
import { api } from "../../api";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../Context/Context";

// <==========> <==========> <==========>
// <==========> SinglePage.jsx Render <==========>
// <==========> <==========> <==========>
const SinglePage = () => {
  // <==========> SinglePage.jsx State <==========>
  const { id } = useParams();
  const { token } = React.useContext(Context);
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [posting, setPosting] = React.useState({
    cart: false,
    favorite: false,
  });

  // <==========> SinglePage.jsx Effects <==========>
  React.useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");
    api
      .get(`/product/by_pk/${id}`)
      .then((res) => {
        if (!isMounted) return;
        setProduct(res.data.product);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Mahsulotni yuklashda xatolik", err);
        setError("Mahsulotni yuklashda xatolik");
        toast.error("Mahsulotni yuklashda xatolik");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  // <==========> SinglePage.jsx Functions <==========>
  const requireAuth = () => {
    if (!token) {
      toast.warn("Iltimos, avval tizimga kiring!");
      return false;
    }
    return true;
  };

  const handleAddToCart = async () => {
    if (!requireAuth()) return;
    try {
      setPosting((p) => ({ ...p, cart: true }));
      const { data, status } = await api.post(
        "/cart/create",
        { product_id: Number(id) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (status === 200) {
        toast.success(data?.message || "Savatga qo'shildi!");
      } else {
        toast.info(data?.message || "Holat yangilandi");
      }
    } catch (err) {
      const msg = err?.response?.data?.message;
      if (err?.response?.status === 400) {
        toast.info(msg || "Savatdan o'chirildi!");
      } else if (err?.response?.status === 401) {
        toast.warn("Sessiya tugagan. Qayta kiring.");
      } else {
        console.error("Savatga qo'shishda xatolik", err);
        toast.error(msg || "Savatga qo'shishda xatolik");
      }
    } finally {
      setPosting((p) => ({ ...p, cart: false }));
    }
  };

  // <==========> SinglePage.jsx Functions <==========>
  const handleAddToFavorite = async () => {
    if (!requireAuth()) return;
    try {
      setPosting((p) => ({ ...p, favorite: true }));
      const { data, status } = await api.post(
        "/favorite/create",
        { product_id: Number(id) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (status === 200) {
        toast.success(data?.message || "Sevimlilarga qo'shildi!");
      } else {
        toast.info(data?.message || "Holat yangilandi");
      }
    } catch (err) {
      const msg = err?.response?.data?.message;
      if (err?.response?.status === 400) {
        toast.info(msg || "Sevimlilardan o'chirildi!");
      } else if (err?.response?.status === 401) {
        toast.warn("Sessiya tugagan. Qayta kiring.");
      } else {
        console.error("Sevimlilarga qo'shishda xatolik", err);
        toast.error(msg || "Sevimlilarga qo'shishda xatolik");
      }
    } finally {
      setPosting((p) => ({ ...p, favorite: false }));
    }
  };

  // <==========> SinglePage.jsx Loading <==========>
  if (loading) {
    return (
      <div className="single_page">
        <div id="container">
          <div className="single_page__container">
            <p>Yuklanmoqda...</p>
          </div>
        </div>
      </div>
    );
  }

  // <==========> SinglePage.jsx Error <==========>
  if (error) {
    return (
      <div className="single_page">
        <div id="container">
          <div className="single_page__container">
            <p style={{ color: "red" }}>{error}</p>
            <Link to="/">Bosh sahifaga qaytish</Link>
          </div>
        </div>
      </div>
    );
  }

  // <==========> SinglePage.jsx Not Found <==========>
  if (!product) {
    return (
      <div className="single_page">
        <div id="container">
          <div className="single_page__container">
            <p>Mahsulot topilmadi.</p>
            <Link to="/">Bosh sahifaga qaytish</Link>
          </div>
        </div>
      </div>
    );
  }

  // <==========> SinglePage.jsx Render <==========>
  return (
    <div className="single_page">
      <div id="container">
        <br />
        <div className="single_page__container">
          <div className="single_page__image">
            <img src={product.image} alt={product.imageAlt || product.name} />
          </div>
          <div className="single_page__info">
            <h2>{product.title}</h2>
            <p className="single_page__price">{product.price}</p>
            {product.description ? (
              <p className="single_page__desc">{product.description}</p>
            ) : null}
            <div className="single_page__actions">
              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={posting.cart}
              >
                {posting.cart ? "Yuklanmoqda..." : "Savatga qo'shish"}
              </button>{" "}
              <button
                className="btn btn-outline"
                onClick={handleAddToFavorite}
                disabled={posting.favorite}
              >
                {posting.favorite ? "Yuklanmoqda..." : "Sevimlilarga qo'shish"}
              </button>
            </div>
            <div className="single_page__back">
              <Link to="/">← Orqaga</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;

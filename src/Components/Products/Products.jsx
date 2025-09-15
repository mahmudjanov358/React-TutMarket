// <==========> <==========> <==========>
// <==========> Products.jsx Imports <==========>
// <==========> <==========> <==========>
import "./Products.css";
import React from "react";
import { api } from "../../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// <==========> <==========> <==========>
// <==========> Products.jsx Component <==========>
// <==========> <==========> <==========>
const Products = () => {
  // <==========> Products.jsx State <==========>
  const [products, setProducts] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState("default");

  // <==========> Products.jsx Effects <==========>
  React.useEffect(() => {
    api
      .get("/product/all")
      .then((res) => {
        console.log(res.data.products);
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.error("Mahsulotlarni yuklashda xatolik", error);
        toast.error("Mahsulotlarni yuklashda xatolik");
      });
  }, []);

  // <==========> Products.jsx Helper Functions <==========>
  const getPriceNumber = (val) => {
    const n = parseInt(String(val ?? 0).replace(/[^0-9]/g, ""), 10);
    return Number.isNaN(n) ? 0 : n;
  };

  // <==========> Products.jsx Logic <==========>
  const filtered = products.filter((p) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      (p.title || "").toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q)
    );
  });

  // <==========> Products.jsx Sorting <==========>
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "price_asc":
        return getPriceNumber(a.price) - getPriceNumber(b.price);
      case "price_desc":
        return getPriceNumber(b.price) - getPriceNumber(a.price);
      case "title_asc":
        return String(a.title || "").localeCompare(String(b.title || ""));
      case "title_desc":
        return String(b.title || "").localeCompare(String(a.title || ""));
      default:
        return 0;
    }
  });

  // <==========> Products.jsx Render <==========>
  return (
    <div className="products">
      <div id="container">
        <h2>Mahsulotlar</h2>
        <div className="products__controls">
          <input
            type="text"
            placeholder="Qidirish..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Saralash: Standart</option>
            <option value="price_asc">Narx: arzon → qimmat</option>
            <option value="price_desc">Narx: qimmat → arzon</option>
            <option value="title_asc">Nom: A → Z</option>
            <option value="title_desc">Nom: Z → A</option>
          </select>
        </div>

        <div className="products__grid">
          {sorted.map((product) => (
            <Link
              to={`/product/${product.id}`}
              className="product__card"
              key={product.id}
            >
              <div className="product__image">
                <img src={product.image} alt={product.imageAlt} />
              </div>
              <h3 className="product__title">{product.title}</h3>
              <p className="product__price">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

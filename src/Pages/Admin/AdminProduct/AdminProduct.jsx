// <==========> <==========> <==========>
// <==========> AdminProduct.jsx imports <==========>
// <==========> <==========> <==========>
import "./AdminProduct.css";
import React from "react";
import { api } from "../../../api";
import { toast } from "react-toastify";

// <==========> <==========> <==========>
// <==========> AdminProduct.jsx Component <==========>
// <==========> <==========> <==========>
const AdminProduct = () => {
  // <==========> AdminProduct.jsx States <==========>
  const [image, setImage] = React.useState("");
  const [imageAlt, setImageAlt] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("0 so'm");
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);

  // <==========> AdminProduct.jsx Functions <==========>
  const addProduct = async (e) => {
    e.preventDefault();
    if (!image || !imageAlt || !title || !description || price === "") {
      toast.error("Iltimos, barcha fieldni to'ldiring");
      return;
    }

    // Sanitize price to number (DB expects INTEGER)
    const numPrice = parseInt(String(price).replace(/[^0-9]/g, ""), 10);
    if (Number.isNaN(numPrice) || numPrice < 0) {
      toast.error("Narx noto'g'ri kiritilgan");
      return;
    }
    try {
      setLoading(true);
      const { status, data } = await api.post("/product/create", {
        image,
        imageAlt,
        title,
        description,
        price: `${numPrice} so'm`,
      });
      if (status === 201 || status === 200) {
        toast.success(data?.message || "Product qo'shildi");
        setImage("");
        setImageAlt("");
        setTitle("");
        setDescription("");
        setPrice("0 so'm");
        await loadProducts();
      } else {
        toast.error(data?.message || "Mahsulotni qo'shishda xatolik");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Mahsulotni qo'shishda xatolik"
      );
    } finally {
      setLoading(false);
    }
  };

  // <==========> AdminProduct.jsx Load Products <==========>
  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/product/all");
      setProducts(data.products || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Mahsulotlarni yuklashda xatolik"
      );
    } finally {
      setLoading(false);
    }
  };

  // <==========> AdminProduct.jsx useEffect <==========>
  React.useEffect(() => {
    loadProducts();
  }, []);

  // <==========> AdminProduct.jsx Start Edit <==========>
  const startEdit = (p) => {
    setEditingId(p.id);
    setImage(p.image || "");
    setImageAlt(p.imageAlt || "");
    setTitle(p.title || "");
    setDescription(p.description || "");
    setPrice(String(p.price ?? "0 so'm"));
  };

  // <==========> AdminProduct.jsx Cancel Edit <==========>
  const cancelEdit = () => {
    setEditingId(null);
    setImage("");
    setImageAlt("");
    setTitle("");
    setDescription("");
    setPrice("0 so'm");
  };

  // <==========> AdminProduct.jsx Update Product <==========>
  const updateProduct = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      const numPrice = parseInt(String(price).replace(/[^0-9]/g, ""), 10);
      if (Number.isNaN(numPrice) || numPrice < 0) {
        toast.error("Narx noto'g'ri kiritilgan");
        return;
      }
      const { status, data } = await api.put(`/product/update/${editingId}`, {
        image,
        imageAlt,
        title,
        description,
        price: `${numPrice} so'm`,
      });
      if (status === 200) {
        toast.success(data?.message || "Mahsulot yangilandi");
      } else {
        toast.error(data?.message || "Mahsulotni yangilashda xatolik");
      }
      cancelEdit();
      loadProducts();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Mahsulotni yangilashda xatolik"
      );
    }
  };

  // <==========> AdminProduct.jsx Delete Product <==========>
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/product/delete/${id}`);
      toast.success("Mahsulot o'chirildi");
      setProducts((prev) => prev.filter((x) => x.id !== id));
      if (editingId === id) cancelEdit();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Mahsulotni o'chirishda xatolik"
      );
    }
  };

  // <==========> AdminProduct.jsx Render <==========>
  return (
    <div className="adminProduct">
      <div id="container">
        <div className="adminProduct__container">
          <form onSubmit={editingId ? updateProduct : addProduct}>
            <h2>{editingId ? "Edit Product" : "Add Product"}</h2>

            <div>
              <label htmlFor="image">Image</label>
              <input
                type="url"
                placeholder="Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="imageAlt">Image Alt</label>
              <input
                type="text"
                placeholder="Image Alt"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button type="submit">
                {editingId ? "Yangilash" : "Qo'shish"}
              </button>
              {editingId ? (
                <button type="button" onClick={cancelEdit}>
                  Bekor qilish
                </button>
              ) : null}
            </div>
          </form>

          <div className="adminProduct__list" style={{ marginTop: 24 }}>
            <h3>Mavjud mahsulotlar</h3>
            {loading ? (
              <p>Yuklanmoqda...</p>
            ) : products.length === 0 ? (
              <p>Hozircha mahsulot yo'q</p>
            ) : (
              <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {products.map((p) => (
                  <li
                    key={p.id}
                    style={{ display: "flex", gap: 8, alignItems: "center" }}
                  >
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      style={{
                        width: 60,
                        height: 40,
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                    <span style={{ flex: 1 }}>
                      {p.title} — {p.price}
                    </span>
                    <button type="button" onClick={() => startEdit(p)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteProduct(p.id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;

// <==========> <==========> <==========>
// <==========> AdminCategories.jsx imports <==========>
// <==========> <==========> <==========>
import "./AdminCategories.css";
import React from "react";
import { api } from "../../../api";
import { toast } from "react-toastify";

// <==========> <==========> <==========>
// <==========> AdminCategories.jsx Component <==========>
// <==========> <==========> <==========>
const AdminCategories = () => {
  // <==========> AdminCategories.jsx States <==========>
  const [image, setImage] = React.useState("");
  const [imageAlt, setImageAlt] = React.useState("");
  const [name, setName] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);

  // <==========> AdminCategories.jsx Functions <==========>
  const loadCategories = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/category/all");
      setCategories(data.categories || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Kategoriyalarni yuklashda xatolik"
      );
    } finally {
      setLoading(false);
    }
  };

  // <==========> AdminCategories.jsx Effects <==========>
  React.useEffect(() => {
    loadCategories();
  }, []);

  // <==========> AdminCategories.jsx Handlers <==========>
  const addCategories = (e) => {
    e.preventDefault();
    if (!image || !imageAlt || !name) {
      toast.error("Iltimos, barcha fieldni to'ldiring");
    } else {
      api
        .post(`/category/create`, {
          image,
          imageAlt,
          name,
        })
        .then((res) => {
          toast.success(res?.data?.message || "Kategoriya qo'shildi");
          loadCategories();
        })
        .catch((error) =>
          toast.error(error?.response?.data?.message || "Xatolik")
        )
        .finally(() => {
          setImage("");
          setImageAlt("");
          setName("");
        });
    }
  };

  // <==========> AdminCategories.jsx Handlers <==========>
  const startEdit = (c) => {
    setEditingId(c.id);
    setImage(c.image || "");
    setImageAlt(c.imageAlt || "");
    setName(c.name || "");
  };

  // <==========> AdminCategories.jsx Handlers <==========>
  const cancelEdit = () => {
    setEditingId(null);
    setImage("");
    setImageAlt("");
    setName("");
  };

  // <==========> AdminCategories.jsx Handlers <==========>
  const updateCategory = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      const { data } = await api.put(`/category/update/${editingId}`, {
        image,
        imageAlt,
        name,
      });
      toast.success(data?.message || "Kategoriya yangilandi");
      cancelEdit();
      loadCategories();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Kategoriya yangilashda xatolik"
      );
    }
  };

  // <==========> AdminCategories.jsx Handlers <==========>
  const deleteCategory = async (id) => {
    try {
      const { data } = await api.delete(`/category/delete/${id}`);
      toast.success(data?.message || "Kategoriya o'chirildi");
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Kategoriya o'chirishda xatolik"
      );
    }
  };

  // <==========> AdminCategories.jsx Render <==========>
  return (
    <div className="adminCategories">
      <div id="container">
        <div className="adminCategories__container">
          <form onSubmit={editingId ? updateCategory : addCategories}>
            <h2>{editingId ? "Edit Category" : "Add Categories"}</h2>

            <div>
              <label htmlFor="image">Image</label>
              <input
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image"
              />
            </div>
            <div>
              <label htmlFor="imageAlt">Image Alt</label>
              <input
                type="text"
                id="imageAlt"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Image Alt"
              />
            </div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
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

          <div className="adminCategories__list">
            <h3>Mavjud kategoriyalar</h3>
            {loading ? (
              <p>Yuklanmoqda...</p>
            ) : categories.length === 0 ? (
              <p>Hozircha kategoriya yo'q</p>
            ) : (
              <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {categories.map((c) => (
                  <li
                    key={c.id}
                    style={{ display: "flex", gap: 8, alignItems: "center" }}
                  >
                    <img
                      src={c.image}
                      alt={c.imageAlt}
                      style={{
                        width: 40,
                        height: 40,
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                    <span style={{ flex: 1 }}>{c.name}</span>
                    <button type="button" onClick={() => startEdit(c)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteCategory(c.id)}>
                      O'chirish
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

export default AdminCategories;

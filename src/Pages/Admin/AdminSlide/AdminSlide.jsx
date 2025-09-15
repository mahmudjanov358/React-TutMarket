// <==========> <==========> <==========>
// <==========> AdminSlide.jsx imports <==========>
// <==========> <==========> <==========>
import "./AdminSlide.css";
import React from "react";
import { api } from "../../../api";
import { toast } from "react-toastify";

// <==========> <==========> <==========>
// <==========> AdminSlide.jsx Component <==========>
// <==========> <==========> <==========>
const AdminSlide = () => {
  // <==========> AdminSlide.jsx States <==========>
  const [image, setImage] = React.useState("");
  const [imageAlt, setImageAlt] = React.useState("");
  const [slides, setSlides] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);

  // <==========> AdminSlide.jsx Functions <==========>
  const loadSlides = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/slide/all");
      setSlides(data.slides || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Slidlarni yuklashda xatolik"
      );
    } finally {
      setLoading(false);
    }
  };

  // <==========> AdminSlide.jsx Effects <==========>
  React.useEffect(() => {
    loadSlides();
  }, []);

  // <==========> AdminSlide.jsx Handlers <==========>
  const addSlide = (e) => {
    e.preventDefault();
    if (!image || !imageAlt) {
      toast.error("Iltimos, barcha fieldni to'ldiring");
    } else {
      api
        .post("/slide/create", {
          image,
          imageAlt,
        })
        .then((res) => {
          toast.success(res?.data?.message || "Slide qo'shildi");
          loadSlides();
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setImage("");
          setImageAlt("");
        });
    }
  };

  // <==========> AdminSlide.jsx Handlers <==========>
  const startEdit = (s) => {
    setEditingId(s.id);
    setImage(s.image || "");
    setImageAlt(s.imageAlt || "");
  };

  // <==========> AdminSlide.jsx Handlers <==========>
  const cancelEdit = () => {
    setEditingId(null);
    setImage("");
    setImageAlt("");
  };

  // <==========> AdminSlide.jsx Handlers <==========>
  const updateSlide = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      const { data } = await api.put(`/slide/update/${editingId}`, {
        image,
        imageAlt,
      });
      toast.success(data?.message || "Slide yangilandi");
      cancelEdit();
      loadSlides();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Slide yangilashda xatolik"
      );
    }
  };

  // <==========> AdminSlide.jsx Handlers <==========>
  const deleteSlide = async (id) => {
    try {
      const { data } = await api.delete(`/slide/delete/${id}`);
      toast.success(data?.message || "Slide o'chirildi");
      setSlides((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Slide o'chirishda xatolik"
      );
    }
  };

  // <==========> AdminSlide.jsx Render <==========>
  return (
    <div className="adminSlide">
      <div id="container">
        <div className="adminSlide__container">
          <form onSubmit={editingId ? updateSlide : addSlide}>
            <h2>{editingId ? "Edit Slide" : "Add Slide"}</h2>

            <div>
              <label htmlFor="image">Image</label>
              <input
                type="url"
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

          <div className="adminSlide__list">
            <h3>Mavjud slidlar</h3>
            {loading ? (
              <p>Yuklanmoqda...</p>
            ) : slides.length === 0 ? (
              <p>Hozircha slide yo'q</p>
            ) : (
              <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {slides.map((s) => (
                  <li
                    key={s.id}
                    style={{ display: "flex", gap: 8, alignItems: "center" }}
                  >
                    <img
                      src={s.image}
                      alt={s.imageAlt}
                      style={{
                        width: 80,
                        height: 40,
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                    <span style={{ flex: 1 }}>{s.imageAlt}</span>
                    <button type="button" onClick={() => startEdit(s)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteSlide(s.id)}>
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

export default AdminSlide;

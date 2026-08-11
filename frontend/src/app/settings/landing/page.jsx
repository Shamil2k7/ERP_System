
"use client";

import { useEffect, useState } from "react";
import {
  getLandingPage,
  updateLandingPage,
} from "@/services/landing.service";
import styles from "./landing-admin.module.css";

export default function LandingAdminPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    heroTitle: "",
    heroDescription: "",
    aboutTitle: "",
    aboutDescription: "",
  });

  const [files, setFiles] = useState({
    heroImage: null,
    aboutImage1: null,
    aboutImage2: null,
    aboutImage3: null,
    aboutImage4: null,
  });

  const [preview, setPreview] = useState({
    heroImage: "",
    aboutImage1: "",
    aboutImage2: "",
    aboutImage3: "",
    aboutImage4: "",
  });

  // ===========================
  // Load Landing Data
  // ===========================

  useEffect(() => {
    loadLanding();
  }, []);

  async function loadLanding() {
    try {
      const data = await getLandingPage();

      setForm({
        heroTitle: data.heroTitle || "",
        heroDescription: data.heroDescription || "",
        aboutTitle: data.aboutTitle || "",
        aboutDescription: data.aboutDescription || "",
      });

      setPreview({
        heroImage: data.heroImage
          ? `${API_URL}/uploads/landingpageimage/${data.heroImage}`
          : "",

        aboutImage1: data.aboutImage1
          ? `${API_URL}/uploads/landingpageimage/${data.aboutImage1}`
          : "",

        aboutImage2: data.aboutImage2
          ? `${API_URL}/uploads/landingpageimage/${data.aboutImage2}`
          : "",

        aboutImage3: data.aboutImage3
          ? `${API_URL}/uploads/landingpageimage/${data.aboutImage3}`
          : "",

        aboutImage4: data.aboutImage4
          ? `${API_URL}/uploads/landingpageimage/${data.aboutImage4}`
          : "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to load landing page.");
    }

    setLoading(false);
  }

  // ===========================
  // Text Change
  // ===========================

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // ===========================
  // Image Change
  // ===========================

  function handleImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    const name = e.target.name;

    setFiles({
      ...files,
      [name]: file,
    });

    setPreview({
      ...preview,
      [name]: URL.createObjectURL(file),
    });
  }

  // ===========================
  // Save
  // ===========================

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);

    const formData = new FormData();

    formData.append("heroTitle", form.heroTitle);
    formData.append("heroDescription", form.heroDescription);

    formData.append("aboutTitle", form.aboutTitle);
    formData.append("aboutDescription", form.aboutDescription);

    if (files.heroImage)
      formData.append("heroImage", files.heroImage);

    if (files.aboutImage1)
      formData.append("aboutImage1", files.aboutImage1);

    if (files.aboutImage2)
      formData.append("aboutImage2", files.aboutImage2);

    if (files.aboutImage3)
      formData.append("aboutImage3", files.aboutImage3);

    if (files.aboutImage4)
      formData.append("aboutImage4", files.aboutImage4);

    try {
      await updateLandingPage(formData);

      alert("Landing page updated successfully.");

      loadLanding();
    } catch (error) {
      console.error(error);
      alert("Update failed.");
    }

    setSaving(false);
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.container}>
      <h1>Landing Page Management</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* HERO */}

        <h2>Hero Section</h2>

        <label>Hero Title</label>

        <input
          type="text"
          name="heroTitle"
          value={form.heroTitle}
          onChange={handleChange}
        />

        <label>Hero Description</label>

        <textarea
          name="heroDescription"
          rows="5"
          value={form.heroDescription}
          onChange={handleChange}
        />

        <label>Hero Image</label>

        <input
          type="file"
          name="heroImage"
          accept="image/*"
          onChange={handleImage}
        />

        {preview.heroImage && (
          <img
            src={preview.heroImage}
            className={styles.preview}
            alt="Hero"
          />
        )}

        {/* ABOUT */}

        <h2>About Section</h2>

        <label>About Title</label>

        <input
          type="text"
          name="aboutTitle"
          value={form.aboutTitle}
          onChange={handleChange}
        />

        <label>About Description</label>

        <textarea
          rows="5"
          name="aboutDescription"
          value={form.aboutDescription}
          onChange={handleChange}
        />

        {/* ABOUT IMAGE 1 */}

        <label>About Image 1</label>

        <input
          type="file"
          name="aboutImage1"
          accept="image/*"
          onChange={handleImage}
        />

        {preview.aboutImage1 && (
          <img
            src={preview.aboutImage1}
            className={styles.preview}
            alt=""
          />
        )}

        {/* ABOUT IMAGE 2 */}

        <label>About Image 2</label>

        <input
          type="file"
          name="aboutImage2"
          accept="image/*"
          onChange={handleImage}
        />

        {preview.aboutImage2 && (
          <img
            src={preview.aboutImage2}
            className={styles.preview}
            alt=""
          />
        )}

        {/* ABOUT IMAGE 3 */}

        <label>About Image 3</label>

        <input
          type="file"
          name="aboutImage3"
          accept="image/*"
          onChange={handleImage}
        />

        {preview.aboutImage3 && (
          <img
            src={preview.aboutImage3}
            className={styles.preview}
            alt=""
          />
        )}

        {/* ABOUT IMAGE 4 */}

        <label>About Image 4</label>

        <input
          type="file"
          name="aboutImage4"
          accept="image/*"
          onChange={handleImage}
        />

        {preview.aboutImage4 && (
          <img
            src={preview.aboutImage4}
            className={styles.preview}
            alt=""
          />
        )}

        <button
          type="submit"
          disabled={saving}
          className={styles.saveBtn}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

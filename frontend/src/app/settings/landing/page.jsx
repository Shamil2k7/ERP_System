"use client";

import { useEffect, useState } from "react";
import {
  getLandingPage,
  updateLandingPage,
} from "@/services/landingAdmin.service";

import styles from "./landing.module.css";

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

  // ============================
  // Load Landing Data
  // ============================

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
      console.error("Load landing error:", error);
    } finally {
      setLoading(false);
    }
  }

  // ============================
  // Text Change
  // ============================

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // ============================
  // Image Change
  // ============================

  function handleImage(e) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const name = e.target.name;

    setFiles((previous) => ({
      ...previous,
      [name]: file,
    }));

    setPreview((previous) => ({
      ...previous,
      [name]: URL.createObjectURL(file),
    }));
  }

  // ============================
  // Save
  // ============================

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("heroTitle", form.heroTitle);
      formData.append("heroDescription", form.heroDescription);
      formData.append("aboutTitle", form.aboutTitle);
      formData.append("aboutDescription", form.aboutDescription);

      if (files.heroImage) {
        formData.append("heroImage", files.heroImage);
      }

      if (files.aboutImage1) {
        formData.append("aboutImage1", files.aboutImage1);
      }

      if (files.aboutImage2) {
        formData.append("aboutImage2", files.aboutImage2);
      }

      if (files.aboutImage3) {
        formData.append("aboutImage3", files.aboutImage3);
      }

      if (files.aboutImage4) {
        formData.append("aboutImage4", files.aboutImage4);
      }

      await updateLandingPage(formData);

      alert("Landing page updated successfully.");

      await loadLanding();

      setFiles({
        heroImage: null,
        aboutImage1: null,
        aboutImage2: null,
        aboutImage3: null,
        aboutImage4: null,
      });
    } catch (error) {
      console.error("Update landing error:", error);

      alert(error.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  }

  // ============================
  // Loading
  // ============================

  if (loading) {
    return (
      <div className={styles.loading}>
        Loading...
      </div>
    );
  }

  // ============================
  // Page
  // ============================

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Landing Page Management
      </h1>

      <form onSubmit={handleSubmit}>
        {/* ================= HERO ================= */}

        <section className={styles.section}>
          <h2>Hero Section</h2>

          <div className={styles.formGroup}>
            <label>Hero Title</label>

            <input
              type="text"
              name="heroTitle"
              value={form.heroTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Hero Description</label>

            <textarea
              name="heroDescription"
              rows="5"
              value={form.heroDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
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
                alt="Hero Preview"
                className={styles.preview}
              />
            )}
          </div>
        </section>

        {/* ================= ABOUT ================= */}

        <section className={styles.section}>
          <h2>About Section</h2>

          <div className={styles.formGroup}>
            <label>About Title</label>

            <input
              type="text"
              name="aboutTitle"
              value={form.aboutTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>About Description</label>

            <textarea
              name="aboutDescription"
              rows="5"
              value={form.aboutDescription}
              onChange={handleChange}
              required
            />
          </div>

          {/* Images */}

          <div className={styles.imageGrid}>
            {/* Image 1 */}

            <div className={styles.imageBox}>
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
                  alt="About 1"
                  className={styles.preview}
                />
              )}
            </div>

            {/* Image 2 */}

            <div className={styles.imageBox}>
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
                  alt="About 2"
                  className={styles.preview}
                />
              )}
            </div>

            {/* Image 3 */}

            <div className={styles.imageBox}>
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
                  alt="About 3"
                  className={styles.preview}
                />
              )}
            </div>

            {/* Image 4 */}

            <div className={styles.imageBox}>
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
                  alt="About 4"
                  className={styles.preview}
                />
              )}
            </div>
          </div>
        </section>

        {/* ================= SAVE ================= */}

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
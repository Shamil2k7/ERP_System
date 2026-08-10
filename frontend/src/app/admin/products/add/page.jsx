"use client";

import { useRef, useState } from "react";
import {
  FiUpload,
  FiSave,
  FiPackage,
  FiX,
} from "react-icons/fi";

import styles from "./addProducts.module.css";

const initialProduct = {
  name: "",
  code: "",
  sku: "",
  barcode: "",
  category: "",
  brand: "",
  unit: "Piece",
  description: "",
  purchasePrice: "",
  sellingPrice: "",
  tax: "",
  discount: "",
  stock: "",
  lowStock: "",
  warehouse: "",
  status: "Active",
};

export default function AddProductPage() {
  const [product, setProduct] = useState(initialProduct);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     IMAGE UPLOAD
  ========================= */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // File type validation
    const allowedTypes = [
      "image/png",
      "image/jpeg",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload only PNG or JPG images.");
      e.target.value = "";
      return;
    }

    // 5MB validation
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      e.target.value = "";
      return;
    }

    // Remove previous preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setImage(file);
    setImagePreview(previewUrl);
  };

  /* =========================
     REMOVE IMAGE
  ========================= */

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImage(null);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Product:", product);
    console.log("Product Image:", image);

    // Later:
    // Send product + image using FormData
  };

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <div className={styles.container}>

          {/* =========================
              PAGE HEADER
          ========================= */}

          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div>
                <h1>Add Product</h1>
                <p>
                  Create a new product for inventory
                </p>
              </div>
            </div>

            <button
              type="submit"
              form="add-product-form"
              className={styles.saveBtn}
            >
              <FiSave />
              Save Product
            </button>
          </div>

          {/* =========================
              FORM
          ========================= */}

          <form
            id="add-product-form"
            className={styles.form}
            onSubmit={handleSubmit}
          >

            {/* =========================
                LEFT SECTION
            ========================= */}

            <div className={styles.left}>

              {/* Product Information */}

              <div className={styles.card}>
                <h2>
                  <FiPackage />
                  Product Information
                </h2>

                <div className={styles.grid}>

                  {/* Product Name */}

                  <div>
                    <label htmlFor="name">
                      Product Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                      placeholder="Apple iPhone 15"
                      required
                    />
                  </div>

                  {/* Product Code */}

                  <div>
                    <label htmlFor="code">
                      Product Code
                    </label>

                    <input
                      id="code"
                      name="code"
                      value={product.code}
                      onChange={handleChange}
                      placeholder="PRD001"
                    />
                  </div>

                  {/* SKU */}

                  <div>
                    <label htmlFor="sku">
                      SKU
                    </label>

                    <input
                      id="sku"
                      name="sku"
                      value={product.sku}
                      onChange={handleChange}
                      placeholder="SKU-1001"
                      required
                    />
                  </div>

                  {/* Barcode */}

                  <div>
                    <label htmlFor="barcode">
                      Barcode
                    </label>

                    <input
                      id="barcode"
                      name="barcode"
                      value={product.barcode}
                      onChange={handleChange}
                      placeholder="123456789"
                    />
                  </div>

                  {/* Category */}

                  <div>
                    <label htmlFor="category">
                      Category
                    </label>

                    <select
                      id="category"
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                    >
                      <option value="">
                        Choose Category
                      </option>

                      <option value="Smartphones">
                        Smartphones
                      </option>

                      <option value="Computers">
                        Computers
                      </option>

                      <option value="Accessories">
                        Accessories
                      </option>
                    </select>
                  </div>

                  {/* Brand */}

                  <div>
                    <label htmlFor="brand">
                      Brand
                    </label>

                    <select
                      id="brand"
                      name="brand"
                      value={product.brand}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select Brand
                      </option>

                      <option value="Apple">
                        Apple
                      </option>

                      <option value="Samsung">
                        Samsung
                      </option>

                      <option value="Dell">
                        Dell
                      </option>
                    </select>
                  </div>

                  {/* Unit */}

                  <div>
                    <label htmlFor="unit">
                      Unit
                    </label>

                    <select
                      id="unit"
                      name="unit"
                      value={product.unit}
                      onChange={handleChange}
                    >
                      <option value="Piece">
                        Piece
                      </option>

                      <option value="Box">
                        Box
                      </option>

                      <option value="Pack">
                        Pack
                      </option>
                    </select>
                  </div>

                  {/* Status */}

                  <div>
                    <label htmlFor="status">
                      Status
                    </label>

                    <select
                      id="status"
                      name="status"
                      value={product.status}
                      onChange={handleChange}
                    >
                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>
                    </select>
                  </div>

                </div>

                {/* Description */}

                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  rows={5}
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Write product description..."
                />
              </div>

              {/* =========================
                  PRICING
              ========================= */}

              <div className={styles.card}>
                <h2>Pricing</h2>

                <div className={styles.grid}>

                  <div>
                    <label htmlFor="purchasePrice">
                      Purchase Price
                    </label>

                    <input
                      id="purchasePrice"
                      name="purchasePrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={product.purchasePrice}
                      onChange={handleChange}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label htmlFor="sellingPrice">
                      Selling Price
                    </label>

                    <input
                      id="sellingPrice"
                      name="sellingPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={product.sellingPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label htmlFor="tax">
                      Tax (%)
                    </label>

                    <input
                      id="tax"
                      name="tax"
                      type="number"
                      min="0"
                      max="100"
                      value={product.tax}
                      onChange={handleChange}
                      placeholder="18"
                    />
                  </div>

                  <div>
                    <label htmlFor="discount">
                      Discount (%)
                    </label>

                    <input
                      id="discount"
                      name="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={product.discount}
                      onChange={handleChange}
                      placeholder="5"
                    />
                  </div>

                </div>
              </div>

              {/* =========================
                  INVENTORY
              ========================= */}

              <div className={styles.card}>
                <h2>Inventory</h2>

                <div className={styles.grid}>

                  <div>
                    <label htmlFor="stock">
                      Opening Stock
                    </label>

                    <input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      value={product.stock}
                      onChange={handleChange}
                      placeholder="50"
                    />
                  </div>

                  <div>
                    <label htmlFor="lowStock">
                      Low Stock Alert
                    </label>

                    <input
                      id="lowStock"
                      name="lowStock"
                      type="number"
                      min="0"
                      value={product.lowStock}
                      onChange={handleChange}
                      placeholder="10"
                    />
                  </div>

                  <div>
                    <label htmlFor="warehouse">
                      Warehouse
                    </label>

                    <input
                      id="warehouse"
                      name="warehouse"
                      value={product.warehouse}
                      onChange={handleChange}
                      placeholder="Main Warehouse"
                    />
                  </div>

                </div>
              </div>

            </div>

            {/* =========================
                RIGHT SECTION
            ========================= */}

            <div className={styles.right}>

              {/* =========================
                  PRODUCT IMAGE
              ========================= */}

              <div className={styles.card}>
                <h2>Product Image</h2>

                <div className={styles.uploadBox}>

                  {imagePreview ? (
                    <div className={styles.previewContainer}>

                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className={styles.imagePreview}
                      />

                      <p className={styles.fileName}>
                        {image?.name}
                      </p>

                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={handleRemoveImage}
                      >
                        <FiX />
                        Remove Image
                      </button>

                    </div>
                  ) : (
                    <>
                      <FiUpload size={40} />

                      <p>
                        Click or Drag image here
                      </p>

                      <span>
                        PNG, JPG up to 5MB
                      </span>

                      {/* Hidden File Input */}

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg"
                        onChange={handleImageChange}
                        className={styles.fileInput}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          fileInputRef.current?.click()
                        }
                      >
                        Upload Image
                      </button>
                    </>
                  )}

                </div>
              </div>

              {/* =========================
                  QUICK TIPS
              ========================= */}

              <div className={styles.card}>
                <h2>Quick Tips</h2>

                <ul className={styles.tips}>
                  <li>
                    Use a unique SKU.
                  </li>

                  <li>
                    Upload a high-quality product image.
                  </li>

                  <li>
                    Set low stock alerts.
                  </li>

                  <li>
                    Verify pricing before saving.
                  </li>
                </ul>
              </div>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}


"use client";

import Link from "next/link";
import {
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiBox,
  FiDollarSign,
  FiShoppingCart,
  FiFileText,
  FiSettings,
  FiUserCheck,
  FiLogOut,
} from "react-icons/fi";

import styles from "@/styles/admin.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>

      <h2 className={styles.logo}>ERP</h2>

      <nav>

        <Link href="/admin">
          <FiHome /> Dashboard
        </Link>

        <Link href="/admin/users">
          <FiUsers /> Users
        </Link>

        <Link href="/admin/products">
          <FiShoppingBag /> Products
        </Link>

        <Link href="/admin/inventory">
          <FiBox /> Inventory
        </Link>

        <Link href="/admin/sales">
          <FiDollarSign /> Sales
        </Link>

        <Link href="/admin/purchase">
          <FiShoppingCart /> Purchase
        </Link>

        <Link href="/admin/hr">
          <FiUserCheck /> HR
        </Link>

        <Link href="/admin/reports">
          <FiFileText /> Reports
        </Link>

        <Link href="/admin/settings">
          <FiSettings /> Settings
        </Link>

        <Link href="/logout">
          <FiLogOut /> Logout
        </Link>

      </nav>
    </aside>
  );
}
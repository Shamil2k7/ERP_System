"use client";

import styles from "./landing.module.css";
import Image from "next/image";

export default function Home() {


  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          ERP<span>Cloud</span>
        </div>

        <button className={styles.loginBtn}>
          Login →
        </button>
      </nav>
      {/* ================= HERO ================= */}

      <section className={styles.hero} id="home">

        {/* Background Blur Shapes */}
        <div className={styles.blurOne}></div>
        <div className={styles.blurTwo}></div>

        {/* Left Content */}
        <div className={styles.heroContent}>

          {/* <span className={styles.heroTag}>
            CLOUD ERP PLATFORM
          </span> */}

          <h1 className={styles.heroTitle}>
            Transform
            <br />
            Your Business
            <br />
            With <span>ERP</span>
          </h1>

          <p className={styles.heroDescription}>
            A powerful cloud-based ERP platform that helps businesses
            manage inventory, billing, purchasing, accounting,
            warehouses, employees, customers and real-time analytics
            from one intelligent system.
          </p>

          <div className={styles.heroButtons}>

            {/* <button className={styles.primaryBtn}>
              Request Demo
            </button> */}

            <button className={styles.secondaryBtn}>
              Learn More
            </button>

          </div>

        </div>

        {/* Right Content */}
        <div className={styles.heroImageSection}>

          <div className={styles.dashboardCard}>

            {/* Top Bar */}

            <div className={styles.dashboardTop}>

              <div>
                <h3>ERP Dashboard</h3>
                <span>Business Overview</span>
              </div>

              <div className={styles.status}></div>

            </div>

            {/* Chart Placeholder */}

            <div className={styles.chartArea}>

              <div className={styles.chartLine}></div>
              <Image
                src="/images/dashboard.png"
                alt="ERP Dashboard"
                width={520}
                height={320}
                className={styles.dashboardImage}
              />

            </div>

            {/* Bottom Stats */}

            <div className={styles.dashboardStats}>

              <div className={styles.statBox}>
                <h4>$84K</h4>
                <p>Revenue</p>
              </div>

              <div className={styles.statBox}>
                <h4>1,248</h4>
                <p>Orders</p>
              </div>

              <div className={styles.statBox}>
                <h4>98%</h4>
                <p>Inventory</p>
              </div>

              <div className={styles.statBox}>
                <h4>3,520</h4>
                <p>Customers</p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= ABOUT ================= */}

      <section className={styles.about} id="about">

        <div className={styles.aboutImages}>

          <div className={styles.imageGrid}>

            <img
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />

            <img
              src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />

            <img
              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />

            <img
              src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />

          </div>

        </div>

        <div className={styles.aboutContent}>

          <span className={styles.sectionTag}>
            ABOUT ERP CLOUD
          </span>

          <h2>
            One Platform.
            <br />
            Complete Business Control.
          </h2>

          <p>
            ERP Cloud helps retailers and growing businesses
            manage inventory, sales, purchasing, accounting,
            warehouses, HR, customers and reporting from a
            single cloud-based platform.
          </p>

          <div className={styles.features}>

            <div>Cloud Based Solution</div>

            <div>Multi-Branch Management</div>

            <div>Real-Time Analytics</div>

            <div>Enterprise Security</div>

          </div>

          <button className={styles.learnBtn}>
            Learn More →
          </button>

        </div>

      </section>

      <footer className={styles.footer}>
        <p>© 2026 ERPCloud. All Rights Reserved.</p>
      </footer>
    </>
  );
}
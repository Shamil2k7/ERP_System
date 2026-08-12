"use client";

import { useEffect, useState } from "react";
import styles from "./landing.module.css";
import { getLandingPage } from "@/services/landing.service";

export default function Home() {
  const [landing, setLanding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function loadLanding() {
      try {
        setLoading(true);
        setError("");

        const data = await getLandingPage();

        setLanding(data);
      } catch (error) {
        console.error("Landing page error:", error);
        setError("Unable to load the landing page.");
      } finally {
        setLoading(false);
      }
    }

    loadLanding();
  }, []);

  /* =========================
     LOADING SCREEN
  ========================= */

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingLogo}>
            ERP<span>Cloud</span>
          </div>

          <div className={styles.loader}></div>

          <p className={styles.loadingText}>
            Loading your business platform... 
          </p>
        </div>
      </div>
    );
  }

  /* =========================
     ERROR SCREEN
  ========================= */

  if (error || !landing) {
    return (
      <div className={styles.errorScreen}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>!</div>

          <h2>Something went wrong</h2>

          <p>
            {error || "Landing page data could not be loaded."}
          </p>

          <button
            className={styles.retryBtn}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ================= NAVBAR ================= */}

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
        <div className={styles.blurOne}></div>
        <div className={styles.blurTwo}></div>

        {/* LEFT CONTENT */}

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>
            CLOUD ERP PLATFORM
          </span>

          <h1 className={styles.heroTitle}>
            {landing.heroTitle}
          </h1>

          <p className={styles.heroDescription}>
            {landing.heroDescription}
          </p>

          <div className={styles.heroButtons}>
            <button className={styles.primaryBtn}>
              Request Demo
            </button>

            <button className={styles.secondaryBtn}>
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}

        <div className={styles.heroImageSection}>
          <div className={styles.dashboardCard}>

            {/* Dashboard Header */}

            <div className={styles.dashboardTop}>
              <div>
                <h3>ERP Dashboard</h3>
                <span>Business Overview</span>
              </div>

              <div className={styles.status}></div>
            </div>

            {/* Hero Image */}

            <div className={styles.chartArea}>
              {landing.heroImage ? (
                <img
                  src={`${API_URL}/uploads/landingpageimage/${landing.heroImage}`}
                  alt="ERP Dashboard"
                  className={styles.dashboardImage}
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  ERP Dashboard
                </div>
              )}
            </div>

            {/* Statistics */}

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

            {/* IMAGE 1 */}

            {landing.aboutImage1 ? (
              <img
                src={`${API_URL}/uploads/landingpageimage/${landing.aboutImage1}`}
                alt="ERP business management"
                loading="lazy"
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                About Image 1
              </div>
            )}

            {/* IMAGE 2 */}

            {landing.aboutImage2 ? (
              <img
                src={`${API_URL}/uploads/landingpageimage/${landing.aboutImage2}`}
                alt="ERP inventory management"
                loading="lazy"
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                About Image 2
              </div>
            )}

            {/* IMAGE 3 */}

            {landing.aboutImage3 ? (
              <img
                src={`${API_URL}/uploads/landingpageimage/${landing.aboutImage3}`}
                alt="ERP analytics"
                loading="lazy"
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                About Image 3
              </div>
            )}

            {/* IMAGE 4 */}

            {landing.aboutImage4 ? (
              <img
                src={`${API_URL}/uploads/landingpageimage/${landing.aboutImage4}`}
                alt="ERP business dashboard"
                loading="lazy"
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                About Image 4
              </div>
            )}

          </div>
        </div>

        {/* ABOUT CONTENT */}

        <div className={styles.aboutContent}>

          <span className={styles.sectionTag}>
            ABOUT ERP CLOUD
          </span>

          <h2>
            {landing.aboutTitle}
          </h2>

          <p>
            {landing.aboutDescription}
          </p>

          <div className={styles.features}>
            <div>✓ Inventory Management</div>
            <div>✓ Smart Billing</div>
            <div>✓ Business Analytics</div>
            <div>✓ Cloud Based System</div>
          </div>

          <button className={styles.learnBtn}>
            Learn More →
          </button>

        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className={styles.footer}>
        <p>
          © ERP Cloud. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}


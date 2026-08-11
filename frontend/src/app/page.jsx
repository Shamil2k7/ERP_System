"use client";

import { useEffect, useState } from "react";
import styles from "./landing.module.css";
import { getLandingPage } from "@/services/landing.service";

export default function Home() {
  const [landing, setLanding] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function loadLanding() {
      try {
        const data = await getLandingPage();
        setLanding(data);
      } catch (error) {
        console.error("Landing page error:", error);
      }
    }

    loadLanding();
  }, []);

  if (!landing) {
    return (
      <div className={styles.loading}>
        Loading...
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

        {/* Left Content */}

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {landing.heroTitle}
          </h1>

          <p className={styles.heroDescription}>
            {landing.heroDescription}
          </p>

          <div className={styles.heroButtons}>
            <button className={styles.secondaryBtn}>
              Learn More
            </button>
          </div>
        </div>

        {/* Right Content */}

        <div className={styles.heroImageSection}>
          <div className={styles.dashboardCard}>
            <div className={styles.dashboardTop}>
              <div>
                <h3>ERP Dashboard</h3>
                <span>Business Overview</span>
              </div>

              <div className={styles.status}></div>
            </div>

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
            {landing.aboutImage1 ? (
              <img
                src={`${API_URL}/uploads/landingpageimage/${landing.aboutImage1}`}
                alt="About 1"
                loading="lazy"
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                About Image 1
              </div>
            )}

            {landing.aboutImage2 ? (
              <img
                src={`${API_URL}/uploads/landingpageimage/${landing.aboutImage2}`}
                alt="About 2"
                loading="lazy"
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                About Image 2
              </div>
            )}

            {landing.aboutImage3 ? (
              <img
                src={`${API_URL}/uploads/landingpageimage/${landing.aboutImage3}`}
                alt="About 3"
                loading="lazy"
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                About Image 3
              </div>
            )}

            {landing.aboutImage4 ? (
              <img
                src={`${API_URL}/uploads/landingpageimage/${landing.aboutImage4}`}
                alt="About 4"
                loading="lazy"
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                About Image 4
              </div>
            )}
          </div>
        </div>

        <div className={styles.aboutContent}>
          <h2>{landing.aboutTitle}</h2>

          <p>{landing.aboutDescription}</p>

          <button className={styles.learnBtn}>
            Learn More →
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className={styles.footer}>
        <p>© ERP Cloud. All Rights Reserved.</p>
      </footer>
    </>
  );
}
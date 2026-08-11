import prisma from "../../config/prisma.js";

// ==========================================
// Default Landing Page Data
// ==========================================
const defaultLandingData = {
  heroTitle: "Transform Your Business With ERP",

  heroDescription:
    "A powerful cloud-based ERP platform that helps businesses manage inventory, billing, accounting, warehouses and analytics.",

  heroImage: null,

  aboutTitle: "One Platform. Complete Business Control.",

  aboutDescription:
    "ERP Cloud helps retailers and businesses manage everything from one intelligent system.",

  aboutImage1: null,
  aboutImage2: null,
  aboutImage3: null,
  aboutImage4: null,
};

// ==========================================
// GET LANDING PAGE
// GET /api/landing
// ==========================================
export const getLandingPage = async (req, res) => {
  try {
    let landing = await prisma.landingPage.findFirst();

    // Create default record if database is empty
    if (!landing) {
      landing = await prisma.landingPage.create({
        data: defaultLandingData,
      });
    }

    return res.status(200).json({
      success: true,
      data: landing,
    });
  } catch (error) {
    console.error("GET LANDING ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load landing page.",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE LANDING PAGE
// PUT /api/landing
// ==========================================
export const updateLandingPage = async (req, res) => {
  try {
    let landing = await prisma.landingPage.findFirst();

    // Create record if it doesn't exist
    if (!landing) {
      landing = await prisma.landingPage.create({
        data: defaultLandingData,
      });
    }

    const data = {};

    // ======================================
    // Text fields
    // ======================================

    if (req.body.heroTitle !== undefined) {
      data.heroTitle = req.body.heroTitle;
    }

    if (req.body.heroDescription !== undefined) {
      data.heroDescription = req.body.heroDescription;
    }

    if (req.body.aboutTitle !== undefined) {
      data.aboutTitle = req.body.aboutTitle;
    }

    if (req.body.aboutDescription !== undefined) {
      data.aboutDescription = req.body.aboutDescription;
    }

    // ======================================
    // Image fields
    // ======================================

    if (req.files?.heroImage?.[0]) {
      data.heroImage = req.files.heroImage[0].filename;
    }

    if (req.files?.aboutImage1?.[0]) {
      data.aboutImage1 = req.files.aboutImage1[0].filename;
    }

    if (req.files?.aboutImage2?.[0]) {
      data.aboutImage2 = req.files.aboutImage2[0].filename;
    }

    if (req.files?.aboutImage3?.[0]) {
      data.aboutImage3 = req.files.aboutImage3[0].filename;
    }

    if (req.files?.aboutImage4?.[0]) {
      data.aboutImage4 = req.files.aboutImage4[0].filename;
    }

    // ======================================
    // Update database
    // ======================================

    const updatedLanding = await prisma.landingPage.update({
      where: {
        id: landing.id,
      },
      data,
    });

    return res.status(200).json({
      success: true,
      message: "Landing page updated successfully.",
      data: updatedLanding,
    });
  } catch (error) {
    console.error("UPDATE LANDING ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update landing page.",
      error: error.message,
    });
  }
};
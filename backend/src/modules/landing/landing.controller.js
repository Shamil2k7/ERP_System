import prisma from "../../config/prisma.js";

// =============================
// Get Landing Page
// =============================
export const getLandingPage = async (req, res) => {
  try {
    let landing = await prisma.landingPage.findFirst();

    // Create default record if database is empty
    if (!landing) {
     landing = await prisma.landingPage.create({
  data: {
    heroTitle: "Transform Your Business With ERP",

    heroDescription:
      "A powerful cloud-based ERP platform that helps businesses manage inventory, billing, accounting, warehouses and analytics.",

    heroImage: "",

    aboutTitle: "One Platform. Complete Business Control.",

    aboutDescription:
      "ERP Cloud helps retailers and businesses manage everything from one intelligent system.",

    aboutImage1: "",
    aboutImage2: "",
    aboutImage3: "",
    aboutImage4: "",
  },
});
    }

    res.status(200).json({
      success: true,
      data: landing,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load landing page.",
    });
  }
};

// =============================
// Update Landing Page
// =============================
export const updateLandingPage = async (req, res) => {
  try {
    let landing = await prisma.landingPage.findFirst();

    if (!landing) {
      landing = await prisma.landingPage.create({
        data: {},
      });
    }

    const data = {};

    // Text fields
    if (req.body.heroTitle)
      data.heroTitle = req.body.heroTitle;

    if (req.body.heroDescription)
      data.heroDescription = req.body.heroDescription;

    if (req.body.aboutTitle)
      data.aboutTitle = req.body.aboutTitle;

    if (req.body.aboutDescription)
      data.aboutDescription = req.body.aboutDescription;

    // Image fields
    if (req.files?.heroImage)
      data.heroImage = req.files.heroImage[0].filename;

    if (req.files?.aboutImage1)
      data.aboutImage1 = req.files.aboutImage1[0].filename;

    if (req.files?.aboutImage2)
      data.aboutImage2 = req.files.aboutImage2[0].filename;

    if (req.files?.aboutImage3)
      data.aboutImage3 = req.files.aboutImage3[0].filename;

    if (req.files?.aboutImage4)
      data.aboutImage4 = req.files.aboutImage4[0].filename;

    const updatedLanding = await prisma.landingPage.update({
      where: {
        id: landing.id,
      },
      data,
    });

    res.status(200).json({
      success: true,
      message: "Landing page updated successfully.",
      data: updatedLanding,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update landing page.",
    });
  }
};
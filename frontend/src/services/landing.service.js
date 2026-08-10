const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ==============================
// Get Landing Page
// ==============================
export async function getLandingPage() {
  const response = await fetch(`${API_URL}/api/landing`);

  if (!response.ok) {
    throw new Error("Failed to fetch landing page");
  }

  const result = await response.json();

  return result.data;
}

// ==============================
// Update Landing Page
// ==============================
export async function updateLandingPage(formData) {
  const response = await fetch(`${API_URL}/api/landing`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to update landing page");
  }

  const result = await response.json();

  return result.data;
}
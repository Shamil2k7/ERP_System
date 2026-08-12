const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getLandingPage() {
  try {
    const response = await fetch(`${API_URL}/api/landing`, {
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to fetch landing page"
      );
    }

    return result.data;
  } catch (error) {
    console.error("Landing API Error:", error);
    throw error;
  }
}
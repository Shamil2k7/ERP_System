const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getLandingPage() {
  const response = await fetch(`${API_URL}/api/landing`);

  if (!response.ok) {
    throw new Error("Failed to fetch landing page");
  }

  const result = await response.json();
  return result.data;
}
import API_URL from "@/config/api";

export async function getPurchases() {
  const res = await fetch(`${API_URL}/purchases`);

  if (!res.ok) {
    throw new Error("Failed to load purchases");
  }

  return res.json();
}

export async function getPurchase(id) {
  const res = await fetch(`${API_URL}/purchases/${id}`);

  if (!res.ok) {
    throw new Error("Purchase not found");
  }

  return res.json();
}

export async function createPurchase(data) {
  const res = await fetch(`${API_URL}/purchases`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Unable to create purchase");
  }

  return res.json();
}

export async function updatePurchase(id, data) {
  const res = await fetch(`${API_URL}/purchases/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Unable to update purchase");
  }

  return res.json();
}

export async function deletePurchase(id) {
  const res = await fetch(`${API_URL}/purchases/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Unable to delete purchase");
  }

  return res.json();
}
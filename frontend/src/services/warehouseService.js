import API_URL from "@/config/api";

export async function getWarehouses() {
  const res = await fetch(`${API_URL}/warehouses`);

  if (!res.ok) {
    throw new Error("Failed to fetch warehouses");
  }

  return res.json();
}

export async function getWarehouseStock() {
  const res = await fetch(`${API_URL}/warehouses/stock`);

  if (!res.ok) {
    throw new Error("Failed to fetch stock");
  }

  return res.json();
}

export async function createTransfer(data) {
  const res = await fetch(`${API_URL}/warehouses/transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Transfer failed");
  }

  return res.json();
}

export async function getTransfers() {
  const res = await fetch(`${API_URL}/warehouses/transfers`);

  if (!res.ok) {
    throw new Error("Failed to fetch transfers");
  }

  return res.json();
}
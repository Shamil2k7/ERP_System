import API_URL from "@/config/api";

const BASE_URL = `${API_URL}/sales`;

/*
|--------------------------------------------------------------------------
| Get All Sales Orders
|--------------------------------------------------------------------------
*/

export async function getSalesOrders() {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch sales orders");
  }

  return await res.json();
}

/*
|--------------------------------------------------------------------------
| Get Single Sales Order
|--------------------------------------------------------------------------
*/

export async function getSalesOrderById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Sales order not found");
  }

  return await res.json();
}

/*
|--------------------------------------------------------------------------
| Create Sales Order
|--------------------------------------------------------------------------
*/

export async function createSalesOrder(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create sales order");
  }

  return await res.json();
}

/*
|--------------------------------------------------------------------------
| Update Sales Order
|--------------------------------------------------------------------------
*/

export async function updateSalesOrder(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update sales order");
  }

  return await res.json();
}

/*
|--------------------------------------------------------------------------
| Delete Sales Order
|--------------------------------------------------------------------------
*/

export async function deleteSalesOrder(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete sales order");
  }

  return await res.json();
}

/*
|--------------------------------------------------------------------------
| Update Order Status
|--------------------------------------------------------------------------
*/

export async function updateOrderStatus(id, status) {
  const res = await fetch(`${BASE_URL}/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update order status");
  }

  return await res.json();
}

/*
|--------------------------------------------------------------------------
| Customer Orders
|--------------------------------------------------------------------------
*/

export async function getCustomerOrders(customerId) {
  const res = await fetch(`${BASE_URL}/customer/${customerId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch customer orders");
  }

  return await res.json();
}

/*
|--------------------------------------------------------------------------
| Branch Orders
|--------------------------------------------------------------------------
*/

export async function getBranchOrders(branchId) {
  const res = await fetch(`${BASE_URL}/branch/${branchId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch branch orders");
  }

  return await res.json();
}

/*
|--------------------------------------------------------------------------
| Orders By Status
|--------------------------------------------------------------------------
*/

export async function getStatusOrders(status) {
  const res = await fetch(`${BASE_URL}/status/${status}`);

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return await res.json();
}
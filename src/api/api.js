const BASE_URL = `${process.env.REACT_APP_API_URL}/api`;

const headers = {
  "Content-Type": "application/json",
};

const handleResponse = async (res) => {
  let data = null;

  try {
    // try JSON first
    data = await res.clone().json();
  } catch {
    try {
      // fallback to text
      data = await res.text();
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    const errorMessage =
      (data && data.message) ||
      (typeof data === "string" && data) ||
      "Request failed (check backend)";
    throw new Error(errorMessage);
  }

  return data;
};

// ----------------- PLACES -----------------
export const getPlaces = async () => {
  const res = await fetch(`${BASE_URL}/places`);
  return handleResponse(res);
};

export const addPlace = async (data) => {
  const res = await fetch(`${BASE_URL}/places`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deletePlace = async (id) => {
  const res = await fetch(`${BASE_URL}/places/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
};

// ----------------- USERS -----------------
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

// ----------------- BOOKINGS -----------------
export const bookPlace = async (data) => {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

// ----------------- ADMIN -----------------
export const getUserCount = async () => {
  const res = await fetch(`${BASE_URL}/users/count`);
  return handleResponse(res);
};
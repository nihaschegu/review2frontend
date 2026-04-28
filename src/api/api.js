const BASE_URL = "http://localhost:8080/api";

// ----------------- PLACES -----------------
export const getPlaces = async () => {
  const res = await fetch(`${BASE_URL}/places`);
  if (!res.ok) throw new Error("Failed to fetch places");
  return res.json();
};

export const addPlace = async (data) => {
  const res = await fetch(`${BASE_URL}/places`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add place");
  return res.json();
};

export const deletePlace = async (id) => {
  const res = await fetch(`${BASE_URL}/places/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete place");
};

// ----------------- USERS -----------------
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to register");
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
};

// ----------------- BOOKINGS -----------------
export const bookPlace = async (data) => {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Booking failed");
  return res.json();
};

// ----------------- ADMIN -----------------
export const getUserCount = async () => {
  const res = await fetch(`${BASE_URL}/users/count`);
  if (!res.ok) throw new Error("Failed to fetch count");
  return res.json();
};
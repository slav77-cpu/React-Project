import request from "../utils/request.js";

const baseUrl = "http://localhost:3030/users";

export async function login(email, password) {
  const result = await request(`${baseUrl}/login`, "POST", { email, password });
  return result; // { _id, email, accessToken }
}

export async function register(email, password) {
  const result = await request(`${baseUrl}/register`, "POST", { email, password });
  return result;
}

export async function logout() {
  
  await request(`${baseUrl}/logout`, "GET");
}
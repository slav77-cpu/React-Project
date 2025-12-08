import request from "../utils/request.js";

const baseUrl = "http://localhost:3030/data/comments";


export async function getCommentsByCar(carId) {
  const query = encodeURIComponent(`carId="${carId}"`);
const load = encodeURIComponent('owner=_ownerId:users');

  const url = `${baseUrl}?where=${query}&load=${load}`;

  return request(url);
}


export async function addComment(carId, text,) {
  return request(baseUrl, "POST", { carId, text });
}

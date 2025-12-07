import request from "../utils/request";

const baseUrl = "http://localhost:3030/data/likes";

export async function getLikesCount(carId) {
  
  const query = encodeURIComponent(`carId="${carId}"`);
  

  try {
    const result = await request(
      `${baseUrl}?where=${query}&distinct=_ownerId&count`
    );
    return result;
  } catch (err) {
    
    if (err.message.includes("Collection does not exist")) {
      return 0;
    }
    throw err;
  }
}

export async function getUserLike(carId, userId) {
  
  const query = encodeURIComponent(
    `carId="${carId}" AND _ownerId="${userId}"`
  );
  const url = `${baseUrl}?where=${query}`;

  const result = await request(url);
  
  return result[0]; 
}

export async function addLike(carId) {
  return request(baseUrl, "POST", { carId });
}



export default async function request(url, method = "GET", data) {
  const options = {
    method,
    headers: {}
  };
  const token = localStorage.getItem("accessToken");
  if (token) {
    options.headers["X-Authorization"] = token;
  }

  if (data !== undefined) {
   options.headers["Content-Type"] = "application/json";
   options.body = JSON.stringify(data);
 }

 const response = await fetch(url, options);

 if (!response.ok) {
   let error = await response.json().catch(() => ({}));
   throw new Error(error.message || "Request failed");
 }

 
 if (response.status === 204) {
   return null;
 }

 return await response.json();
}

  

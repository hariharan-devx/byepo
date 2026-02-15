const API_BASE_URL = "http://127.0.0.1:3000/";

async function apiCall(path, method = "GET", data = null) {
  try {
    const response = await fetch(API_BASE_URL + path, {
      method,
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : null,
      credentials: "include",
    });
    const json = await response.json();
    if (!response.ok) {
      return { status: "fail", message: json.message || response.statusText };
    }
    return json;
  } catch (err) {
    return { status: "fail", message: err.message || "Unknown error" };
  }
}

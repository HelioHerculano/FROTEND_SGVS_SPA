const BASE_API = "http://127.0.0.1:8000/api";

export default {
  async post(url = "", data = {}) {
    const response = await fetch(`${BASE_API}` + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  async postFile(url = "", data = {}) {
    const response = await fetch(`${BASE_API}` + url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  async put(url = "", data = {}) {
    const response = await fetch(`${BASE_API}` + url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  async get(url = "") {
    const req = await fetch(`${BASE_API}` + url);
    const json = await req.json();
    return json;
  },

  async getOne(url = "") {
    const req = await fetch(`${BASE_API}` + url);
    const json = await req.json();
    return json;
  },

  async delete(url = "") {
    const response = await fetch(`${BASE_API}` + url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  },

  async active(url = "") {
    const response = await fetch(`${BASE_API}` + url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  },
};

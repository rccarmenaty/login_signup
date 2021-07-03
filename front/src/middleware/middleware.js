import jwt_decode from "jwt-decode";
import axios from "axios";

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const { data } = await axios.post("/private/refresh", {
      refreshToken,
    });

    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("username", data.username);

    return data;
  } catch (error) {}
};

axios.interceptors.request.use(
  async (config) => {
    const auth = localStorage.getItem("authToken");
    config.headers["authorization"] = `Bearer ${auth}`;
    config.params = { ...config.params, timestamp: Date.now() };

    const basePath = config.url.split("/")[1];

    if (basePath === "auth" || basePath === "private") return config;

    let currentDate = new Date();
    const token = localStorage.getItem("refreshToken");
    const decoded = jwt_decode(token);

    if (decoded.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();

      if (data) config.headers["authorization"] = `Bearer ${data.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    console.log(response);
    return response;
  },
  function (error, other) {
    console.log(other, error);
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    return Promise.reject(error);
  }
);

export default axios;

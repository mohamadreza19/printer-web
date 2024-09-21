import axios from "axios";

export let apiUrl = "http://5.160.185.2/api";

export function setBaseUrl(newApiUrl = "") {
  apiUrl = newApiUrl;
}

axios.interceptors.response.use(
  (response) => {
    // Modify or log the response
    console.log("Response received:", response);
    return response; // Must return the response to continue the chain
  },
  (error) => {
    // Handle response error
    const href = window.location.href;

    // Optionally handle status codes
    if (error.response && error.response.status === 403) {
      if (href.includes("admin")) {
        if (localStorage.getItem("admin-t")) localStorage.removeItem("t");
        window.location.href = "/admin/login";
      } else {
        if (localStorage.getItem("t")) localStorage.removeItem("t");
        window.location.href = "/login";
      }
    }
    if (error.response && error.response.status === 401) {
      if (href.includes("admin")) {
        if (localStorage.getItem("admin-t")) localStorage.removeItem("t");
        window.location.href = "/admin/login";
      } else {
        if (localStorage.getItem("t")) localStorage.removeItem("t");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error); // Reject the promise in case of error
  }
);

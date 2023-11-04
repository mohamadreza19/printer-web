import axios from "axios";
import { apiUrl } from "../urlStore";
export default class {
  static async login(body = { username: "", password: "" }) {
    try {
      const res = await axios.post(`${apiUrl}/admin/login`, body);
      return new Promise((resolve, _) => {
        resolve(res.data.accessToken);
      });
    } catch (error) {
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }
  static async add_user(token = "", body) {
    try {
      const res = await axios.post(`${apiUrl}/user/create`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      console.log(res);
      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      return new Promise((_, reject) => {
        reject(error.response.data);
      });
    }
  }
  static async add_product(token = "", body) {
    try {
      const res = await axios.post(`${apiUrl}/product`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      console.log(res);
      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      return new Promise((_, reject) => {
        reject(error.response.data);
      });
    }
  }
  static async add_label(token = "", body) {
    try {
      const res = await axios.post(`${apiUrl}/label`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      console.log(res);
      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      return new Promise((_, reject) => {
        reject(error.response.data);
      });
    }
  }
  static async add_project_templates(token = "", body) {
    try {
      const res = await axios.post(`${apiUrl}/project-templates`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });

      return new Promise((resolve, _) => {
        console.log("test");
        resolve(res.data);
      });
    } catch (error) {
      return new Promise((_, reject) => {
        reject(error.response.data);
      });
    }
  }
}

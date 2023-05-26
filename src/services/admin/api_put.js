import axios from "axios";
import { apiUrl } from "../urlStore";
export default class {
  static async edit_user(token = "", id, body) {
    try {
      const res = await axios.put(`${apiUrl}/user/${id}`, body, {
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
  static async edit_label(token = "", id, body) {
    try {
      const res = await axios.put(`${apiUrl}/label/${id}`, body, {
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
  static async edit_product(token = "", id, body) {
    try {
      const res = await axios.put(`${apiUrl}/product/${id}`, body, {
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
}

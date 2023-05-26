import axios from "axios";
import { apiUrl } from "../urlStore";
export default class {
  static async project_list(token = "", url) {
    if (!token) throw new Error("there isnt token");
    // let url = `${apiUrl}/project/user?`;
    // if (page) url = url.concat(`page=${page}&`);
    // if (limit) url = url.concat(`limit=${page}&`);
    // if (startDate) url = url.concat(`startDate=${startDate}&`);
    // if (endDate) url = url.concat(`endDate=${endDate}&`);
    try {
      const res = await axios({
        url: url,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }
  static async product_list(token = "") {
    if (!token) throw new Error("there isnt token");

    try {
      const res = await axios({
        url: `${apiUrl}/product?page=1&limit=10`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }
  static async label_list(token = "") {
    if (!token) throw new Error("there isnt token");

    try {
      const res = await axios({
        url: `${apiUrl}/label?page=1&limit=10`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }
  static async project_findOne(token = "", projectId = "") {
    if (!token) throw new Error("there isnt token");

    try {
      const res = await axios({
        url: `${apiUrl}/project/findOne/${projectId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }
}

import axios from "axios";
import { apiUrl } from "../urlStore";
export default class {
  static async login(body = { username: "", password: "" }) {
    // const bodyT = {
    //   username: "test1",
    //   password: "123456",
    // };

    try {
      const res = await axios.post(`${apiUrl}/user/login`, body);
      console.log(res);
      return new Promise((resolve, _) => {
        resolve(res.data.accessToken);
      });
    } catch (error) {
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }
  static async add_project(
    token = "",
    body = {
      createdBy: "string",
      projectName: "string",
    }
  ) {
    if (!token) throw new Error("there isnt token");

    try {
      const res = await axios({
        url: `${apiUrl}/project`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
          "Content-Type": "application/json",
        },
        data: body,
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
  static async add_image_to_local_prointer(file, width) {
    try {
      const res = await axios({
        url: `http://127.0.0.1:8888?width=${width}`,
        method: "POST",
        data: file,
        headers: {
          "Access-Control-Request-Private-Network": "true",
        },
      });

      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      console.log({ printerCorse: error });
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }
  static async add_label_bookmark(token = "", id = "") {
    if (!token) throw new Error("there isnt token");

    try {
      const res = await axios({
        url: `${apiUrl}/label/${id}/bookmark`,
        method: "POST",
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
  static async add_product_bookmark(token = "", id = "") {
    if (!token) throw new Error("there isnt token");

    try {
      const res = await axios({
        url: `${apiUrl}/product/${id}/bookmark`,
        method: "POST",
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
  static async add_print(token = "", body) {
    if (!token) throw new Error("there isnt token");

    try {
      const res = await axios({
        url: `${apiUrl}/print`,
        method: "POST",
        data: body,
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

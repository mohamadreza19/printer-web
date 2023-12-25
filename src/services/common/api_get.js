import axios from "axios";
import { apiUrl } from "../urlStore";

export default class {
  static async admin_user_image(token = "", fileId = "") {
    try {
      const res = await axios.get(`${apiUrl}/file/${fileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      console.log(error);
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }
  static async admin_user_symbol(token = "", id = "") {
    try {
      const res = await axios.get(`${apiUrl}/symbol/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // responseType: "blob",
      });

      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      console.log(error);
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }

  static async admin_user_image_slide(id = "") {
    try {
      const res = await axios.get(`${apiUrl}/slider/${id}`, {
        responseType: "blob",
      });

      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      console.log(error);
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }
  static async admin_user_labelList(token = "", pageParam, languageHeader) {
    try {
      const res = await axios.get(`${pageParam}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          language: languageHeader,
          // language: "test",
        },
      });

      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      console.log(error);
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }
  static async project_templates(token = "", pageParam, languageHeader) {
    try {
      const res = await axios.get(`${pageParam}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          language: languageHeader,
          // language: "test",
        },
      });

      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      console.log(error);
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }
  static async admin_user_productList(token = "", url, language) {
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          language,
        },
      });

      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      console.log(error);
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }
  static async symbols(token = "", pageParam) {
    try {
      const res = await axios.get(`${apiUrl}/${pageParam}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      // console.log(error);
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }
  static async sliders(pageParam) {
    try {
      const res = await axios.get(`${apiUrl}/${pageParam}`, {});
      // console.log(res);
      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      // console.log(error);
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }
  static async project_template_findOne(token = "", projectId = "") {
    if (!token) throw new Error("there isnt token");

    try {
      const res = await axios({
        url: `${apiUrl}/project-templates/${projectId}`,
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

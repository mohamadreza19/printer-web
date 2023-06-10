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
  static async admin_user_labelList(token = "", pageParam, languageHeader) {
    console.log({ languageHeader });
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
    console.log({ url });
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
}

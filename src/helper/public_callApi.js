import axios from "axios";
const api = "http://212.23.201.119:1235/api";

export default class {
  static async provinces(language = "") {
    try {
      const res = await axios.get(`${api}/provinces`, {
        headers: {
          language: language,
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
  static async cities(province = "", language = "") {
    try {
      const res = await axios.get(
        `${api}/provinces/cities?province=${province}`,
        {
          headers: {
            language: language,
          },
        }
      );

      return new Promise((resolve, _) => {
        resolve(res.data);
        console.log(res);
      });
    } catch (error) {
      console.log(error);
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }
}

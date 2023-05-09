import axios from "axios";
const api = "http://212.23.201.119:1235/api";
export default class {
  static async login(body = { username: "", password: "" }) {
    try {
      const res = await axios.post(`${api}/admin/login`, body);
      return new Promise((resolve, _) => {
        resolve(res.data.accessToken);
      });
    } catch (error) {
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }
  static async projects(token = "") {
    try {
      const res = await axios.get(`${api}/project/admin?page=1&limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
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

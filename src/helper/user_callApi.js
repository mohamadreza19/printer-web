import axios from "axios";
const api = "http://212.23.201.119:1235/api";
export default class {
  static async login(body = { username: "", password: "" }) {
    // const bodyT = {
    //   username: "test1",
    //   password: "123456",
    // };

    try {
      const res = await axios.post(`${api}/user/login`, body);
      // console.log(res);
      return new Promise((resolve, _) => {
        resolve(res.data.accessToken);
      });
    } catch (error) {
      return new Promise((_, reject) => {
        reject(error.message);
      });
    }
  }
  static async project_list(token = "") {
    if (!token) throw new Error("there isnt token");

    try {
      const res = await axios({
        url: `${api}/project/user?page=1&limit=10`,
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
  static async project_post(
    token = "",
    body = {
      createdBy: "string",
      projectName: "string",
    }
  ) {
    if (!token) throw new Error("there isnt token");

    try {
      const res = await axios({
        url: `${api}/project`,
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
  static async project_deleteOne(token = "", projectId = "") {
    if (!token) throw new Error("there isnt token");

    try {
      const res = await axios({
        url: `${api}/project/${projectId}`,
        method: "DELETE",
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
  static async project_findOne(token = "", projectId = "") {
    if (!token) throw new Error("there isnt token");

    try {
      const res = await axios({
        url: `${api}/project/findOne/${projectId}`,
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

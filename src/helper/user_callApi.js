import axios from "axios";
const api = "http://212.23.201.119:1235/api";
export default class {
  static async login(body = { username: "", password: "" }) {
    // const bodyT = {
    //   username: "test1",
    //   password: "123456",
    // };
    console.log(body);
    try {
      const res = await axios.post(`${api}/user/login`, body);
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
  static async project_list(
    token = "",
    page = "1",
    limit = "10",
    startDate = null,
    endDate = null
  ) {
    if (!token) throw new Error("there isnt token");
    let url = `${api}/project/user?`;
    if (page) url = url.concat(`page=${page}&`);
    if (limit) url = url.concat(`limit=${page}&`);
    if (startDate) url = url.concat(`startDate=${startDate}&`);
    if (endDate) url = url.concat(`endDate=${endDate}&`);
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
        url: `${api}/product?page=1&limit=10`,
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
        url: `${api}/label?page=1&limit=10`,
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

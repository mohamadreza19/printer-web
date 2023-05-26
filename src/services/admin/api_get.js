import axios from "axios";
import { apiUrl } from "../urlStore";
export default class {
  static async projects(token = "") {
    try {
      const res = await axios.get(`${apiUrl}/project/admin?page=1&limit=10`, {
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
  static async prints(
    token = "",
    page = 1,
    limit = 10,
    justProduct = false,
    justLabel = false,
    startDate = "",
    endDate = "",
    order = "ASC",
    pageParam
  ) {
    // let url = `${api}/print?`;
    // if (startDate && endDate) {
    //   url = url.concat(`startDate=${startDate}&`).concat(`endDate=${endDate}&`);
    // }
    // if (page) {
    //   url = url.concat(`page=${page}&`);
    // }
    // if (order) {
    //   url = url.concat(`order=${order}&`);
    // }
    // if (limit) {
    //   url = url.concat(`limit=${limit}&`);
    // }
    // if (justProduct) {
    //   url = url.concat(`justProduct=${justProduct}&`);
    // }
    // if (justLabel) {
    //   url = url.concat(`justLabel=${justLabel}&`);
    // }

    // console.log(url);
    try {
      const res = await axios.get(pageParam, {
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
  static async active_users(token = "") {
    try {
      const res = await axios.get(`${apiUrl}/user/stat/count`, {
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
  static async users(token = "", url) {
    try {
      const res = await axios.get(url, {
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
  static async print_statistics(token = "") {
    try {
      const res = await axios.get(`${apiUrl}/print/info/statistics`, {
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
  static async product_label(
    token = "",
    lan,
    page = 1,
    limit = 10,
    productLableFilter = "All",
    search,
    pageParam
  ) {
    console.log({ pageParam });
    let url = pageParam;
    try {
      // let url = `${api}/product-label?`;

      // if (page) {
      //   url = url.concat(`page=${page}&`);
      // }
      // if (limit) {
      //   url = url.concat(`limit=${limit}&`);
      // }
      // if (productLableFilter) {
      //   url = url.concat(`productLableFilter=${productLableFilter}&`);
      // }

      // if (search) {
      //   url.concat(`search=${search}&`);
      // }

      const res = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          language: lan,
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
  static async label_findOne(token = "", id = "") {
    try {
      const res = await axios.get(`${apiUrl}/label/${id}`, {
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
  static async product_findOne(token = "", id = "") {
    try {
      const res = await axios.get(`${apiUrl}/product/${id}`, {
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
  static async findOne_user(token = "", id) {
    try {
      const res = await axios.get(`${apiUrl}/user/${id}`, {
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

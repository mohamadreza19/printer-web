import axios from "axios";
import { apiUrl } from "../urlStore";
export default class {
  static async profile_info(token = "") {
    if (!token) throw new Error("there isnt token");
    const url = `${apiUrl}/admin/profile`;

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
  static async most_symbol(token = "") {
    if (!token) throw new Error("there isnt token");
    const url = `${apiUrl}/symbol/mostprint`;

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
  static async projects(token = "") {
    try {
      const res = await axios.get(`${apiUrl}/project/admin?page=1&limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // // console.log(res);
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
  static async prints(token = "", pageParam) {
    try {
      const res = await axios.get(pageParam, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // // console.log(res);
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

  static async prints_excel(token = "", pageParam) {
    try {
      const res = await axios.get(pageParam, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });
      // // console.log(res);
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
      // console.log(res);
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
      // console.log(res);
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
  static async admins(token = "", url) {
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
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
  static async print_statistics(token = "", startDate, endDate) {
    let url = `${apiUrl}/print/info/statistics?`;
    if (startDate && endDate) {
      url = url.concat(`startDate=${startDate}&`);
      url = url.concat(`endDate=${endDate}&`);
    }
    try {
      const res = await axios.get(`${url}/print/info/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
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
  static async product_label_count(token = "") {
    try {
      const res = await axios.get(`${apiUrl}/product-label/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
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
      // console.log(res);
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
      // console.log(res);
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
      // console.log(res);
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
      // console.log(res);
      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      return new Promise((_, reject) => {
        reject(error.response.data);
      });
    }
  }
  static async findOne_admin(token = "", id) {
    try {
      const res = await axios.get(`${apiUrl}/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      // console.log(res);
      return new Promise((resolve, _) => {
        resolve(res.data);
      });
    } catch (error) {
      return new Promise((_, reject) => {
        reject(error.response.data);
      });
    }
  }
  static async print_info_chart(token, interval, scale, startDate, endDate) {
    let url = `${apiUrl}/print/info/chart?`;

    if (interval) {
      url = url.concat(`interval=${interval}&`);
    }
    if (scale) {
      url = url.concat(`scale=${scale}&`);
    }
    if (startDate && endDate) {
      url = url.concat(`startDate=${startDate}&`);
      url = url.concat(`endDate=${endDate}&`);
    }
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      // // console.log(res);
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

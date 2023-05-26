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
      const res = await axios.get(`${api}/user/stat/count`, {
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
  // static async delete_user(token = "") {
  //   try {
  //     const res = await axios.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(res);
  //     return new Promise((resolve, _) => {
  //       resolve(res.data);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return new Promise((_, reject) => {
  //       reject(error.message);
  //     });
  //   }
  // }
  static async print_statistics(token = "") {
    try {
      const res = await axios.get(`${api}/print/info/statistics`, {
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
      const res = await axios.get(`${api}/label/${id}`, {
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
      const res = await axios.get(`${api}/product/${id}`, {
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
  static async admin_user_image(token = "", fileId = "") {
    try {
      const res = await axios.get(`${api}/file/${fileId}`, {
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

  static async findOne_user(token = "", id) {
    try {
      const res = await axios.get(`${api}/user/${id}`, {
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
  static async add_user(token = "", body) {
    try {
      const res = await axios.post(`${api}/user/create`, body, {
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
  static async edit_user(token = "", id, body) {
    try {
      const res = await axios.put(`${api}/user/${id}`, body, {
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
  static async add_product(token = "", body) {
    try {
      const res = await axios.post(`${api}/product`, body, {
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
  static async add_label(token = "", body) {
    try {
      const res = await axios.post(`${api}/label`, body, {
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
  static async edit_label(token = "", id, body) {
    try {
      const res = await axios.put(`${api}/label/${id}`, body, {
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
  static async edit_product(token = "", id, body) {
    try {
      const res = await axios.put(`${api}/product/${id}`, body, {
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
  static async delete_product(token = "", id) {
    try {
      const res = await axios.delete(`${api}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
  static async delete_label(token = "", id) {
    try {
      const res = await axios.delete(`${api}/label/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
  static async delete_user(token = "", id) {
    try {
      const res = await axios.delete(`${api}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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

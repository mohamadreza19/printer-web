import axios from "axios";
import { apiUrl } from "../urlStore";
export default class {
  static async project_deleteOne(token = "", projectId = "") {
    if (!token) throw new Error("there isnt token");

    try {
      const res = await axios({
        url: `${apiUrl}/project/${projectId}`,
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
}

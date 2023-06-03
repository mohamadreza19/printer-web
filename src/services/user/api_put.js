import axios from "axios";
import { apiUrl } from "../urlStore";
export default class {
  static async put_projectById(token, body, id) {
    if (!token) throw new Error("there isnt token");

    try {
      const res = await axios({
        url: `${apiUrl}/project/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
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
}

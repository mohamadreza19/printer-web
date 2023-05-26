import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import useAdd_product from "../helper/admin_add_product_label/control_product_dynamic_input/index";
import use_label from "../helper/admin_add_product_label/control_label_dynamic_input/index";
import useAdd_user_controller from "./admin_add_user/controlInputs";

import admin_callApi from "./admin_callApi";
import useAdmin_CachedToken from "../utility/useAdmin_CachedToken";
import useToastReducer from "../recoil/reducer/useToastReducer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLanguage } from "../recoil/readStore";
import useDeleteAlert from "../recoil/reducer/useDeleteAlert";

import useCachedToken from "../utility/useCachedToken";

let product_label_key = 1;
let admins_and_users_key = 1;
// export let admin_user_image = 1;
//_DELETE

//__product
export const AdminDelete_Product_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const queryClient = useQueryClient();
  const setDeleteAlert = useDeleteAlert();
  const setLoading = useToastReducer();
  const result = useMutation({
    mutationKey: "admin-delete_product",
    mutationFn: (option) => admin_callApi.delete_product(token, option.id),
    onSuccess: () => {
      console.log({ product_label_key });
      console.log("is Success");
      queryClient.invalidateQueries(product_label_key);
      product_label_key = Math.random() * 10;
    },
  });

  const { isSuccess, isLoading, error } = result;

  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));

      setDeleteAlert({
        isShow: false,
        message: "",
        deleteFn: () => {},
      });
    }
    if (error) {
      console.log(error);

      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);

  return { ...result };
};
export const AdminDelete_Label_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const queryClient = useQueryClient();
  const setDeleteAlert = useDeleteAlert();
  const setLoading = useToastReducer();
  const result = useMutation({
    mutationKey: "admin-delete-label",
    mutationFn: (option) => admin_callApi.delete_label(token, option.id),
    onSuccess: () => {
      console.log({ product_label_key });
      queryClient.invalidateQueries(product_label_key);
      product_label_key = Math.random() * 10;
    },
  });

  const { isSuccess, isLoading, error } = result;

  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));

      setDeleteAlert({
        isShow: false,
        message: "",
        deleteFn: () => {},
      });
    }
    if (error) {
      console.log(error);

      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);

  return { ...result };
};
export const AdminDelete_User_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const queryClient = useQueryClient();
  const setDeleteAlert = useDeleteAlert();
  const setLoading = useToastReducer();
  const result = useMutation({
    mutationKey: "admin-delete-label",
    mutationFn: (option) => admin_callApi.delete_user(token, option.id),
    onSuccess: () => {
      queryClient.invalidateQueries(admins_and_users_key);
      product_label_key = Math.random() * 10;
    },
  });

  const { isSuccess, isLoading, error } = result;

  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));

      setDeleteAlert({
        isShow: false,
        message: "",
        deleteFn: () => {},
      });
    }
    if (error) {
      console.log(error);

      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);

  return { ...result };
};

//_POST

//__login
export const AdminLogin_Mutation = () => {
  const result = useMutation({
    mutationKey: "admin-login",
    mutationFn: (body) => admin_callApi.login(body),
  });
  const is401 = result.error?.includes("401");
  let message = {
    fa: "",
  };
  let statusCode = 201;
  if (is401) {
    message = {
      fa: "نام کاربری یا رمز عبور اشتباه است",
    };
    statusCode = 401;
  }

  return { ...result, error: message.fa, statusCode };
};
//__user/create
export const AdminAddUser_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const meta = useAdd_user_controller(false, true);
  const result = useMutation({
    mutationKey: "add-user",
    mutationFn: (body) => admin_callApi.add_user(token, body),
  });
  const { isSuccess, isLoading, error } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));
    }
    if (error) {
      console.log(error);
      if (error.statusCode === 409) {
        const username = error.message.includes("username");
        const email = error.message.includes("email");

        let message = {
          userName: "این نام کاربری قبلا ثبت شده!",
          email: "این ایمیل قبلا ثبت شده !",
        };
        if (username) {
          meta.setUsername((draft) => ({ ...draft, errMsg: message.userName }));
          setLoading(() => ({
            isShow: false,
            message: "",
          }));
          return;
        }
        if (email) {
          setLoading(() => ({
            isShow: false,
            message: "",
          }));
          meta.setEmail((draft) => ({ ...draft, errMsg: message.email }));
          return;
        }
      }

      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);
  return { ...result };
};

//__product/create
export const AdminAddProduct_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const meta = useAdd_product("none", false, true, false);
  const modifedDate = { ...meta };

  delete modifedDate.picture;
  const result = useMutation({
    mutationKey: "add-product",
    mutationFn: (body) => admin_callApi.add_product(token, modifedDate),
  });
  const { isSuccess, isLoading, error } = result;
  useEffect(() => {
    if (isLoading) {
      // setLoading(() => ({
      //   isShow: true,
      //   message: "",
      // }));
    }
    if (isSuccess) {
      // setLoading(() => ({
      //   isShow: false,
      //   message: "",
      // }));
    }
    if (error) {
      console.log(error);

      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);
  return { ...result };
};
export const AdminEditProduct_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const meta = useAdd_product("none", false, true, false);
  const modifedDate = { ...meta };

  delete modifedDate.picture;
  const result = useMutation({
    mutationKey: "edit-product",
    mutationFn: (option) =>
      admin_callApi.edit_product(token, option.id, modifedDate),
  });
  const { isSuccess, isLoading, error } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));
    }
    if (error) {
      console.log(error);

      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);
  return { ...result };
};
//__label/create
export const AdminAddLabel_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const meta = use_label();
  const modifedDate = { ...meta.safeState };

  delete modifedDate.picture;
  const result = useMutation({
    mutationKey: "add-product",
    mutationFn: (body) => admin_callApi.add_label(token, modifedDate),
  });
  const { isSuccess, isLoading, error } = result;
  useEffect(() => {
    if (isLoading) {
      // setLoading(() => ({
      //   isShow: true,
      //   message: "",
      // }));
    }
    if (isSuccess) {
      // setLoading(() => ({
      //   isShow: false,
      //   message: "",
      // }));
    }
    if (error) {
      console.log(error);

      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);
  return { ...result };
};
export const AdminEditLabel_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const meta = use_label();
  const modifedDate = { ...meta.safeState };

  delete modifedDate.picture;
  const result = useMutation({
    mutationKey: "add-product",
    mutationFn: (option) =>
      admin_callApi.edit_label(token, option.id, modifedDate),
  });
  const { isSuccess, isLoading, error } = result;
  useEffect(() => {
    if (isLoading) {
      // setLoading(() => ({
      //   isShow: true,
      //   message: "",
      // }));
    }
    if (isSuccess) {
      // setLoading(() => ({
      //   isShow: false,
      //   message: "",
      // }));
    }
    if (error) {
      console.log(error);

      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);
  return { ...result };
};
//__file/image
export const AdminAddImage_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const [onLoadedMeta, setOnLoadedMeta] = useState(null);

  const result = useMutation({
    mutationKey: "add-product",
    mutationFn: async (payload) => {
      const { entityType, entityId, file } = payload;
      console.log(file.constructor === Blob);
      const formData = new FormData();
      formData.append("picture", file, file.name);
      return await axios.post(
        `http://212.23.201.119:1235/api/file/upload-image/admin?entityType=${entityType}&entityId=${entityId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },

          onUploadProgress: (progressEvent) => {
            // console.log(progressEvent);
            const { loaded, total } = progressEvent;
            // console.log({ loaded, total });
            const percentage = Math.floor((loaded / total) * 100);
            // console.log(percentage);
            const progressBar = document.getElementById("file-progress");
            const loadedTo_mg = document.getElementById("file-progress-loaded");
            const totalTo_mg = document.getElementById("file-progress-total");

            const loaded_mb = Number(loaded / Math.pow(1024, 2)).toFixed(2);
            const total_mb = Number(total / Math.pow(1024, 2)).toFixed(2);

            let uploadMeta = {
              loaded_mb: loaded_mb,
              total_mb: total_mb,
              percentage: percentage,
            };
            setOnLoadedMeta(uploadMeta);
            loadedTo_mg.innerText = `${loaded_mb}/`;
            totalTo_mg.innerText = `${total_mb}`;
            console.log({ loaded_mb, total_mb });

            progressBar.value = percentage;
          },
        }
      );
    },
  });

  return { ...result, onLoadedMeta };
};
export const AdminEditImage_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const [onLoadedMeta, setOnLoadedMeta] = useState(null);

  const result = useMutation({
    mutationKey: "add-product",
    mutationFn: async (payload) => {
      const { perviusFileId, file } = payload;
      console.log({ file });
      const formData = new FormData();

      formData.append("picture", file);

      return await axios.put(
        `http://212.23.201.119:1235/api/file/upload-image/admin/${perviusFileId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },

          onUploadProgress: (progressEvent) => {
            // console.log(progressEvent);
            const { loaded, total } = progressEvent;
            // console.log({ loaded, total });
            const percentage = Math.floor((loaded / total) * 100);
            // console.log(percentage);
            const progressBar = document.getElementById("file-progress");
            const loadedTo_mg = document.getElementById("file-progress-loaded");
            const totalTo_mg = document.getElementById("file-progress-total");

            const loaded_mb = Number(loaded / Math.pow(1024, 2)).toFixed(2);
            const total_mb = Number(total / Math.pow(1024, 2)).toFixed(2);

            let uploadMeta = {
              loaded_mb: loaded_mb,
              total_mb: total_mb,
              percentage: percentage,
            };
            setOnLoadedMeta(uploadMeta);
            loadedTo_mg.innerText = `${loaded_mb}/`;
            totalTo_mg.innerText = `${total_mb}`;
            console.log({ loaded_mb, total_mb });

            progressBar.value = percentage;
          },
        }
      );
    },
  });

  return { ...result, onLoadedMeta };
};

//_GET

//__project/admin
export const AdminUser_FindOne = (role = "admin", id) => {
  const { value: token } = useAdmin_CachedToken();
  const { value: userToken } = useCachedToken();
  const queryClient = useQueryClient();
  const setLoading = useToastReducer();

  const currentToken = role === "admin" ? token : userToken;

  const result = useQuery({
    queryKey: ["find-one-user", id],
    queryFn: () => admin_callApi.findOne_user(currentToken, id),
  });
  const { isLoading, isSuccess, error } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));
    }
    if (error) {
      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);

  return result;
};
export const AdminProjects = () => {
  const { value: token } = useAdmin_CachedToken();
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: "admin-projects",
    queryFn: () => admin_callApi.projects(token),
  });
  // const is401 = result.error?.includes("401");
  // let message = {
  //   fa: "",
  // };
  // let statusCode = 201;
  // if (is401) {
  //   message = {
  //     fa: "نام کاربری یا رمز عبور اشتباه است",
  //   };
  //   statusCode = 401;
  // }

  // return { ...result, error: message.fa, statusCode };
  return result;
};
export const AdminUsers = (search, order = "ASC") => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const queryClient = useQueryClient();
  let initialUrl = "http://212.23.201.119:1235/api/user?";
  if (search) {
    initialUrl = initialUrl.concat(`search=${search}&`);
  }
  initialUrl = initialUrl.concat(`order=${order}&`);
  const result = useInfiniteQuery({
    queryKey: ["admin-users", admins_and_users_key],
    queryFn: ({ pageParam = initialUrl }) =>
      admin_callApi.users(token, pageParam),
    getNextPageParam: (lastPageResult) => {
      return lastPageResult.links.next || undefined;
    },
  });
  const { isSuccess, isLoading, error } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));
    }
    if (error) {
      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);

  let modifedData = [];

  if (isSuccess) {
    result.data.pages.forEach((page) =>
      page.items.forEach((item) => modifedData.push(item))
    );
  }
  return { ...result, data: modifedData };
};

//__print
export const AdminPrints = (
  page = 1,
  limit = 10,
  justProduct = false,
  justLabel = false,
  startDate = "",
  endDate = "",
  order = "ASC"
) => {
  const { value: token } = useAdmin_CachedToken();
  const queryClient = useQueryClient();
  const setLoading = useToastReducer();
  let url = "http://212.23.201.119:1235/api/print?";
  if (startDate && endDate) {
    url = url.concat(`startDate=${startDate}&`).concat(`endDate=${endDate}&`);
  }
  if (page) {
    url = url.concat(`page=${page}&`);
  }
  if (order) {
    url = url.concat(`order=${order}&`);
  }
  if (limit) {
    url = url.concat(`limit=${limit}&`);
  }
  if (justProduct) {
    url = url.concat(`justProduct=${justProduct}&`);
  }
  if (justLabel) {
    url = url.concat(`justLabel=${justLabel}&`);
  }
  const result = useInfiniteQuery({
    queryKey: [
      "admin-print",
      startDate,
      endDate,
      order,
      page,
      justProduct,
      justLabel,
    ],
    queryFn: ({ pageParam = url }) =>
      admin_callApi.prints(
        token,
        page,
        limit,
        justProduct,
        justLabel,
        startDate,
        endDate,
        order,
        pageParam
      ),
    getNextPageParam: (lastPageResult) => {
      return lastPageResult.links.next || undefined;
    },
  });
  const { isLoading, isSuccess, error } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));
    }
    if (error) {
      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);
  let modifedDate = [];
  if (result.data) {
    result.data.pages.forEach((page) => {
      page.items.forEach((item) => modifedDate.push(item));
    });
  }
  return { ...result, data: modifedDate };
};
//__image
export const Admin_User_Image = (role = "admin") => {
  const adminToken = useAdmin_CachedToken();
  const userToken = useCachedToken();
  const queryClient = useQueryClient();
  const setLoading = useToastReducer();
  const result = useMutation({
    mutationKey: ["admin-user-image"],
    mutationFn: (option) => {
      const { fileId } = option;

      const currentToken =
        role === "admin" ? adminToken.value : userToken.value;
      return admin_callApi.admin_user_image(currentToken, fileId);
    },
  });
  const { isLoading, isSuccess, error } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));
    }
    if (error) {
      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);
  // console.log(result);
  return result;
};
//__user/stat/count
export const AdminActive_users = () => {
  const { value: token } = useAdmin_CachedToken();
  const queryClient = useQueryClient();
  const setLoading = useToastReducer();

  const result = useQuery({
    queryKey: "active-users",
    queryFn: () => admin_callApi.active_users(token),
  });
  const { isLoading, isSuccess, error } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));
    }
    if (error) {
      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);

  return result;
};
export const AdminPrintsStatistics = () => {
  const { value: token } = useAdmin_CachedToken();
  const queryClient = useQueryClient();
  const setLoading = useToastReducer();

  const result = useQuery({
    queryKey: "prints-statistics",
    queryFn: () => admin_callApi.print_statistics(token),
  });
  const { isLoading, isSuccess, error } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));
    }
    if (error) {
      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);
  return result;
};
//__product-label
export const AdminProduct_Label = (
  option = { productLableFilter: "", search: "", limit: "", page: "" }
) => {
  const { value: token } = useAdmin_CachedToken();
  const queryClient = useQueryClient();
  const setLoading = useToastReducer();
  const language = useLanguage();
  let lan = "persian";

  if (language === "fa") lan = "persian";
  if (language === "en") lan = "english";
  if (language === "tr") lan = "turkish";
  const { productLableFilter, search, limit, page } = option;
  // console.table(page, limit, productLableFilter, search);

  let initialUrl = `http://212.23.201.119:1235/api/product-label?productLableFilter=${productLableFilter}&page=1&limit=10&`;

  if (search) {
    initialUrl = initialUrl.concat(`search=${search}&`);
  }
  const result = useInfiniteQuery({
    queryKey: ["product_label", productLableFilter, search, product_label_key],
    queryFn: ({ pageParam = initialUrl }) => {
      return admin_callApi.product_label(
        token,
        lan,
        page,
        limit,
        productLableFilter,
        search,
        pageParam
      );
    },
    getNextPageParam: (lastPageResult) => {
      return lastPageResult.links.next || undefined;
    },
    onSuccess: () => {
      // console.log(admin_user_image);
      // queryClient.invalidateQueries(admin_user_image);
      // admin_user_image = Math.random() * 10;
    },
  });

  const { isLoading, isSuccess, error } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));
    }
    if (error) {
      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);

  let arr = [];
  if (result.isSuccess) {
    if (productLableFilter === "All") {
      result.data.pages.map((page) => {
        page.prodcuts.items.forEach((product) => {
          arr.push({ ...product, type: "product" });
        });

        page.labels.items.forEach((label) => {
          arr.push({ ...label, type: "label" });
        });
      });
      return { ...result, data: arr };
    }
    if (productLableFilter === "Product") {
      result.data.pages.map((page) => {
        page.prodcuts.items.forEach((product) => {
          arr.push({ ...product, type: "product" });
        });
      });

      return { ...result, data: arr };
    }
    if (productLableFilter === "Label") {
      result.data.pages.map((page) => {
        page.labels.items.forEach((label) => {
          arr.push({ ...label, type: "label" });
        });
      });
      return { ...result, data: arr };
    }
  }

  return { ...result, data: arr };
};
export const AdminLabel_findOne = (id = "") => {
  const { value: token } = useAdmin_CachedToken();

  const setLoading = useToastReducer();

  // console.table(page, limit, productLableFilter, search);

  const result = useQuery({
    queryKey: ["label-findOne"],
    queryFn: () => {
      return admin_callApi.label_findOne(token, id);
    },
  });

  const { isLoading, isSuccess, error } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));
    }
    if (error) {
      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);

  return result;
};
export const AdminProduct_findOne = (id = "") => {
  const { value: token } = useAdmin_CachedToken();

  const setLoading = useToastReducer();

  const result = useQuery({
    queryKey: ["label-findOne"],
    queryFn: () => {
      return admin_callApi.product_findOne(token, id);
    },
  });

  const { isLoading, isSuccess, error } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));
    }
    if (error) {
      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);

  return result;
};
//_put

//__user
export const AdminEditUser_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const meta = useAdd_user_controller(false, true);
  const result = useMutation({
    mutationKey: "edit-user",
    mutationFn: (option) =>
      admin_callApi.edit_user(token, option.id, option.body),
  });
  const { isSuccess, isLoading, error } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));
    }
    if (error) {
      console.log(error);
      if (error.statusCode === 409) {
        const username = error.message.includes("username");
        const email = error.message.includes("email");

        let message = {
          userName: "این نام کاربری قبلا ثبت شده!",
          email: "این ایمیل قبلا ثبت شده !",
        };
        if (username) {
          meta.setUsername((draft) => ({ ...draft, errMsg: message.userName }));
          setLoading(() => ({
            isShow: false,
            message: "",
          }));
          return;
        }
        if (email) {
          setLoading(() => ({
            isShow: false,
            message: "",
          }));
          meta.setEmail((draft) => ({ ...draft, errMsg: message.email }));
          return;
        }
      }

      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);
  return { ...result };
};

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import useAdmin_CachedToken from "../../utility/useAdmin_CachedToken";
import useCachedToken from "../../utility/useCachedToken";
import useToastReducer from "../../recoil/reducer/useToastReducer";

import api_get from "../../services/admin/api_get";
import { useEffect } from "react";
import {
  admins_and_users_key,
  product_label_key,
  setProduct_label_key,
} from "../querykey/admin_key";
import { useLanguage } from "../../recoil/readStore";
import { apiUrl } from "../../services/urlStore";
// export const Admin_Profile = ()
export const Admin_Profile_Call = () => {
  const { value } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const result = useQuery({
    queryKey: "user_profile",
    queryFn: () => api_get.profile_info(value),
  });

  const { isSuccess, isLoading, error } = result;

  useEffect(() => {
    if (isLoading) {
      setLoading({
        isShow: true,
        message: "",
      });
    }
    if (isSuccess) {
      setLoading({
        isShow: false,
        message: "",
      });
    }
    if (error) {
      setLoading({
        isShow: true,
        message: error.message,
      });
    }
  }, [isSuccess, error]);

  return result;
};

export const AdminUser_FindOne = (role = "admin", id) => {
  const { value: token } = useAdmin_CachedToken();
  const { value: userToken } = useCachedToken();
  const queryClient = useQueryClient();
  const setLoading = useToastReducer();

  const currentToken = role === "admin" ? token : userToken;

  const result = useQuery({
    queryKey: ["find-one-user", id],
    queryFn: () => api_get.findOne_user(currentToken, id),
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
  const setLoading = useToastReducer();
  const { value: token } = useAdmin_CachedToken();
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: "admin-projects",
    queryFn: () => api_get.projects(token),
  });
  const { isLoading, error, data } = result;

  useEffect(() => {
    if (isLoading) {
      setLoading({
        isShow: true,
        message: "",
      });
    }
    if (data) {
      setLoading({
        isShow: false,
        message: "",
      });
    }
  }, [isLoading, error, data]);

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
    queryKey: ["admin-users", admins_and_users_key, search],

    queryFn: ({ pageParam = initialUrl }) => api_get.users(token, pageParam),

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
      api_get.prints(
        token,
        // page,
        // limit,
        // justProduct,
        // justLabel,
        // startDate,
        // endDate,
        // order,
        pageParam
      ),
    getNextPageParam: (lastPageResult) => {
      let url = lastPageResult.links.next;
      // if (url) {
      //   if (startDate && endDate) {
      //     url = url
      //       .concat(`startDate=${startDate}&`)
      //       .concat(`endDate=${endDate}&`);
      //   }

      //   if (order) {
      //     url = url.concat(`&order=${order}&`);
      //   }

      //   if (justProduct) {
      //     url = url.concat(`justProduct=${justProduct}&`);
      //   }
      //   if (justLabel) {
      //     url = url.concat(`justLabel=${justLabel}&`);
      //   }
      // }

      return url || undefined;
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

export const AdminPrints_Excel = () => {
  const { value: token } = useAdmin_CachedToken();
  const queryClient = useQueryClient();
  const setLoading = useToastReducer();

  const result = useMutation({
    mutationKey: ["admin-print-excel"],
    mutationFn: (option) => {
      let url = "http://212.23.201.119:1235/api/print/export/excel?";
      const { page, limit, justProduct, justLabel, startDate, endDate, order } =
        option;
      if (startDate && endDate) {
        url = url
          .concat(`startDate=${startDate}&`)
          .concat(`endDate=${endDate}&`);
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
      return api_get.prints_excel(token, url);
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

export const AdminActive_users = () => {
  const { value: token } = useAdmin_CachedToken();
  const queryClient = useQueryClient();
  const setLoading = useToastReducer();

  const result = useQuery({
    queryKey: "active-users",
    queryFn: () => api_get.active_users(token),
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

export const AdminPrintsStatistics = (
  startDate,
  endDate,
  key_for_apiCall_acordingToDate
) => {
  const { value: token } = useAdmin_CachedToken();
  const queryClient = useQueryClient();
  const setLoading = useToastReducer();

  const result = useQuery({
    queryKey: ["prints-statistics", key_for_apiCall_acordingToDate],
    queryFn: () => api_get.print_statistics(token, startDate, endDate),
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
export const AdminProduct_Label_Count = () => {
  const { value: token } = useAdmin_CachedToken();
  const queryClient = useQueryClient();
  const setLoading = useToastReducer();

  const result = useQuery({
    queryKey: "product_label_count",
    queryFn: () => api_get.product_label_count(token),
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
      return api_get.product_label(
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
      return api_get.label_findOne(token, id);
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
      return api_get.product_findOne(token, id);
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
export const Admin_Print_Info_Chart = (
  interval,
  scale,
  key_for_apiCall_acordingToDate,
  startDate,
  endDate
) => {
  const { value: token } = useAdmin_CachedToken();

  const setLoading = useToastReducer();

  console.log(scale);
  const result = useQuery({
    queryKey: [
      "print_info_chart",
      interval,
      scale,
      key_for_apiCall_acordingToDate,
    ],
    queryFn: () => {
      return api_get.print_info_chart(
        token,
        interval,
        scale,
        startDate,
        endDate
      );
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
export const UserProjects_Excel_Call = () => {
  const { value: token } = useCachedToken();
  const setLoading = useToastReducer();
  let initUrl = `${apiUrl}/project/excel?`;

  const result = useMutation({
    mutationKey: ["user-projects-excel"],
    mutationFn: (option) => {
      const { search = "", startDate = null, endDate = null } = option;

      if (search) initUrl = initUrl.concat(`search=${search}&`);
      if (startDate) initUrl = initUrl.concat(`startDate=${startDate}&`);
      if (endDate) initUrl = initUrl.concat(`endDate=${endDate}&`);

      return api_get.project_excel_list(token, initUrl);
    },
  });

  const { isSuccess, isLoading, error, data } = result;

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

import { useEffect } from 'react';
import useToastReducer from '../../recoil/reducer/useToastReducer';
import useCachedToken from '../../utility/useCachedToken';
import { useParams } from 'react-router-dom';

import api_get from '../../services/user/api_get';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { projectsKey, user_project_findOne } from '../querykey/user_key';

import { apiUrl } from '../../services/urlStore';
import { useRecoilState, useSetRecoilState } from 'recoil';
import profile_store from '../../recoil/store/user/profile_store';
import project_store from '../../recoil/store/user/project_store';
import handleNextPageParam from '../../helper/handleNextPageParam';

export const User_Profile_Call = () => {
  const { value: userToken } = useCachedToken();
  const setProfile_store = useSetRecoilState(profile_store);
  const setLoading = useToastReducer();
  const result = useQuery({
    queryKey: 'user_profile',
    queryFn: () => api_get.profile_info(userToken),
  });

  const { isSuccess, isLoading, error, data } = result;

  useEffect(() => {
    if (isLoading) {
      setLoading({
        isShow: true,
        message: '',
      });
    }
    if (isSuccess) {
      setLoading({
        isShow: false,
        message: '',
      });
      if (data) {
        setProfile_store(data);
      }
    }
    if (error) {
      setLoading({
        isShow: true,
        message: error.message || 'Error',
      });
    }
  }, [isSuccess, error]);

  return result;
};

export const UserProjects_Call = (
  search = '',
  startDate = null,
  endDate = null
) => {
  const { value: token } = useCachedToken();
  const setLoading = useToastReducer();
  let initUrl = `${apiUrl}/project/user?`;

  // if (page) initUrl = initUrl.concat(`page=${page}&`);
  // if (limit) initUrl = initUrl.concat(`limit=${limit}&`);
  if (search) initUrl = initUrl.concat(`search=${search}&`);
  if (startDate) initUrl = initUrl.concat(`startDate=${startDate}&`);
  if (endDate) initUrl = initUrl.concat(`endDate=${endDate}&`);

  const result = useInfiniteQuery({
    queryKey: ['user-projects', search, projectsKey, startDate, endDate],
    queryFn: ({ pageParam = initUrl }) =>
      api_get.project_list(token, pageParam),
<<<<<<< HEAD
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.meta;

      if (currentPage < totalPages) {
        return `${initUrl}?page=${Number(currentPage) + 1}&limit=10`;
      }
      return undefined;
    },
=======
    getNextPageParam: (lastPage) => handleNextPageParam(lastPage.meta, initUrl),
>>>>>>> 62d5c10e2030d9df2e4702c613f150f9ddcdf498
  });

  const { isSuccess, isLoading, error, data } = result;

  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: '',
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: '',
      }));
    }
    if (error) {
      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);
  let modifiedData = [];
  if (data) {
    data.pages.forEach((page) =>
      page.items.forEach((item) => modifiedData.push(item))
    );
  }

  return { ...result, data: modifiedData };
};
export const UserProjects_Excel_Call = () => {
  const { value: token } = useCachedToken();
  const setLoading = useToastReducer();
  let initUrl = `${apiUrl}/project/excel?`;

  const result = useMutation({
    mutationKey: ['user-projects-excel'],
    mutationFn: (option) => {
      const { search = '', startDate = null, endDate = null } = option;

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
        message: '',
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: '',
      }));
    }
    if (error) {
      setLoading(() => ({
        isShow: false,
        message: 'error',
      }));
    }
  }, [isSuccess, isLoading, error]);

  return result;
};

export const UserProduct_Qury = () => {
  const { value: token } = useCachedToken();
  return useQuery({
    queryKey: ['product_list', projectsKey],
    queryFn: () => api_get.product_list(token),
  });
};

export const UserProjectFindOne_Qury = () => {
  const setProjectState = useSetRecoilState(project_store);
  const setLoading = useToastReducer();
  const { value: token } = useCachedToken();
  const { projectId } = useParams();
  const result = useQuery({
    queryKey: ['project-findOne', user_project_findOne],
    queryFn: () => api_get.project_findOne(token, projectId),
  });
  const { data, isLoading, isSuccess, error } = result;

  useEffect(() => {
    if (isLoading) {
      setLoading({
        isShow: true,
        message: '',
      });
    }
    if (isSuccess) {
      setLoading({
        isShow: false,
        message: '',
      });
      if (data) {
        let copy = { ...data };

        delete copy.userId;
        delete copy.id;
        delete copy.createdBy;
        delete copy.createdAt;
        delete copy.updatedAt;
        delete copy.deleteDate;

        setProjectState(copy);
      }
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

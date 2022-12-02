import axios from 'axios';

export const catchError = (ex: any) => {
  console.warn(ex);
  throw ex;
};

export const axiosApiInstance = axios.create({
  validateStatus: function (status) {
    const valid = [200, 201, 204];
    return valid.includes(status);
  },
});

axiosApiInstance.interceptors.request.use(
  async (config: any) => {
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  },
);

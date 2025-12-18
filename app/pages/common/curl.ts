import axios from "axios";
/**
 * 前端封装的 curl 方法
 * @param url
 * @param method
 * @param headers
 * @param data
 * @param responseType
 * @param timeout
 * @param errorMessage
 */
const curl = (
  url: string,
  method: string = "POST",
  headers: object,
  query: object,
  data: object,
  //   responseType: ResponseType | undefined,
  timeout: 60000,
  errorMessage: string = "网络异常"
) => {
  const ajaxString = {
    url,
    method,
    headers,
    params: query,
    data,
    // responseType,
    timeout,
  };

  return axios
    .request(ajaxString)
    .then((response: any) => {
      const resData = response.data || {};
      const { success } = resData;
      if (!success) return Promise.reject(resData);
      return response.data;
    })
    .catch((error: any) => {
      const { message } = error;
      return Promise.resolve(message);
    });
};

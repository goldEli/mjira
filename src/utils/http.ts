import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;
interface IConfig extends RequestInit {
  token?: string;
  data?: object;
}

export const http = (
  url: string,
  { data, token, headers, ...customConfig }: IConfig = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    url = `${url}?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return fetch(`${apiUrl}/${url}`, config).then(async (response) => {
    if (response.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();

  return (...[url, config]: Parameters<typeof http>) => {
    return http(url, { ...config, token: user?.token });
  };
};

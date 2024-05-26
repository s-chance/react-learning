import { LoginForm } from "@/pages/Login/types";
import { request } from "@/utils";

export const loginApi = (formData: LoginForm) => {
  return request({
    url: "/authorizations",
    method: "post",
    data: formData,
  });
};

export const getUserInfoApi = () => {
  return request({
    url: "/user/profile",
    method: "get",
  });
};

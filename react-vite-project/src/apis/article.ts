import { FormType } from "@/pages/Publish/types";
import { request } from "@/utils";

export const getChannelApi = () => {
  return request({
    url: "/channels",
    method: "get",
  });
};

export const createArticleApi = (data: FormType) => {
  return request({
    url: "article",
    method: "post",
    data: data,
  });
};

import { ArticleQueryParams } from "@/pages/Article/types";
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

export const getArticleListApi = (params?: ArticleQueryParams) => {
  return request({
    url: "/articles",
    method: "get",
    params,
  });
};

export const delArticleApi = (id: string) => {
  return request({
    url: `/articles/${id}`,
    method: "delete",
  });
};

export const getArtcicleByIdApi = (id: string) => {
  return request({
    url: `/articles/${id}`,
    method: "get",
  });
};

import { request } from "@/utils";

export const getChannelApi = () => {
  return request({
    url: "/channels",
    method: "get",
  });
};

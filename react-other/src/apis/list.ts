import { http } from "@/utils";
import type { ResType } from "./shared";

export type ChannelItem = {
  id: number;
  name: string;
};

type ChannelRes = {
  channels: ChannelItem[];
};

export function fetchChannelAPI() {
  return http.request<ResType<ChannelRes>>({
    url: "/channels",
  });
}

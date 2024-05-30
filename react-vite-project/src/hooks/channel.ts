import { getChannelApi } from "@/apis/article";
import { useEffect, useState } from "react";

type ChannelsType = [
  {
    id: string;
    name: string;
  }
];

const useChannel = () => {
  const [channelList, setChannelList] = useState<ChannelsType>([
    { id: "", name: "" },
  ]);
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelApi();
      setChannelList(res.data.channels);
    };
    getChannelList();
  }, []);
  return { channelList };
};

export { useChannel };

import { useEffect, useState } from "react";
import "./style.css";
import { Tabs } from "antd-mobile";
import { fetchChannelAPI, type ChannelItem } from "@/apis/list";

const Home = () => {
  const [channels, setChannels] = useState<ChannelItem[]>([]);

  useEffect(() => {
    const getChannels = async () => {
      try {
        const res = await fetchChannelAPI();
        setChannels(res.data.data.channels);
      } catch (error) {
        throw new Error("fetch channels error: " + error);
      }
    };
    getChannels();
  }, []);

  return (
    <div className="tabContainer">
      {/* tab区域 */}
      <Tabs>
        {channels.map((item) => {
          return <Tabs.Tab title={item.name} key={item.id}></Tabs.Tab>;
        })}
        {/* list组件 */}
      </Tabs>
    </div>
  );
};

export default Home;

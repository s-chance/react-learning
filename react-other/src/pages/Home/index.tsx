import "./style.css";
import { Tabs } from "antd-mobile";
import { useTabs } from "./useTabs";

const Home = () => {
  const { channels } = useTabs();

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

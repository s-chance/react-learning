import "./style.css";
import { Tabs } from "antd-mobile";
import { useTabs } from "./useTabs";
import HomeList from "./HomeList";

const Home = () => {
  const { channels } = useTabs();

  return (
    <div className="tabContainer">
      {/* tab区域 */}
      <Tabs>
        {channels.map((item) => {
          return (
            <Tabs.Tab title={item.name} key={item.id}>
              {/* list组件 */}
              <HomeList />
            </Tabs.Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Home;

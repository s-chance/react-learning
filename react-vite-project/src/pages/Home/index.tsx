import BasicBarChart from "./components/BasicBarChart";

const Home = () => {
  const xAxisData = ["Vue", "React", "Angular"];

  return (
    <div>
      <BasicBarChart
        title={"前端框架使用量"}
        xAxisData={xAxisData}
        seriesData={[90, 90, 70]}
      />
      <BasicBarChart
        title={"前端框架满意度"}
        xAxisData={xAxisData}
        seriesData={[90, 90, 60]}
      />
    </div>
  );
};

export default Home;

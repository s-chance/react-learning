import * as echarts from "echarts/core";
import { GridComponent, GridComponentOption } from "echarts/components";
import { BarChart, BarSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useRef } from "react";

echarts.use([GridComponent, BarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | BarSeriesOption
>;

const option: EChartsOption = {
  xAxis: {
    type: "category",
    data: ["Vue", "React", "Angular"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [10, 40, 70],
      type: "bar",
    },
  ],
};

const Home = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
  });
  return (
    <div>
      <div ref={chartRef} style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
};

export default Home;

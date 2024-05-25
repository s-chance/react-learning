import * as echarts from "echarts/core";
import {
  GridComponent,
  GridComponentOption,
  TitleComponent,
  TitleComponentOption,
} from "echarts/components";
import { BarChart, BarSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useRef } from "react";

echarts.use([GridComponent, TitleComponent, BarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | TitleComponentOption | BarSeriesOption
>;

type PropsType = {
  title: string;
  xAxisData: string[];
  seriesData: number[];
};

const BasicBarChart = ({ title, xAxisData, seriesData }: PropsType) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const option: EChartsOption = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: xAxisData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: seriesData,
          type: "bar",
        },
      ],
    };

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

export default BasicBarChart;

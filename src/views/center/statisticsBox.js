import { useEffect,useState } from "react";
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { PieChart, LineChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
import { Radio } from "antd";
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PieChart,
  CanvasRenderer,
  LegendComponent,
  LineChart,
]);
const pieOption = {
  legend: {
    bottom: 20,
  },
  series: [
    {
      type: "pie",
      radius: [30, 160],
      center: ["50%", "40%"],
      roseType: "area",
      itemStyle: {
        borderRadius: 10,
      },
      data: [
        { value: 40, name: "rose 1" },
        { value: 38, name: "rose 2" },
        { value: 32, name: "rose 3" },
        { value: 30, name: "rose 4" },
        { value: 28, name: "rose 5" },
        { value: 26, name: "rose 6" },
        { value: 22, name: "rose 7" },
        { value: 18, name: "rose 8" },
      ],
    },
  ],
};
const Lineoption = {
  tooltip: {
    trigger: "axis",
  },
  legend: {
    right: 30,
    bottom: 0,
    icon: "circle",
    data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "10%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  yAxis: {
    type: "value",
    splitLine: {
        show: false //去掉折线图中的横线
    }
  },
 
  series: [
    {
      name: "邮件营销",
      type: "line",
      symbol: "none",
      smooth: true,
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "联盟广告",
      type: "line",
      symbol: "none",
      smooth: true,
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "视频广告",
      type: "line",
      symbol: "none",
      smooth: true,
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "直接访问",
      type: "line",
      symbol: "none",
      smooth: true,
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: "搜索引擎",
      symbol: "none",
      type: "line",
      smooth: true,
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};
export default (props) => {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  useEffect(() => {
    const pieChart = echarts.init(document.getElementById("pieBox"));
    const lineChart = echarts.init(document.getElementById("lineBox"));
    pieChart.setOption(pieOption);
    lineChart.setOption(Lineoption);
  }, []);
  return (
    <div className="statistics_box">
      <div className="row-center lineBox_wrapper">
      <div className="control_row">
            <Radio.Group onChange={onChange} value={value} optionType="button" buttonStyle="solid">
              <Radio value={1}>月</Radio>
              <Radio value={2}>周</Radio>
              <Radio value={3}>日</Radio>
            </Radio.Group>
          </div>
        <div id="lineBox">
       
        </div>
      </div>
      <div className="row-center">
        <div id="pieBox"></div>
      </div>
    </div>
  );
};

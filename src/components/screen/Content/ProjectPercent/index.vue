<!-- 医师力量分布情况 -->
<template>
  <BorderFrameOne class="project-percent">
    <BorderFrameFlyLight>
      <FlexContent>
        <BorderFrameTitleFour :title="`${hospitailName}医师力量分布`" />
        <div class="content">
          <DataLoading :loading="apiLoading" :data="chartData">
            <div
              v-for="(item, index) in chartData"
              :key="'chart' + index"
              class="chart-module"
            >
              <CirclePercentChart
                width="100%"
                height="90%"
                :chart-data="chartData"
                :title="item.name"
                :show_index="index"
                :series="series"
                :chart-value="item.percent"
                :color-list="colorList[index]"
                :tooltip=tooltip
                :scale="contrastRatio"
              />
            </div>
          </DataLoading>
        </div>
      </FlexContent>
    </BorderFrameFlyLight>
  </BorderFrameOne>
</template>

<script setup>
import { ref } from "vue";
import CirclePercentChart from "@/components/chart/CirclePercentChart/index.vue";
import hooks from "@/hooks";

const { useChartOption, useScreenModuleData } = hooks;
const { formatTooltip } = useChartOption();

const chartData = ref([])
const colorList = ref([
  ["#3cc9df", "#76ffb9"],
  ["#d55800", "#f7b500"],
  ["#b7d5bf","#45f3fd"],
  ["#2aa4ff","pink"],
  ["#45f3fd","#fff"],
]); 

const series = [
  {
    name: "人数",
    property: "value",
  },
]
const tooltip =  {
    trigger: "axis",
    position: function (pos, params, dom, rect, size) {
      let obj = {};

      const horizontalPosIndex = +(pos[0] < size.viewSize[0] / 2);
      // const verticalPosIndex = +(pos[1] < size.viewSize[1] / 2);

      obj[["left", "right"][horizontalPosIndex]] = "1%";   // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
      console.log(size)
      console.log(pos);
      // obj["right"] = "10";
      // obj[["bottom", "top"][verticalPosIndex]] = [
      //   [size.viewSize[1] - pos[1] + 10, pos[1] + 10][verticalPosIndex],
      // ]; 
      // 鼠标在上方时 tooltip 显示到下方，鼠标在下方时 tooltip 显示到上方。
      return obj
    },
    formatter: (p) => {
      const scale = contrastRatio.value;
      const fontSize = 14;
      const { name, marker, color, value ,data} = p[0];
      return `<div style="font-size:${fontSize * scale}px;">
        ${marker} ${name}
        <span style="color:${color};" >${chartData.value[data.index].value}</span> 人 <span style="color:${color};" >（${value+ '%'}）</span>
        </div>`;
    }
      // return `<div style="font-size:${fontSize}px;">
      //   ${marker} ${name}
      //   <span style="color:${color};" >${value}</span>个
      //   </div>`;
  };

const hospitailName = "医院";

const handleApiData = (data) => {
  chartData.value = data?.projectTypePercentData || [];
};

const { apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped>
:deep(.data-loading-container) {
  justify-content: space-around;  
}

.chart-module {
  width: 33.33%;
  height: 100%;
}
</style>

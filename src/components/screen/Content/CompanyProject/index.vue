<!-- 前三名药物使用的历史情况 -->
<template>
  <BorderFrameOne class="company-project-container">
    <BorderFrameFlyLight>
      <FlexContent>
        <BorderFrameTitleFour title="前三名用药历史情况">
          <template #extra>
            <span class="unit">(单位：盒)</span>
          </template>
        </BorderFrameTitleFour>
        <div class="content">
          <DataLoading :loading="apiLoading" :data="chart.chartData">
            <GradientLineChart
              :chart-data="chart.chartData"
              :axis="chart.axis"
              :series="chart.series"
              :scale="contrastRatio"
              :tooltip="chart.tooltip"
              :grid="chart.grid"
              :label-font-size="chart.labelFontSize"
              :autoplay="chart.autoplay"
              :color-list="chart.colorList"
              :titleList="titleList"
              :legend = "chart.legend"
            />
          </DataLoading>
        </div>
      </FlexContent>
    </BorderFrameFlyLight>
  </BorderFrameOne>
</template>

<script setup>
import { reactive,onMounted,ref} from "vue";
import GradientLineChart from "@/components/chart/GradientLineChart/index.vue";
import hooks from "@/hooks";

const { useChartOption, useScreenModuleData } = hooks;
const { formatTooltip } = useChartOption();
// const titleList = ref([])
const chart = reactive({
  chartData: [],
  axis: {
    property: "name",
  },
  series: [
    {
      property: "one_value",
    },
    {
      property: "two_value",
    },
    {
      property: "three_value",
    },
  ],
  tooltip: {
    trigger: "axis",
    formatter: (p) => formatTooltip(p, { unit: "盒（瓶）", scale: contrastRatio.value }),
  },
  grid: {
    top: "12%",
    bottom: 0,
    left: "4%",
    right: "2%",
  },
  labelFontSize: 14,
  autoplay: true,
  colorList: ["#42cdff", "#21afff", "#1fff83", "#46ffea", "#ff62b5", "#ff46fd"],
  legend:[]
});

const handleApiData = (data) => {
  chart.chartData = data?.medicinehistoryData || []
  chart.legend = [chart.chartData[0].one,chart.chartData[0].two,chart.chartData[0].three]
  // titleList.value.splice(0,3,chart.chartData[0].one,chart.chartData[0].two,chart.chartData[0].three)
}
const { apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
// onMounted(async()=>{
//         //dom 挂载后
//         const { apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
//       })
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

.company-project-container {
  @include line-title-set-unit();
}
</style>

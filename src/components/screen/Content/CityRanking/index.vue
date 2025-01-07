<!-- 流行疾病排行模块 -->
<template>
  <BorderFrameOne class="city-ranking-container">
    <BorderFrameFlyLight>
      <FlexContent>
        <BorderFrameTitleFour title="主要疾病排行">
          <template #extra>
            <span class="unit">(单位：起)</span>
          </template>
        </BorderFrameTitleFour>
        <div class="content">
          <DataLoading :loading="apiLoading" :data="chart.chartData">
            <RankingBarChart
              :title="chart.title"
              :chart-data="chart.chartData"
              :axis="chart.axis"
              :series="chart.series"
              :scale="contrastRatio"
              :label-font-size="chart.labelFontSize"
              :top-num="chart.topNum"
              :top-colors="chart.topColors"
              :default-colors="chart.defaultColors"
              :grid="chart.grid"
            />
          </DataLoading>
        </div>
      </FlexContent>
    </BorderFrameFlyLight>
  </BorderFrameOne>
</template>

<script setup>
import { reactive } from "vue";
import RankingBarChart from "@/components/chart/RankingBarChart/index.vue";
import hooks from "@/hooks";

const { useScreenModuleData } = hooks;

const chart = reactive({
  chartData: [],
  axis: {
    property: "name",
  },
  series: {
    property: "users",
    childNum:"companines"
  },
  labelFontSize: 14,
  topNum: 3,
  topColors: ["#ff65e5", "#fd6581"],
  defaultColors: ["#3368ff", "#50ffef"],
  grid: {
    right: 0,
    bottom: "-10%",
  },
});

const handleApiData = (data) => {
  console.log(data);
  chart.chartData = data?.cityData || [];
};
// useScreenModuleData(handleApiData);
const { apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
</script> 

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

.city-ranking-container {
  @include line-title-set-unit();
}
</style>

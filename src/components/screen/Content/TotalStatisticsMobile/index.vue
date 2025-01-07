<!-- 中间数据展示移动端 -->
<template>
  <div class="total-statistics-mobile-container">
    <div class="statistics-card-list">
      <div class="statistics-card-item">
        <StatisticsCardOne :name="serviceCompanines.name">
          <template #value>
            <span :style="`color: ${serviceCompanines.valueColor}`">
              <FadeNum v-model:value="serviceCompanines.changeNum">
                <CountUp
                  :delay="countUpOption.delay"
                  :startVal="serviceCompanines.oldValue"
                  :endVal="serviceCompanines.value"
                  :options="countUpOption"
                />
              </FadeNum>
            </span>
          </template>
        </StatisticsCardOne>
      </div>
      <div class="statistics-card-item">
        <StatisticsCardOne :name="serviceUsers.name" direction="right">
          <template #value>
            <span :style="`color: ${serviceUsers.valueColor}`">
              <FadeNum v-model:value="serviceUsers.changeNum">
                <CountUp
                  :delay="countUpOption.delay"
                  :startVal="serviceUsers.oldValue"
                  :endVal="serviceUsers.value"
                  :options="countUpOption"
                />
              </FadeNum>
            </span>
          </template>
        </StatisticsCardOne>
      </div>
      <div class="statistics-card-item">
        <StatisticsCardOne :name="developApps.name">
          <template #value>
            <span :style="`color: ${developApps.valueColor}`">
              <FadeNum v-model:value="developApps.changeNum">
                <CountUp
                  :delay="countUpOption.delay"
                  :startVal="developApps.oldValue"
                  :endVal="developApps.value"
                  :options="countUpOption"
                />
              </FadeNum>
            </span>
          </template>
        </StatisticsCardOne>
      </div>
      <div class="statistics-card-item">
        <StatisticsCardOne :name="monitorServers.name" direction="right">
          <template #value>
            <span :style="`color: ${monitorServers.valueColor}`">
              <CountUp
                :delay="countUpOption.delay"
                :startVal="monitorServers.oldValue"
                :endVal="monitorServers.value"
                :options="countUpOption"
              />
            </span>
          </template>
        </StatisticsCardOne>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import StatisticsCardOne from "@/components/common/StatisticsCard/One.vue";
import FadeNum from "@/components/common/FadeNum/index.vue";
import hooks from "@/hooks";

const { useCountUp, useScreenModuleData } = hooks;
const { CountUp, countUpOption } = useCountUp();

const isFrist = ref(true);

const serviceCompanines = reactive({
  name: "执行手术台数",
  oldValue: 0,
  value: 0,
  valueColor: "#ffe66d",
  changeNum: 0,
});

const serviceUsers = reactive({
  name: "总计挂号人数",
  oldValue: 0,
  value: 0,
  valueColor: "#45f3fd",
  changeNum: 0,
});

const developApps = reactive({
  name: "今日门诊人数",
  oldValue: 0,
  value: 0,
  valueColor: "#71ffaa",
  changeNum: 0,
});

const monitorServers = reactive({
  name: "累计抢救人数",
  oldValue: 0,
  value: 0,
  valueColor: "#fd65b9",
  changeNum: 0,
});

const handleApiData = (data) => {
  if (!data) return false;
  console.log(data)
  const {
    serviceCompanines: companines,
    serviceUsers: users,
    // developApps: apps,
    monitorServers: servers,
  } = data.statisticsData;

  let today = new Date().getDay() - 1;
  today = today < 0 ? 6 : today;
  const {
    outpatient_service: apps
  } = data.weekData.at(today);

  if (!isFrist.value) {
    // serviceCompanines.oldValue = serviceCompanines.value;
    // serviceUsers.oldValue = serviceUsers.value;

    // serviceCompanines.changeNum = companines - serviceCompanines.value;
    // serviceUsers.changeNum = users - serviceUsers.value;
    serviceCompanines.oldValue = serviceCompanines.value;
    serviceUsers.oldValue = serviceUsers.value;
    developApps.oldValue = developApps.value

    serviceCompanines.changeNum = companines - serviceCompanines.value;
    serviceUsers.changeNum = users - serviceUsers.value;
    developApps.changeNum = apps - developApps.value
  }

  serviceCompanines.value = companines;
  serviceUsers.value = users;

  developApps.value = apps;
  monitorServers.value = servers;

  if (isFrist.value) {
    isFrist.value = false;
  }
};

useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

.total-statistics-container {
  height: 100%;
  position: relative;
  overflow: hidden;
}

.statistics-card-list {
  display: flex;
  flex-wrap: wrap;
}

.statistics-card-item {
  width: 50%;
  padding: size(10) 0;

  &:nth-child(2n){
    padding-left: size(7.5);
  }

  &:nth-child(2n + 1){
    padding-right: size(7.5);
  }
}


@media screen and (max-width: 560px) {
  .statistics-card-item {
    width: 100%;
    padding: size(10) 0 !important;
  }
}
</style>

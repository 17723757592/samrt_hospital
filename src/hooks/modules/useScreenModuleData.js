/*
 * 模块 : 监控平台模块数据配置
 */
import { inject, watch } from "vue";
import { isFunction } from "lodash";

export default function (handleApiData) {
  const apiData = inject("getApiData", null);
  const apiLoading = inject("getApiLoading", false);
  const contrastRatio = inject("getContrastRatio", 1);

  watch(
    () => apiData.value,
    (val) => {
      if (handleApiData && isFunction(handleApiData)) {
        handleApiData(val);
      }
    },
    {
      immediate: true,
    }
  );

  return {
    apiData,
    apiLoading,
    contrastRatio,
  };
}

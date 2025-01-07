/*
 * 模块 : 大屏导航模块
 */
import { provide, ref } from "vue";

export default function () {
  const activeNavIndex = ref(0);

  provide("getActiveNavIndex", activeNavIndex);

  /**
   * 导航改变事件
   *
   * @param {number} val 导航索引
   */
  const handleChangeNav = (val) => (activeNavIndex.value = val);

  return {
    activeNavIndex,
    handleChangeNav,
  };
}

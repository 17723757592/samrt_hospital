/*
 * 功能 : 封装数据交互api接口(mock.js请求)。
 * 用处 : 大屏数据接口
 */
import request from "@/utils/request.js";

export default {
    /**
     * 获取大屏数据
     */
    GetScreenData: (nav) => {
        return request({
            url: `/api/screen/data?nav=${nav}`,
            method: 'get'
        })
    },
    /**
     * 获取地图信息
     */
    GetMapData: () => {
        return request({
            url: `/api/map/data`,
            method: 'get'
        })
    },
};
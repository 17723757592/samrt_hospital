import Mock from "mockjs";
import { handleMock, handleResponse } from "./../mock-handle.js";
import guangxiCityJson from "./../../assets/json/guangxi-city.json";

const Random = Mock.Random;

const phonePrefixs = new Array("139", "138", "137", "136", "135", "134", "159", "158", "157", "150", "151", "152", "188", "187", "182", "183", "184", "178", "130", "131", "132", "156", "155", "186", "185", "176", "133", "153", "189", "180", "181", "177");

const systems = [
  "马子阳",
  "廖梅",
  "叶致远",
  "周子异",
  "梅艳",
  "夏嘉伦",
  "云志杰",
];

let msg = Mock.mock({
  // 10-20 个元素的数组
  'list|6': [{
    // 自增数，起始值为 1，每次增 1
    'sid|+1': 1,
    // 取数组当中的一个值
    "system|1": systems,
    // 随机email
    'email': '@email',
    'createdTime': Mock.mock('@now("yyyy-MM-dd hh:mm:ss")')
  }],
});

msg.list.forEach(e => {
  // 随机guid
  e.userId = Random.guid();
  // 随机身份证
  e.idCard = Random.id();
  // 随机人名
  e.realname = Random.cname();
  // 随机手机号
  e.mobile = phonePrefixs[Math.floor(Math.random() * phonePrefixs.length)] + Mock.mock(/\d{8}/);
});


// 
const getCoordinateData = () => {
  return guangxiCityJson.map(({ name, coordinate }) => ({
    name,
    value: coordinate,
  }));
};
let coordinateData = getCoordinateData();

// 
const getMapData = () => {
  return guangxiCityJson.map(({ name, coordinate }) => ({
    name,
    coordinate,
    visit: Random.integer(20, 100),
  }));
};
let mapData = getMapData();


// 获取事项消息
const getMsgData = () => {
  return msg.list.map(({ realname, mobile, system, createdTime }) => ({
    content: `[${realname}(${mobile})]患[${guangxiCityJson[Random.integer(0, guangxiCityJson.length - 1)].name}]--诊断医师：[${system}]`,
    createdTime,
  }));
};
let msgData = getMsgData();

export default [
  {
    url: "/api/map/data",
    method: "get",
    response: (config) =>
      handleMock(config, () => {
        let changeMapIndex = Random.integer(0, mapData.length - 1);
        mapData[changeMapIndex].visit += 1;

        const mobile = phonePrefixs[Math.floor(Math.random() * phonePrefixs.length)] + Mock.mock(/\d{8}/);
        const newMsg = {
          content: `[${Random.cname()}(${mobile})]患[${mapData[changeMapIndex].name}]--诊断医师：[${systems[Random.integer(0, systems.length - 1)]}]`,
          createdTime: Mock.mock('@now("yyyy-MM-dd hh:mm:ss")')
        };

        return handleResponse(200, "success", {
          coordinateData,
          mapData,
          msgData,
          newMsg,
          changeMapObj: mapData[changeMapIndex]
        });
      }),
  },
];

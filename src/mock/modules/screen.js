import Mock from "mockjs";
import { handleMock, handleResponse } from "./../mock-handle.js";
import guangxiCityJson from "./../../assets/json/guangxi-city.json";
// import getDoctorInformation from "../getDoctor.js"
const Random = Mock.Random;

let statisticsData = {
  serviceCompanines: Random.integer(9000, 20000), //手术台数
  serviceUsers: Random.integer(100000, 205000), //挂号数
  developApps: 55,
  monitorServers: Random.integer(5000, 10000),  //抢救人数
  money: 131,
};

let countData = {
  coverCities: 13,
  normalApps: 55,
  vipUsers: statisticsData.serviceUsers - Random.integer(10000, 20000),
}

let projectDescription = [
  {
    title: "良好环境",
    desciption:
      "本医院作为国内顶级智慧型医院具备良好的就医环境，交通便利，环境优美",
  },
  {
    title: "优质服务",
    desciption:
      "本院医护人员都经过高素质培训，专业技能过硬，服务态度优异",
  },
  {
    title: "投入研发",
    desciption:
      "本院致力推进医疗相关事业发展，相关医疗设备尽数为国内外先进水准设备",
  },
  {
    title: "人情关怀",
    desciption:
      "国家认定享受相关医疗优惠的，本院都将进行一定程度的帮扶，额外提供相关福利或优惠",
  },
];

let projectStatisticsData = [
  { value: Random.integer(100, 200), name: "外科" },
  { value: Random.integer(50, 100), name: "妇产科" },
  { value: Random.integer(20, 100), name: "肿瘤科" },
  { value: Random.integer(100, 300), name: "儿科" },
  { value: Random.integer(50, 150), name: "骨科" },
  { value: Random.integer(100, 200), name: "康复科" },
  { value: Random.integer(50, 200), name: "内科" },
  { value: Random.integer(80, 160), name: "其他" },
];
// 常用药排行
let medicineusedData = [
  { value: Random.integer(100, 200), name: "阿莫西林胶囊" },
  { value: Random.integer(50, 100), name: "庆大霉素片" },
  { value: Random.integer(20, 100), name: "头孢克洛胶囊" },
  { value: Random.integer(100, 300), name: "甲硝唑片" },
  { value: Random.integer(50, 150), name: "罗红霉素胶囊" },
  { value: Random.integer(100, 200), name: "四环素片" },
  { value: Random.integer(50, 200), name: "加替沙星片" },
  { value: Random.integer(60, 160), name: "利巴韦林颗粒" },
  { value: Random.integer(50, 370), name: "感冒灵颗粒" },
  { value: Random.integer(60, 160), name: "酮康唑软膏" },
  { value: Random.integer(20, 180), name: "罗痛定片" },
  { value: Random.integer(30, 190), name: "布比卡因" },
  { value: Random.integer(50, 160), name: "复方氨基酸" },
  { value: Random.integer(60, 200), name: "落贝林" },
];

let projects = [
  { name: "云志杰", status: -1, type: "web" },
  { name: "张秀英", status: 1, type: "web" },
  { name: "韩睿", status: 1, type: "web" },
  { name: "周子异", status: 1, type: "app" },
  { name: "萧览", status: 1, type: "web" },
  { name: "莫璐", status: 1, type: "app" },
  { name: "梅艳", status: -1, type: "web" },
  { name: "刘兰芳", status: 1, type: "web" },
  { name: "夏嘉伦", status: 1, type: "web" },
  { name: "叶致远", status: -1, type: "project" },
  { name: "廖梅", status: 1, type: "design" },
  { name: "马子阳", status: 1, type: "design" },
];

let projectType = [
  {
    num: Random.integer(50, 70),
    name: "(副)主任医师",
  },
  {
    num: Random.integer(5, 10),
    name: "(副)主任药师",
  },
  {
    num: Random.integer(100, 300),
    name: "(主治)医师",
  },
  {
    num: Random.integer(200, 400),
    name: "护士/师",
  },
  {
    num: Random.integer(50, 200),
    name: "其他",
  },
];

let companyType = [
  "23年12月",
  "1月",
  "2月",
  "3月",
  "4月",
];

const weekday = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
];

// 获取星期数据
const getWeekData = () => {
  let currentWeek = new Date().getDay() - 1;
  currentWeek = currentWeek < 0 ? 7 : currentWeek;
  return weekday.map((name, i) => {
    const obj = {
      // mobile: i <= currentWeek ? Random.integer(500, 2500) : 0,
      // pc: i <= currentWeek ? Random.integer(1000, 6000) : 0,
      hospitalization: i <= currentWeek ? Random.integer(500, 2500) : 0,
      outpatient_service: i <= currentWeek ? Random.integer(1000, 6000) : 0,
    };
    return {
      name,
      ...obj,
    };
  });
};
let weekData = getWeekData();
//获取前三用药历史情况
const getMedicineusedData = () =>{

  let medicine_rank = medicineusedData.sort(function(a,b){
    return a.value - b.value
  })
  let medicine_history = medicine_rank.reverse().slice(0,3)
  return companyType.map((item) => ({
    name:item,
    one:medicine_history[0].name,
    two:medicine_history[1].name,
    three:medicine_history[2].name,
    one_value: Random.integer(200, 800),
    two_value: Random.integer(180, 780),
    three_value: Random.integer(170, 770),
  }))
}
let medicinehistoryData = getMedicineusedData()
// 获取项目类别占比
const getProjectTypePercentData = () => {
  let total = 0;

  for (let i = 0; i < projectType.length; i++) {
    total += projectType[i].num;
  }

  return projectType.map(({ name, num}) => ({
    name,
    percent: ((num / total) * 100).toFixed(2),
    value:num
  }));
};
let projectTypePercentData = getProjectTypePercentData();

const getCityData = () => {
  return guangxiCityJson.map(({ name, coordinate }) => ({
    name,
    coordinate,
    companines: Random.integer(50, 200),
    users: Random.integer(1000, 4000),
    visit: Random.integer(20, 100),
  }));
};
let cityData = getCityData();

// 获取企业项目
const getCompanyProjectData = () => {
  return companyType.map((name) => {
    const web = Random.integer(10, 60);
    const cms = Random.integer(20, 30);
    const applets = Random.integer(15, 50);
    const design = Random.integer(15, 50);
    const all = web + cms + applets + design;

    return {
      name,
      web,
      cms,
      applets,
      design,
      all,
    };
  });
};
let companyProjectData = getCompanyProjectData();

// 
const getCompaninesData = () => {
  const average = statisticsData.serviceCompanines / projectStatisticsData.length;
  let arr = [];
  let last = statisticsData.serviceCompanines;
  for (let i = 0; i < projectStatisticsData.length-2; i++) {
    let num = Random.integer(
      Math.floor(average - 200),
      Math.floor(average + 200)
    );

    arr.push({
      name: projectStatisticsData[i].name,
      num: i < projectStatisticsData.length - 1 ? num : last,
    });

    last -= num;
  }
  return arr;
};
let companinesData = getCompaninesData();

//获取projects
const getProjectUseData = () => {
  // getDoctorInformation().then(res=>{
  //   console.log(res.data.slice(0,7));
  // })
  return projects.map((e) => ({
    ...e,
    users: Random.integer(
      Math.floor(statisticsData.serviceUsers / 2),
      Math.floor(statisticsData.serviceUsers)
    ),
    companines: Random.integer(
      Math.floor(statisticsData.serviceCompanines / 2),
      Math.floor(statisticsData.serviceCompanines)
    ),
  }));
};
let projectUseData = getProjectUseData();

// 获取热门项目
const getHotProjectData = () => {
  let data = projectUseData.sort(
    (a, b) => b.users + b.companines - (a.users + a.companines)
  );

  return data.slice(0, 8);
};
let hotProjectData = getHotProjectData();

// 
const getProjecttMonitorData = () => {
  return projectStatisticsData.map((e) => ({
    ...e,
    users: Random.integer(
      Math.floor(statisticsData.serviceUsers / 2),
      Math.floor(statisticsData.serviceUsers)
    ),
    companines: Random.integer(
      Math.floor(statisticsData.serviceCompanines / 2),
      Math.floor(statisticsData.serviceCompanines)
    ),
  }));
};
let projectMonitorData = getProjecttMonitorData();

export default [
  {
    url: "/api/screen/data",
    method: "get",
    response: (config) =>
      handleMock(config, () => {
        const { nav } = config.query;

        // 今日数据随机增加
          // const today = new Date().getDay() - 1
          let today = new Date().getDay() - 1;
          today = today < 0 ? 6 : today;
          const outpatient_service = [1, 2, 3][Random.integer(1, 2)];
          const hospitalization = [1, 2, 3][Random.integer(0, 2)];
          weekData[today].outpatient_service += outpatient_service
          weekData[today].hospitalization += hospitalization

        // 导航一
        if (nav == 0) {
          // 总数统计
          const serviceCompaninesChangeNum = [1, 2, 3][Random.integer(0, 2)];
          const serviceUsersChangeNum = Random.integer(50, 200);
          statisticsData.serviceCompanines += serviceCompaninesChangeNum;
          statisticsData.serviceUsers += serviceUsersChangeNum;
          // 今日数据随机增加
          // const today = new Date().getDay() - 1
          // let today = new Date().getDay() - 1;
          // today = today < 0 ? 6 : today;
          // const outpatient_service = [1, 2, 3][Random.integer(1, 2)];
          // const hospitalization = [1, 2, 3][Random.integer(0, 2)];
          // weekData[today].outpatient_service += outpatient_service
          // weekData[today].hospitalization += hospitalization

          // 各地市服务数据统计
          cityData[Random.integer(0, cityData.length - 1)].companines +=
            serviceCompaninesChangeNum;
          cityData[Random.integer(0, cityData.length - 1)].users +=
            serviceUsersChangeNum;

          return handleResponse(200, "success", {
            statisticsData,
            weekData,
            projectTypePercentData,
            cityData,
            companyProjectData,
            companinesData,
            projectStatisticsData,
          });
        }

        // 导航二
        else if (nav == 1) {
          // 收益统计
          statisticsData.money += Random.integer(1, 5);

          const maintanApps = (projects.filter(e => e.status === -1)).length;
          countData.normalApps = statisticsData.developApps - maintanApps;

          const vipUsersChangeNum = [1, 2, 3][Random.integer(0, 2)];
          countData.vipUsers += vipUsersChangeNum;

          return handleResponse(200, "success", {
            money: statisticsData.money,
            projectDescription,
            weekData,
            hotProjectData,
            projectUseData,
            projectMonitorData,
            companyProjectData,
            companinesData,
            cityData,
            countData,
            medicineusedData,
            medicinehistoryData
          });
        }
      }),
  },
];

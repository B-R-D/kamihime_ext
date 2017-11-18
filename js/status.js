"use_strict"

//声明道具数组和道具类
var cureInfo = []
var treasureInfo = [];
var ticketInfo = [];
class Item {
  constructor(name, pic, num) {
    this._name = name;
    this._pic = pic;
    this._num = num;
  }
  get name() {
    return this._name;
  }
  get pic() {
    return this._pic;
  }
  get num() {
    return this._num;
  }
}
//声明基本信息对象
var userName;
var basicInfo = {
  rank: "",
  exp: "",
  next_exp: "",
  character_num: "",
  weapon_num: "",
  max_weapon_num: "",
  summon_num: "",
  max_summon_num: "",
  accessory_num: "",
  max_accessory_num: ""
}
var pointsInfo = {
  ap: "",
  max_ap: "",
  bp: "",
  ap_recover_time: "",
  bp_recover_time: ""
}
var moneyInfo = {
  job_point: "",
  gem: "",
  stone: "",
  accessory_point: "",
  purgatory_job_point: "",
  summon_orb: ""
}
var questInfo = {
  has_new_raid_request: false,
  has_unverified: false,
  accessory_quest_remaining_challenge_count: 0
}

//更新基本信息
const updateBasicInfo = res => {
  let exp_width;
  let exp_height;
  userName = res.name;
  basicInfo.rank = res.rank;
  basicInfo.exp = res.exp;
  basicInfo.next_exp = res.next_exp;
  basicInfo.character_num = res.character_num;
  basicInfo.weapon_num = res.weapon_num;
  basicInfo.max_weapon_num = res.max_weapon_num;
  basicInfo.summon_num = res.summon_num;
  basicInfo.max_summon_num = res.max_summon_num;
  basicInfo.accessory_num = res.accessory_num;
  basicInfo.max_accessory_num = res.max_accessory_num;
  $("#userName").text(userName);
  $("#rank").text(basicInfo.rank);
  //动态修改经验条长度高度
  exp_width = `${Math.round(basicInfo.exp/(basicInfo.exp+basicInfo.next_exp)*100)}%`;
  exp_height = $("#exp").height() + 2;
  $("#exp").children("div").css({"width":exp_width, "height":exp_height});
  $("#exp").children("span").text(`${basicInfo.exp}/${basicInfo.exp+basicInfo.next_exp} (${Math.round(basicInfo.exp/(basicInfo.exp+basicInfo.next_exp)*10000)/100}%)`);
  $("#character_num").text(basicInfo.character_num);
  $("#weapon_num").text(`${basicInfo.weapon_num}/${basicInfo.max_weapon_num}`);
  $("#summon_num").text(`${basicInfo.summon_num}/${basicInfo.max_summon_num}`);
  $("#accessory_num").text(`${basicInfo.accessory_num}/${basicInfo.max_accessory_num}`);
}

//更新战斗点数信息
const updatePointsInfo = res => {
  pointsInfo.ap = res.ap;
  pointsInfo.max_ap = res.max_ap;
  pointsInfo.bp = res.bp;
  pointsInfo.ap_recover_time = res.ap_recover_time;
  pointsInfo.bp_recover_time = res.bp_recover_time;
  $("#ap").html(`${pointsInfo.ap}/${pointsInfo.max_ap}`);
  $("#bp").html(`${pointsInfo.bp}/5`);
  $("#ap_recover_time").text(pointsInfo.ap_recover_time);
  $("#bp_recover_time").text(pointsInfo.bp_recover_time);
}

//更新金钱类信息
const updateMoneyInfo = res => {
  moneyInfo.job_point = res.job_point;
  moneyInfo.gem = res.gem;
  moneyInfo.stone = res.stone;
  moneyInfo.accessory_point = res.accessory_point;
  moneyInfo.purgatory_job_point = res.purgatory_job_point;
  moneyInfo.summon_orb = res.summon_orb;
  $("#gem").text(`${moneyInfo.gem}`);
  $("#stone").text(`${moneyInfo.stone}`);
  $("#job_point").text(`${moneyInfo.job_point}`);
  $("#purgatory_job_point").text(`${moneyInfo.purgatory_job_point}`);
  $("#accessory_point").text(`${moneyInfo.accessory_point}`);
  $("#summon_orb").text(`${moneyInfo.summon_orb}`);
}

//更新任务类信息
const updateQuestInfo = res => {
  questInfo.has_new_raid_request = res.has_new_raid_request;
  questInfo.has_unverified = res.has_unverified;
  questInfo.accessory_quest_remaining_challenge_count = res.accessory_quest_remaining_challenge_count;
  $("#aksquest").children("span").text(questInfo.accessory_quest_remaining_challenge_count);
  updateRaidData();
  chrome.runtime.sendMessage({
      "has_new_raid_request": questInfo.has_new_raid_request,
      "has_unverified": questInfo.has_unverified
    }, function(response){});
}

//更新Boss战状态
const updateRaidData = () => {
  if(questInfo.has_unverified) {
    $("#bp").css("background-color","Gainsboro");
  } else if(questInfo.has_new_raid_request) {
    $("#bp").css("background-color","#FF5857");
  } else
    $("#bp").css("background-color","transparent");
}

//用于手动刷新当前RAID状态
const retrieveRaidInfo = () => {
  $("#bp").click(function(){
    $.ajax({
      url: "https://r.kamihimeproject.net/v1/a_quest_info",
	    type: 'GET',
	    success(response) {
        updateQuestInfo(response);
      },
  	  error(jqXHR, status, errorThrown) {
	  	  console.log(`An error occurred while retrieving RAID Boss data.`);
      }
    });
  });
}

//道具信息相关
//获取处理各类道具信息
const updateCureInfo = res => {
  let temp;
  $.getJSON("../data/item.json", function(item){
    //双重循环，送来的每个name分别与数据库中的name比对
    //若相等则建立新对象，若不相等则继续比对数据库中下一个name
    //如果比对数据库中的最后一个都不相等，则断定为新数据
    //继续外层循环下一个送来的name
    for(let i=0; i<res.data.length; ++i) {
      for(let j=0; j<item.cureItem.length; ++j) {
        if(item.cureItem[j].name === res.data[i].name) {
          temp = new Item(item.cureItem[j].name, item.cureItem[j].url, res.data[i].num);
          cureInfo.push(temp);
          break;
        }
        else {
          if(j === item.cureItem.length - 1) {
            temp = new Item(item.cureItem[j].name, "undefined", res.data[i].num);
            cureInfo.push(temp);
          }
          else
            continue;
        }
      }
    }
    $("tr.pic").html(function(m) {
      let temp;
      for(let i=0; i<cureInfo.length; ++i) {
        temp = temp +`<td><img src="${cureInfo[i].pic}" title="${cureInfo[i].name}"></td>`;
      }
      return temp;
    });
    $("tr.num").html(function(m) {
      let temp;
      for(let i=0; i<cureInfo.length; ++i) {
        temp = temp + `<td>${cureInfo[i].num}</td>`;
      }
      return temp;
    });
  });
}

//i18n本地化替换
const localizer = () => {
  let htmlStr = $("body").html().toString();
  let localeStr = htmlStr.replace(/__MSG_(\w+)__/g,function(message, str) {
    return chrome.i18n.getMessage(str);
  });
  $("body").html(localeStr);
}

//监听来自devtool的数据信息
const devtoolTransfer = () => {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.header) {
      case "BasicInfo":
        updateBasicInfo(message);
        break;
      case "PointsInfo":
        updatePointsInfo(message);
        break;
      case "MoneyInfo":
        updateMoneyInfo(message);
        break;
      case "QuestInfo":
        updateQuestInfo(message);
        break;
      case "CureInfo":
        updateCureInfo(message);
        break;
    }
  });
}

const main = () => {
  localizer();
  devtoolTransfer();
  retrieveRaidInfo();
}

$(document).ready(main);

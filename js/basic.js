"use_strict"

//声明API网址常量
const BasicInfo = "https://r.kamihimeproject.net/v1/a_players/me";
const PointsInfo = "https://r.kamihimeproject.net/v1/a_players/me/quest_points";
const MoneyInfo = "https://r.kamihimeproject.net/v1/a_players/me/currency";
const QuestInfo = "https://r.kamihimeproject.net/v1/a_quest_info";

//声明各分类对象
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

//更新页面函数
const updatePageDataBasic = () => {
  //重写网页CSS信息
  $("head").html(`
    <title>神姬助手-详情页</title>
    <style type="text/css" rel="stylesheet">
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      table {
        table-layout: fixed;
      }
      #rank {
        width: 110px;
      }
      #exp {
        width: 285px;
      }
      #ap, #bp {
        width: 155px;
      }
      .weapon {
        width: 160px;
      }
      .all_table {
        width: 610px;
      }
    </style>
  `);
  //重写网页body信息
  $("body").html(`
    <table class="all_table">
      <tr>
        <th>神姬助手</th>
      </tr>
    </table>
    <table class="all_table">
      <tr>
        <td>继承者：${userName}</td>
        <td id="rank">Rank：${basicInfo.rank}</td>
        <td id="exp">EXP：${basicInfo.exp}/${basicInfo.exp+basicInfo.next_exp} (${Math.round(basicInfo.exp/(basicInfo.exp+basicInfo.next_exp)*10000)/100}%)</td>
      </tr>
    </table>
    <br>
    <table class="all_table">
      <tr>
        <td id="ap">AP：${pointsInfo.ap}/${pointsInfo.max_ap}<br>${pointsInfo.ap_recover_time}</td>
        <td id="bp"><span>BP：${pointsInfo.bp}/5<br>${pointsInfo.bp_recover_time}</span></td>
        <td id="aksquest">今日饰品任务剩余${questInfo.accessory_quest_remaining_challenge_count}次</td>
      </tr>
    </table>
    <br>
    <table class="all_table">
      <tr>
        <td>金钱：</td><td>${moneyInfo.gem}</td>
        <td>魔宝石：</td><td>${moneyInfo.stone}</td>
      </tr>
      <tr>
        <td>英灵点：</td><td>${moneyInfo.job_point}</td>
        <td>炼狱英灵点：</td><td>${moneyInfo.purgatory_job_point}</td>
      </tr>
      <tr>
        <td>饰品币：</td><td>${moneyInfo.accessory_point}</td>
        <td>幻兽币：</td><td>${moneyInfo.summon_orb}</td>
      </tr>
    </table>
    <br>
    <table class="all_table">
      <tr>
        <td>神姬数：${basicInfo.character_num}</td>
        <td class="weapon">武器数：${basicInfo.weapon_num}/${basicInfo.max_weapon_num}</td>
        <td class="weapon">幻兽数：${basicInfo.summon_num}/${basicInfo.max_summon_num}</td>
        <td class="weapon">饰品数：${basicInfo.accessory_num}/${basicInfo.max_accessory_num}</td>
      </tr>
    </table>
  `);
}

const updatePageDataAdvanced = () => {
  //更新Boss战状态
  if(questInfo.has_new_raid_request) {
    $("#bp").css("color","red");
  }
}

//更新基本信息
const updateBasicInfo = res => {
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
}

//更新战斗点数信息
const updatePointsInfo = res => {
  pointsInfo.ap = res.quest_points.ap;
  pointsInfo.max_ap = res.quest_points.max_ap;
  pointsInfo.bp = res.quest_points.bp;
  pointsInfo.ap_recover_time = res.quest_points.ap_recover_time;
  pointsInfo.bp_recover_time = res.quest_points.bp_recover_time;
}

//更新金钱类信息
const updateMoneyInfo = res => {
  moneyInfo.job_point = res.job_point;
  moneyInfo.gem = res.gem;
  moneyInfo.stone = res.stone;
  moneyInfo.accessory_point = res.accessory_point;
  moneyInfo.purgatory_job_point = res.purgatory_job_point;
  moneyInfo.summon_orb = res.summon_orb;
}

//更新任务类信息
const updateQuestInfo = res => {
  questInfo.has_new_raid_request = res.has_new_raid_request;
  questInfo.has_unverified = res.has_unverified;
  questInfo.accessory_quest_remaining_challenge_count = res.accessory_quest_remaining_challenge_count;
  chrome.runtime.sendMessage({
      "has_new_raid_request": questInfo.has_new_raid_request,
      "has_unverified": questInfo.has_unverified
    }, function(response){});
}

//获取信息的AJAX函数，根据传入字符串来调用相应的更新函数
const retrieveInfo = type => {
  $.ajax({
    url: eval(type),
	  type: 'GET',
	  success(response) {
      eval(`update${type}(response)`);
      updatePageDataBasic();
      updatePageDataAdvanced();
	  },
	  error(jqXHR, status, errorThrown) {
		  console.log(`An error occurred when retrieve ${type} infomation.`);
	  }
  });
}

$("html").html(`
  <head>
    <title>神姬助手-详情页</title>
  </head>
  <body>
  </body>
`);
retrieveInfo("BasicInfo");
retrieveInfo("PointsInfo");
retrieveInfo("MoneyInfo");
retrieveInfo("QuestInfo");

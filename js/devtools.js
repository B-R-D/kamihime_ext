"use_strict"

//API网址常量
const BasicInfo = "https://r.kamihimeproject.net/v1/a_players/me";
const PointsInfo = "https://r.kamihimeproject.net/v1/a_players/me/quest_points";
const MoneyInfo = "https://r.kamihimeproject.net/v1/a_players/me/currency";
const QuestInfo = "https://r.kamihimeproject.net/v1/a_quest_info"; 
const CureInfo = "https://r.kamihimeproject.net/v1/a_items?json=%7B%22type%22%3A%22cure_evolution"

chrome.devtools.panels.create('Kamihime_ext', 'icon/16.png', '../html/status.html', function(panel){});

chrome.devtools.network.onRequestFinished.addListener(function(request) {
  //检查获取各种信息
  switch(request.request.url) {
    case BasicInfo:
      //获取应答包主体
      request.getContent(function(res) {
        let obj = JSON.parse(res);
        chrome.runtime.sendMessage({
          //识别头，基本信息对象体
          "header": "BasicInfo",
          "name": obj.name,
          "rank": obj.rank,
          "exp": obj.exp,
          "next_exp": obj.next_exp,
          "character_num": obj.character_num,
          "weapon_num": obj.weapon_num,
          "max_weapon_num": obj.max_weapon_num,
          "summon_num": obj.summon_num,
          "max_summon_num": obj.max_summon_num,
          "accessory_num": obj.accessory_num,
          "max_accessory_num": obj.max_accessory_num
        }, function(response){});
      });
      break;
    case PointsInfo:
      request.getContent(function(res) {
        let obj = JSON.parse(res);
        chrome.runtime.sendMessage({
          "header": "PointsInfo",
          "ap": obj.quest_points.ap,
          "max_ap": obj.quest_points.max_ap,
          "bp": obj.quest_points.bp,
          "ap_recover_time": obj.quest_points.ap_recover_time,
          "bp_recover_time": obj.quest_points.bp_recover_time
        }, function(response){});
      });
      break;
    case MoneyInfo:
      request.getContent(function(res) {
        let obj = JSON.parse(res);
        chrome.runtime.sendMessage({
          "header": "MoneyInfo",
          "job_point": obj.job_point,
          "gem": obj.gem,
          "stone": obj.stone,
          "accessory_point": obj.accessory_point,
          "purgatory_job_point": obj.purgatory_job_point,
          "summon_orb": obj.summon_orb
        }, function(response){});
      });
      break;
    case QuestInfo:
      request.getContent(function(res) {
        let obj = JSON.parse(res);
        chrome.runtime.sendMessage({
          "header": "QuestInfo",
          "has_new_raid_request": obj.has_new_raid_request,
          "has_unverified": obj.has_unverified,
          "accessory_quest_remaining_challenge_count": obj.accessory_quest_remaining_challenge_count
        }, function(response){});
      });
      break;
  }
  //检查获取道具信息
  if(request.request.url.includes(CureInfo)) {
    request.getContent(function(res) {
      let obj = JSON.parse(res);
      //组装发送对象的字符串形式头
      let temp = `{"header": "CureInfo","data": [`;
      for(let i=0; i<obj.data.length; ++i) {
        if(i === obj.data.length - 1)
          temp = temp + `{"name": "${obj.data[i].name}","num": "${obj.data[i].num}"}`;
        else
          temp = temp + `{"name": "${obj.data[i].name}","num": "${obj.data[i].num}"},`;
      }
      //组装字符串形式尾
      temp = temp + `]}`;
      let temp_obj = JSON.parse(temp);
      chrome.runtime.sendMessage(temp_obj, function(response){});
    });
  }
});

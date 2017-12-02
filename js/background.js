"use_strict";

const ItemInfo = "https://r.kamihimeproject.net/v1/a_items";

var questInfo = {
  "has_new_raid_request": false,
  "has_unverified": false
};

//根据不同种类的数据组装道具数据包并发送
const retrieveItemData = type => {
  $.ajax({
    url: `${ItemInfo}?json=%7B%22type%22%3A%22${type}%22%7D`,
    type: "GET",
    success(response) {
      //组装发送对象
      let temp = `{"header": "${type}","data": [`;
      for(let i=0; i<response.data.length; ++i) {
        if(i === response.data.length - 1)
          temp = temp + `{"name": "${response.data[i].name}","num": "${response.data[i].num}"}`;
        else
          temp = temp + `{"name": "${response.data[i].name}","num": "${response.data[i].num}"},`;
      }
      temp = temp + `]}`;
      let temp_obj = JSON.parse(temp);
      chrome.runtime.sendMessage(temp_obj, function(response){});
    },
    error(jqXHR, status, errorThrown) {
      console.log(`An error occurred while retrieving ${type} data.`);
      }
  });
}

//修改图标
const retrieveBoss = () => {
  if(questInfo.has_unverified) {
    chrome.browserAction.setIcon({path: "icons/16_grey.png"});
  } else if(questInfo.has_new_raid_request) {
    chrome.browserAction.setIcon({path: "icons/16_red.png"});
  } else {
    chrome.browserAction.setIcon({path: {"19": "icons/19.png"}});
  }
}

//监听前台对BOSS的请求
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  questInfo.has_new_raid_request = message.has_new_raid_request;
  questInfo.has_unverified = message.has_unverified;
  retrieveBoss();
});

//接收获取道具信息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if(message === "retrieveiteminfo") {
    retrieveItemData("cure_evolution");
    retrieveItemData("treasure");
    retrieveItemData("ticket");
  }
});

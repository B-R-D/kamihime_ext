"use_strict"

var questInfo = {
  "has_new_raid_request": false,
  "has_unverified": false
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

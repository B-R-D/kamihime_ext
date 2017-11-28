"use strict"

//按钮变色
const changeColor = ele => {
  $(`#${ele}`).on({
    "mouseover": function() {
      $(`#${ele}`).css({"background-color":"#82998E", "color":"#AFFFF4"});
    },
    "mouseout": function() {
      $(`#${ele}`).css({"background-color":"#333333", "color":"white"});
    }
  });
}

const main = () => {
  changeColor("gamestart");
  $("#gamestart").click(function(){
    window.open("http://www.dmm.co.jp/netgame/social/-/gadgets/=/app_id=242584/", "");
  });
  $("#gamestart").text(chrome.i18n.getMessage("gameStart"));

  changeColor("iteminfo");
  $("#iteminfo").click(function(){
    window.open("../html/item.html", "");
  });
  $("#iteminfo").text(chrome.i18n.getMessage("itemInfo"));
  
  changeColor("setting");
  $("#setting").text(chrome.i18n.getMessage("setting"));
}

$(document).ready(main);

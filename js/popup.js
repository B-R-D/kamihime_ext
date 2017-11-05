"use strict"

//按钮变色
const changeColor = ele => {
  $(`#${ele}`).on({
    "mouseover": function() {
      $(`#${ele}`).css({"background-color":"#82998E", "border-style":"inset", "border-color":"#82998E", "color":"#AFFFF4"});
    },
    "mouseout": function() {
      $(`#${ele}`).css({"background-color":"#C2FFAC", "border-style":"outset", "border-color":"#7CFF73", "color":"#2A2963"});
    }
  });
}

const main = () => {
  
  changeColor("gamestart");
  $("#gamestart").click(function(){
    window.open("http://www.dmm.co.jp/netgame/social/-/gadgets/=/app_id=242584/", "");
  });

  changeColor("helperstart");
  $("#helperstart").click(function(){
    window.open("https://r.kamihimeproject.net", "");
  });
  
  changeColor("setting");
}

$(document).ready(main);

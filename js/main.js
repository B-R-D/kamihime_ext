"use_strict";

var stopCode;
const getGameSrc = () => {
  if($("#game_frame").attr("src")) {
    window.open($("#game_frame").attr("src"), "_top", "width=960,height=640,scrollbars=no");
    clearInterval(stopCode);
  }
}
const main = () => {
  stopCode = setInterval("getGameSrc()", 200);
}

$(document).ready(main);

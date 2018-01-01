"use_strict";

var stopCode;
var count = 0;
const getGameSrc = () => {
  if($("#game_frame").attr("src")) {
    window.open($("#game_frame").attr("src"), "_top", "width=960,height=640,scrollbars=no");
    clearInterval(stopCode);
  }
  ++count;
  if(count >= 300) {
    console.log("Time out.")
    alert("Time out.");
    clearInterval(stopCode);
  }
}
const main = () => {
  stopCode = setInterval("getGameSrc()", 200);
}

$(document).ready(main);

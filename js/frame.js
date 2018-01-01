"use_strict";

var stopCode;
var count = 0;
const getHtml = () => {
  if($("#game").attr("game-src")) {
    $("body").html($(".test-screen").html());
    clearInterval(stopCode);
  }
  ++count;
  if(count >= 300) {
    console.log("超时");
    alert("超时");
    clearInterval(stopCode);
  }
}
const main = () => {
  stopCode = setInterval("getHtml()", 200);
  $("#game-outer, #game, body").css("overflow", "hidden");
}

$(document).ready(main);

"use_strict";

var stopCode;
const getHtml = () => {
  if($("#game").attr("game-src")) {
    $("body").html($(".test-screen").html());
    clearInterval(stopCode);
  }
}
const main = () => {
  stopCode = setInterval("getHtml()", 200);
  $("#game-outer, #game, body").css("overflow", "hidden");
}

$(document).ready(main);

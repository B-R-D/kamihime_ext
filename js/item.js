"use_strict"

//声明道具数组和道具类
var itemInfo = {
  "cureItem": [],
  "treasureItem": [],
  "ticketItem": []
};
class Item {
  constructor(name, pic, num) {
    this._name = name;
    this._pic = pic;
    this._num = num;
  }
  get name() {
    return this._name;
  }
  get pic() {
    return this._pic;
  }
  get num() {
    return this._num;
  }
}

//更新道具信息
const updateItemInfo = () => {
  $("#cureItem").find("tr.pic").html(function() {
    let temp = "";
    for(let i=0; i<itemInfo.cureItem.length; ++i) {
      temp = temp +`<td><img src="${itemInfo.cureItem[i].pic}" title="${itemInfo.cureItem[i].name}"></td>`;
    }
    return temp;
  });
  $("#cureItem").find("tr.num").html(function() {
    let temp = "";
    for(let i=0; i<itemInfo.cureItem.length; ++i) {
      temp = temp + `<td>${itemInfo.cureItem[i].num}</td>`;
    }
    return temp;
  });


  //更新属性升等道具图片和数量
  for(let i=0, j=0; i<itemInfo.treasureItem.length; ++i) {
    if(i % 8 === 0 && i < 49) {
      ++j;
      $("#treasureItem").find(`#pic_${j}`).empty();
    }
    $("#treasureItem").find(`#pic_${j}`).html(function() {
      return $("#treasureItem").find(`#pic_${j}`).html() + `<td><img src="${itemInfo.treasureItem[i].pic}" title="${itemInfo.treasureItem[i].name}"></td>`;
    });
  }
  for(let i=0, j=0; i<itemInfo.treasureItem.length; ++i) {
    if(i % 8 === 0 && i < 49) {
      ++j;
      $("#treasureItem").find(`#num_${j}`).empty();
    }
    $("#treasureItem").find(`#num_${j}`).html(function() {
      return $("#treasureItem").find(`#num_${j}`).html() + `<td>${itemInfo.treasureItem[i].num}</td>`;
    });
  }

  $("#ticketItem").find("tr.pic").html(function() {
    let temp;
    for(let i=0; i<itemInfo.ticketItem.length; ++i) {
      temp = temp +`<td><img src="${itemInfo.ticketItem[i].pic}" title="${itemInfo.ticketItem[i].name}"></td>`;
    }
    return temp;
  });
  $("#ticketItem").find("tr.num").html(function() {
    let temp;
    for(let i=0; i<itemInfo.ticketItem.length; ++i) {
      temp = temp + `<td>${itemInfo.ticketItem[i].num}</td>`;
    }
    return temp;
  });
}

//获取处理各类道具信息
const updateItemData = res => {
  $.getJSON("../data/item.json", function(item) {
    let temp;
    //双重循环，送来的每个name分别与数据库中的name比对
    //若相等则建立新对象，若不相等则继续比对数据库中下一个name
    //如果比对数据库中的最后一个都不相等，则断定为新数据
    //继续外层循环下一个送来的name
    if(res.header === "cure_evolution") {
      for(let i=0; i<res.data.length; ++i) {
        for(let j=0; j<item.cureItem.length; ++j) {
          if(item.cureItem[j].name === res.data[i].name) {
            temp = new Item(item.cureItem[j].name, item.cureItem[j].url, res.data[i].num);
            itemInfo.cureItem[i] = temp;
            break;
          }
          else {
            if(j === item.cureItem.length - 1) {
              temp = new Item(res.data[i].name, "", res.data[i].num);
              itemInfo.cureItem[i] = temp;
            }
            else
              continue;
          }
        }
      }
    } else if(res.header === "treasure") {
      for(let i=0; i<res.data.length; ++i) {
        for(let j=0; j<item.treasureItem.length; ++j) {
          if(item.treasureItem[j].name === res.data[i].name) {
            temp = new Item(item.treasureItem[j].name, item.treasureItem[j].url, res.data[i].num);
            itemInfo.treasureItem[i] = temp;
            break;
          }
          else {
            if(j === item.treasureItem.length - 1) {
              temp = new Item(res.data[i].name, "", res.data[i].num);
              itemInfo.treasureItem[i] = temp;
            }
            else
              continue;
          }
        }
      }
    } else if(res.header === "ticket") {
      for(let i=0; i<res.data.length; ++i) {
        for(let j=0; j<item.ticketItem.length; ++j) {
          if(item.ticketItem[j].name === res.data[i].name) {
            temp = new Item(item.ticketItem[j].name, item.ticketItem[j].url, res.data[i].num);
            itemInfo.ticketItem[i] = temp;
            break;
          }
          else {
            if(j === item.ticketItem.length - 1) {
              temp = new Item(res.data[i].name, "", res.data[i].num);
              itemInfo.ticketItem[i] = temp;
            }
            else
              continue;
          }
        }
      }
    }
    updateItemInfo();
  });
}

//页面元素事件特效等
const pageClickEvent = () => {
  $("#cure").click(function() {
    $("#treasureItem, #ticketItem").hide();
    $("#cure").css("background-color", "#333333");
    $("#treasure, #ticket").css("background-color", "#666666");
    $("#cureItem").fadeIn(250);
  });
  $("#treasure").click(function() {
    $("#cureItem, #ticketItem").hide();
    $("#treasure").css("background-color", "#333333");
    $("#cure, #ticket").css("background-color", "#666666");
    $("#treasureItem").fadeIn(250);
  });
  $("#ticket").click(function() {
    $("#treasureItem, #cureItem").hide();
    $("#ticket").css("background-color", "#333333");
    $("#treasure, #cure").css("background-color", "#666666");
    $("#ticketItem").fadeIn(250);
  });
}

//i18n本地化替换
const localizer = () => {
  let htmlStr = $("body").html().toString();
  let localeStr = htmlStr.replace(/__MSG_(\w+)__/g,function(message, str) {
    return chrome.i18n.getMessage(str);
  });
  $("body").html(localeStr);
}

const main = () => {
  localizer();
  //直接获取道具，应该改成点击后获取
  chrome.runtime.sendMessage("retrieveiteminfo", function(response){});
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.header) {
      case "cure_evolution":
      case "treasure":
      case "ticket":
        updateItemData(message);
        break;
    }
  });
  //页面特效部分
  $("#cureItem, #treasureItem, #ticketItem").hide();
  pageClickEvent();
}

$(document).ready(main);

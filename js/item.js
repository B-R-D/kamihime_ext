"use_strict"

//import itemData from "./data.js";

const CureInfo = "https://r.kamihimeproject.net/v1/a_items?json=%7B%22type%22%3A%22cure_evolution%22%7D";
const TreasureInfo = "https://r.kamihimeproject.net/v1/a_items?json=%7B%22type%22%3A%22treasure%22%7D";
const TicketInfo = "https://r.kamihimeproject.net/v1/a_items?json=%7B%22type%22%3A%22ticket%22%2C%22zero_omit%22%3Afalse%7D";

const cureInfo = [];
const treasureInfo = [];
const ticketInfo = [];

//可以采用类来初始化每一个道具对象
class Item {
  constructor(name, num) {
    this._name = name;
    this._num = num;
  }
  set pic(url) {
    this._pic = url;
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

const updatePageData = () => {
  //重写head，CSS样式
  $("head").html(`
    <title>神姬助手-道具详情</title>
    <style type="text/css" rel="stylesheet">
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      table {
      }
    </style>
  `);
  //重写body代码
  $("body").html(`
    <table border="1">
      <tr>
        <th>回复道具</th>
      </tr>
      <tr></tr>
      <tr></tr>
      <tr></tr>
    </table>
  `);
  //动态修改表格内容
  $("th:eq(0)").attr("colspan", cureInfo.length);
  $("tr").html(function(m) {
    let temp;
    switch(m) {
      case 1:
        for(let i=0; i<cureInfo.length; ++i) {
          temp = temp + `<td>${cureInfo[i].name}</td>`;
        }
        return temp;
      case 2:
        for(let i=0; i<cureInfo.length; ++i) {
          temp = temp +`<td>${cureInfo[i].pic}</td>`;
        }
        return temp;
      case 3:
        for(let i=0; i<cureInfo.length; ++i) {
          temp = temp + `<td>${cureInfo[i].num}</td>`;
        }
        return temp;
    }
  });
}

//更新回复道具信息
const updateCureInfo = res => {
  let max_record_count = res.max_record_count;
  for(let i=0; i<max_record_count; ++i) {
    cureInfo[i] = new Item(res.data[i].name, res.data[i].num);
    //从item.js导入图片网址信息
    //cureInfo[i].pic = itemData(cureInfo[i].name);
  }
}

const updateTreasureInfo = res => {}
const updateTicketInfo = res => {}

//获取信息
const retrieveInfo = type => {
  $.ajax({
    url: eval(type),
	  type: 'GET',
	  success(response) {
      eval(`update${type}(response)`);
      updatePageData();
	  },
	  error(jqXHR, status, errorThrown) {
		  console.log(`An error occurred while retrieving ${type}.`);
	  }
  });
}

$("html").html(`
  <head>
    <title>神姬助手-道具详情</title>
  </head>
  <body>
  </body>
`);
retrieveInfo("CureInfo");
retrieveInfo("TreasureInfo");
retrieveInfo("TicketInfo");

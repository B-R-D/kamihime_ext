//本文件存放道具图片数据，后续开发可能会存放武器和神姬图片数据

//道具图片网址数据，通过道具名比对
export const itemData = name => {
  switch(name) {
    case "エリクサー":
      return "https://static-r.kamihimeproject.net/resources/pc/normal/42/72/2c93eebb4a79e124b1d2417aebcfe728aa88bb67f2034272.jpg";
    case "ハーフエリクサー":
      return "https://static-r.kamihimeproject.net/resources/pc/normal/a1/ce/2c93eebb4a79e124b1d2417aebcfe728c61247bb95bba1ce.jpg";
    case "エナジーリーフ":
      return "https://static-r.kamihimeproject.net/resources/pc/normal/a9/b6/2c93eebb4a79e124b1d2417aebcfe7283b1ed4e7b7c6a9b6.jpg";
    case "エナジーシード":
      return "https://static-r.kamihimeproject.net/resources/pc/normal/83/43/2c93eebb4a79e124b1d2417aebcfe728a869d53909698343.jpg";
    default:
      return "undefined";
  }
}

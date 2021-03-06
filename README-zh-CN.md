[[简体中文]](https://github.com/Sunsetra/kamihime_ext/blob/master/README-zh-CN.md) | [[English]](https://github.com/Sunsetra/kamihime_ext/blob/master/README.md)

# 神姬助手
这是用于DMM网页游戏神姬计划(神姫PROJECT)的游戏辅助工具。

## 功能概述
本工具是基于JavaScript开发的Chrome浏览器扩展，除手动更新Raid战信息之外，均通过监听浏览器游戏页面与服务器的通信来实现游戏数据更新。
### 个人信息显示
即时显示当前等级，经验值，AP/BP，装备和金钱持有数等信息，数据与游戏画面同步更新。
### Raid战信息
随游戏页面切换，可以通过扩展图标变化和游戏监控页面高亮提示是否出现Raid战斗，也可以**手动刷新Raid战斗信息**。

**注意：手动刷新功能是通过主动拉取服务器数据实现的，若刷新频率过高，服务器可能会针对该账号采取措施，甚至有可能会予以封号！！若不信任该功能请不要使用！！使用后可能造成的后果请自负！！**

## 安装和使用

### 运行环境
安装前请将Chrome浏览器升级至最新版本。由于使用了一些devtool的API，因此不保证在其他浏览器（Firefox，Edge等）上能正常运行。
### 安装方法
#### Windows
下载并解压[这里](https://github.com/Sunsetra/kamihime_ext/releases)的压缩包，然后点击Chrome扩展程序页面左上角“加载已解压的扩展程序...”，并定位到存放本程序的文件夹即可。
#### Linux
在终端中运行
```shell
git clone https://github.com/Sunsetra/kamihime_ext.git
```
然后点击Chrome扩展程序页面左上角“加载已解压的扩展程序...”，并定位到存放本程序的文件夹即可。
### 运行方法
请点击“开始游戏”或自行打开神姬游戏页面，然后按F12键打开控制台并切换到Kamihime_ext标签页即可。若在游戏进行过程中开启本工具，请先回到游戏主界面1-2次以更新游戏数据。
### 刷新RAID战
点击BP点显示区域可以向服务器拉取Raid战信息（游戏页面无需激活），会在BP显示区域以高亮显示（BP点数不会更新）。红色表示当前有可加入的Raid战斗，灰色表示有尚未确认的Raid战斗。Chrome右上角的扩展图标也会同步变化。

**注意：该功能并不是绝对安全！请不要过于频繁地刷新以防服务器采取针对措施！！**

## 其他
本工具尚在开发中，暂时没有登录Chrome网上应用商店的计划。若对本工具有任何疑问或建议，欢迎通过[邮件](mailto:xingxuanma@gmail.com)或issue联系作者。

也欢迎通过pull request贡献或改善多语种的翻译。

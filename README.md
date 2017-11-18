[[简体中文]](https://github.com/B-R-D/kamihime_ext/blob/master/README-zh-CN.md) | [[English]](https://github.com/B-R-D/kamihime_ext/blob/master/README.md)

# Kamihime Assistant
KA is an assistant tool for browser game Kamihime Project.

## Overview
KA is a Chrome extension, based on JavaScript.
All modules, except updating Raid BOSS status, retrieve game data by monitoring the communication between browser and game server.
### Player Information Monitor
Players' rank, EXP, AP/BP, Equipment and Gem are well displayed. All data will be updated synchronously while playing.
### Raid Information
When players switch game page, KA can inform players whether Raid battles are available, through changing extension icon and highlighting in extension page. Also, players can retrieve battle status immediately by clicking the highlighted area.

**WARNING: The implementation of manually refreshing Raid information is through retrieving data INITIATIVELY, which may cause the disability of your account or IP by the server. DO NOT USE IT IF YOU DO NOT TRUST IT!**

## Installing and Usage

### Running Environment
Please keep your browser up-to-date before installing. Some APIs are only available in Chrome devtool, which means the performance on other platforms (such as Firefox, Edge and etc.) are not ensured.
#### Windows
Download and unpack [this](https://github.com/B-R-D/kamihime_ext/releases) ZIP archive. Then click the button "Load unpacked extension..." on left-top of the Extensions page and locate the folder that contains KA.
#### Linux
Running the code below in terminal
```shell
git clone https://github.com/B-R-D/kamihime_ext.git
```
Then click the button "Load unpacked extension..." on left-top of the Extensions page and locate the folder that contains KA.
### Running
Please click "Game Start" or open Kamihime game page, press "F12" to open devtool and switch to Kamihime_ext tab. If AS opens during the game, please click "My Page" in the left-top corner twice to refresh game data.
### Refresh Raid Status
Player can refresh Raid status manually by clicking BP area in AS panel (no need to focus on game page), and BP area will be highlighted if Raid battle is available (BP point won't be updated). RED indicates there are Raid battles that players can take part in, while GREY shows there are unconfirmed Raid battles. The extension icon in the right-top corner will change synchronously.

**WARNING: This module is NOT absolutely safe! Do not refresh too frequently in case of account banning!!**

## Others
Kamihime Assistant is under development, and has no plan to upload to Chrome Web Store. Everyone who has questions and advice, please [email](mailto:xingxuanma@gmail.com) me or create an issue.

Anyone who can make improvement or contribution on localization is welcome to make pull request.

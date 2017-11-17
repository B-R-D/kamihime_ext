[[简体中文]](https://github.com/B-R-D/kamihime_ext/blob/master/README-zh-CN.md) | [[English]](https://github.com/B-R-D/kamihime_ext/blob/master/README.md)

# Kamihime Assistant
KA is an assistant tool for page game Kamihime Project.

## Overview
KA is a Chrome extension, based on JavaScript.
All modules, except updating Raid BOSS status, retrieve game data by monitoring the communication between browser and game server.
### Player Information Monitor
Player's rank, EXP, AP/BP, Equipment and Gem are well displayed. All data will be updated synchronously with playing.
### Raid Information
When player switches game page, KA can inform player whether Raid battle available by changing extension icon and highlighting in extension page. Also, player can retrieve battle infomation immediately by clicking highlighted area.

**WARNING: The implementation of refreshing Raid information manually is by retrieving data INITIATIVELY, what may cause your account or IP banned by server. DO NOT USE IT IF YOU DO NOT TRUST IT!**

## Installing and Usage

### Running Environment
Please keep your browser newest before installing. Because of some APIs which only available in Chrome devtool, the performance on other platform(such as Firefox, Edge, etc.) is not ensured.
#### Windows
Download and unpack [this](https://github.com/B-R-D/kamihime_ext/releases) ZIP archive. Then click the button "Load unpacked extension..." in left-top of Extensions page and locate the folder that contains KA.
#### Linux
Running the code below in terminal
```shell
git clone https://github.com/B-R-D/kamihime_ext.git
```
Then click the button "Load unpacked extension..." in left-top of Extensions page and locate the folder that contains KA.
### Running
Please click "Game Start" or open Kamihime game page, press "F12" to open devtool and switch to Kamihime_ext tab. If AS opened during the game, please click "My Page" in left-top corner twice to refresh game data.
### Refresh Raid Status
Player can refresh Raid status manually by clicking BP area in AS panel (no need to focus on game page), and BP area will be highlighted if Raid battle is available (BP point won't be updated). RED indicates there are Raid battles that player can take part in, while GREY shows there are unconfirmed Raid battles. The extension icon in the right-top corner will change synchronously.

**WARNING: This module is NOT absolutely safe! Do not refresh too frequently in case of account banning!!**

## Others
Kamihime Assistant is under developing, and have no plan to upload to Chrome Web Store. Everyone who have questions and advice, please [email](mailto:xingxuanma@gmail.com) me or create issue.

If anyone can make improvement or contribution on localization, welcome to make pull request.

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuCaption = menuCaption;
const settings_json_1 = require("../../settings.json");
function menuCaption(userName) {
    return `╭─═════༻-༺════─╮
[ ✧ ]  Me: ${settings_json_1.BOT_NAME}
[ ✧ ]  Prefix: ﹙${settings_json_1.PREFIX} )
[ ✧ ]  Status: Online
[ ✧ ]  Usuário: ${userName}
╰─═════༻-༺═══──╯`;
}

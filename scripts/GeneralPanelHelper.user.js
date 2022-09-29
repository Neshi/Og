// ==UserScript==
// @name         General Panel Helper
// @namespace    https://comastuff.com/
// @version      0.1
// @description  Skrypt ten pozwala na szybki dostęp do kont graczy w innych panelach. W połączeniu ze skryptem https://art.comastuff.com/ogame/lobby_helper.user.js działa jak bajeczka.
// @author       Neshi
// @updateURL    https://github.com/Neshi/Og/raw/main/scripts/GeneralPanelHelper.user.js
// @downloadURL  https://github.com/Neshi/Og/raw/main/scripts/GeneralPanelHelper.user.js
// @match        https://*.ogame.gameforge.com/game/admin2/bglUserAccounts.php?uid=*
// @icon         https://support.gameforge.com/template/games/ogame/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $('.contbox .textbox table:first tr').each(function() {
        var uniNumber = $(this).find('td:nth-child(2)').text();
        if (uniNumber != undefined && uniNumber.length>0){
            var userId = $(this).find('td:nth-child(3)').text();
            var country = $(this).find('td:nth-child(1)').text();
            var urlAddress = 'https://s'+uniNumber+'-'+country+'.ogame.gameforge.com/game/admin2/kontrolle.php?uid='+userId
            $(this).find('td:nth-child(3)').html('<a style=\"text-decoration:underline;cursor:pointer;\" href=\"'+urlAddress+'\" target=\"_blank\">'+userId+'</a>')
        }
    });
})();
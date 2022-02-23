// ==UserScript==
// @name         Fleet page helper
// @namespace    https://comastuff.com/
// @version      1.1
// @description  Skrypt ten pozwala na szybsze kopiowanie tabeli z logami flot.
// @author       Neshi
// @match        https://*.ogame.gameforge.com/game/admin2/flottenlog.php?uid=*
// @exclude      https://*.ogame.gameforge.com/game/admin2/flottenlog.php?uid=*&touser=*
// @icon         https://support.gameforge.com/template/games/ogame/favicon.ico
// @updateURL    https://github.com/Neshi/Og/raw/main/scripts/FleetPageHelper.user.js
// @downloadURL  https://github.com/Neshi/Og/raw/main/scripts/FleetPageHelper.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = "function fallbackCopyTextToClipboard(text){var textArea=document.createElement('textarea');textArea.value=text;textArea.style.top='0';textArea.style.left='0';textArea.style.position='fixed';document.body.appendChild(textArea);textArea.focus();textArea.select();try{var successful=document.execCommand('copy');var msg=successful?'successful':'unsuccessful';console.log('Fallback: Copying text command was '+msg)}catch(err){console.error('Fallback: Oops, unable to copy',err)}document.body.removeChild(textArea)}function copyTextToClipboard(text){if(!navigator.clipboard){fallbackCopyTextToClipboard(text);return}navigator.clipboard.writeText(text).then(function(){console.log('Async: Copying to clipboard was successful!')},function(err){console.error('Async: Could not copy text: ',err)})}";
    $("head").append(s);

    $('table:has(tr)').before('<button class="copyTable" type="button" style="float:right;margin-bottom:5px;" >Kopiuj tabele!</button>')

    $('body').append('<script type="text/javascript"> $(\'button.copyTable\').click(function() { copyTextToClipboard($(\'button.copyTable\').next().html().replaceAll(\'flottenlog.php\',window.location.origin+window.location.pathname)); });</script>');

})();
// ==UserScript==
// @name         SGO+ Item log button
// @namespace    https://comastuff.com/
// @version      0.2
// @description  Skrypt ten dodaje przycisk do wykorzystanych przedmiotów na profilu gracza
// @author       Neshi
// @match        https://*.ogame.gameforge.com/game/admin2/*
// @icon         https://support.gameforge.com/template/games/ogame/favicon.ico
// @updateURL    https://github.com/Neshi/Og/raw/main/scripts/SGOItemLogButton.user.js
// @downloadURL   
// @grant        none
// ==/UserScript==

(function () {
    if (window.location.search.indexOf('uid=')>0){
        var clonedButton = $('img[alt="Dodaj przedmiot"]').parent().clone();
        clonedButton.attr('href',clonedButton.attr('href').replace('itemGive.php','itemlog.php'));
        clonedButton.find('img').attr('alt','Wykorzystane przedmioty');
        clonedButton.find('img').attr('src','https://gf2.geo.gfsrv.net/cdn15/8d2be0b35e00e50739350d85caf46b.gif');
        clonedButton.attr('onmouseover','javascript:tiptool(\'Wykorzystane przedmioty\');');
        $('img[alt="Dodaj przedmiot"]').parent().after(clonedButton);
    }
})();
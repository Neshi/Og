// ==UserScript==
// @name         Sumator
// @namespace    https://comastuff.com/
// @version      0.3
// @description  Skrypt ten pozwala na szybsze liczenie surowców podczas wyliczania darowizn. Ustawia także domyślne parametry toola.
// @author       Neshi
// @updateURL    https://github.com/Neshi/Og/raw/main/scripts/Sumator.user.js
// @downloadURL  https://github.com/Neshi/Og/raw/main/scripts/Sumator.user.js
// @match        https://art.comastuff.com/ogame/resources.php
// @icon         https://support.gameforge.com/template/games/ogame/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $('select[name="lng"]').val('pl');
    $('input[name="beauty"]').attr('checked',true);
    $('input[name="attacks"]').attr('checked',false);
    $('input[name="harvests"]').attr('checked',false)

    $('body').append('<script type\'text/javascript\'>function getPreviousMonday()    {        var date = new Date();        var day = date.getDay();        var prevMonday = new Date();        if(date.getDay() == 0){            prevMonday.setDate(date.getDate() - 7);        }        else{            prevMonday.setDate(date.getDate() - (day-1));        }        return prevMonday;    }    function nextDay(x){        var now = new Date();        now.setDate(now.getDate() + (x+(7-now.getDay())) % 7);        return now;}</script>');

    $('form').append('<button type=\'button\' onClick=\'CalculateSum()\'>Sumuj</button> <script type="text/javascript">function CalculateSum(){var sum = 0;$(\'#results td\').each(function(){ var number = parseInt($(this).text().replaceAll(\' \',\'\')); if(number>0) { sum+=number;}}); const monday = getPreviousMonday();const sunday = nextDay(7);const title = \'Darowizny \'+("0" + monday.getDate()).slice(-2)+\'.\'+("0"+(monday.getMonth()+1)).slice(-2)+\'-\'+("0" + sunday.getDate()).slice(-2)+\'.\'+("0"+(sunday.getMonth()+1)).slice(-2)+\'.\'+sunday.getFullYear()+\' - \'; $(\'#results\').prepend("<p style=\'font-weight:bold;font-size:16px;color:red;\'>"+sum+" - "+title+sum.toLocaleString(\'nl\')+"</p>"); $(\'details summary\').after(title+sum.toLocaleString(\'nl\')+\'<br/>===================================================<br/>\'); $(\'details\').append(\'===================================================\'); console.log(\'sum\',sum.toLocaleString(\'nl\')); return false;}</script>')

})();


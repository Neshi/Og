// ==UserScript==
// @name         Sumator
// @namespace    https://comastuff.com/
// @version      0.1
// @description  Skrypt ten pozwala na szybsze liczenie surowców podczas wyliczania darowizn. Ustawia także domyślne parametry toola.
// @author       Neshi
// @match        https://art.comastuff.com/ogame/resources.php
// @icon         https://www.google.com/s2/favicons?domain=comastuff.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('select[name="lng"]').val('pl');
    $('input[name="beauty"]').attr('checked',true);
    $('input[name="attacks"]').attr('checked',false);
    $('input[name="harvests"]').attr('checked',false)


    $('form').append('<button type=\'button\' onClick=\'CalculateSum()\'>Sumuj</button> <script type="text/javascript">function CalculateSum(){var sum = 0;$(\'#results td\').each(function(){ var number = parseInt($(this).text().replaceAll(\' \',\'\')); if(number>0) { sum+=number;}}); $(\'#results\').prepend("<p style=\'font-weight:bold;font-size:16px;color:red;\'>"+sum+" - "+sum.toLocaleString(\'nl\')+"</p>"); console.log(\'sum\',sum.toLocaleString(\'nl\')); return false;}</script>')


})();

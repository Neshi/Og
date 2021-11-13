// ==UserScript==
// @name         AT Messaging helper
// @namespace    https://comastuff.com/
// @version      0.2
// @description  Skrypt ten pomaga wybrać odpowiedni szablon wiadomości, automatycznie uzupełnia stopkę oraz zaznacza checkbox aby umieścić wysyłaną wiadomość jako notatkę.
// @author       Neshi
// @match        https://*.ogame.gameforge.com/game/admin2/sendmsg.php?uid=*
// @icon         https://www.google.com/s2/favicons?domain=gameforge.com
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @updateURL    https://github.com/Neshi/Og/raw/main/scripts/ATMessagingHelper.user.js
// @downloadURL  https://github.com/Neshi/Og/raw/main/scripts/ATMessagingHelper.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function sortSelect(selElem) {
        var tmpAry = new Array();
        for (var i=0;i<selElem.options.length;i++) {
            tmpAry[i] = new Array();
            tmpAry[i][0] = selElem.options[i].text;
            tmpAry[i][1] = selElem.options[i].value;
        }
        tmpAry.sort();
        while (selElem.options.length > 0) {
            selElem.options[0] = null;
        }
        for (var i=0;i<tmpAry.length;i++) {
            var op = new Option(tmpAry[i][0], tmpAry[i][1]);
            selElem.options[i] = op;
        }
        return;
    }

    let titleRegex = /^(.*)\) (.*)/

    let title = $(document).find("title").text();

    let match  = title.match(titleRegex);

    const operator = match[2];

       $.getJSON('https://raw.githubusercontent.com/Neshi/Og/main/data/messages.json', function (data){
         
        $('form tr:eq(4) td:eq(0)').css('width','30%');
        $('form tr:eq(4) td:eq(0)').append('<select id=\'templatePicker\'></select>');
        
        let templatePicker = $('#templatePicker');
        templatePicker.append($('<option disabled selected>--Wybierz szablon--</option>'));
        for(var i=0;i<data.messages.length;i++){
            templatePicker.append($('<option value=\''+data.messages[i].content+'\' text=\''+data.messages[i].title+'\'>'+data.messages[i].title+'</option>'));
        }
        
        templatePicker.on('change',function(){
            var selected = templatePicker.find('option:selected');
            var message = selected.val().replace('[Operator]',operator);
            
            $('form textarea').val(message);
            $('form input[name="betreff"]').val(selected.text());
            $('form input[type="checkbox"]').prop('checked',true);
        });
        sortSelect(document.getElementById('templatePicker'))
       });

    
})();
// ==UserScript==
// @name         Sumator
// @namespace    https://comastuff.com/
// @version      1.2
// @description  Skrypt ten pozwala na szybsze liczenie surowców podczas wyliczania darowizn. Ustawia także domyślne parametry toola.
// @author       Neshi
// @updateURL    https://github.com/Neshi/Og/raw/main/scripts/Sumator.user.js
// @downloadURL  https://github.com/Neshi/Og/raw/main/scripts/Sumator.user.js
// @match        https://art.comastuff.com/ogame/resources.php
// @icon         https://support.gameforge.com/template/games/ogame/favicon.ico
// @grant        none
// ==/UserScript==



$('select[name="lng"]').val('pl');
$('input[name="beauty"]').attr('checked',true);
$('input[name="attacks"]').attr('checked',false);
$('input[name="harvests"]').attr('checked',false)

function getPreviousMonday(pickedDate) {
    var date = new Date(pickedDate);
    var day = date.getDay();
    var prevMonday = new Date(pickedDate);
    if (date.getDay() == 0) {
        prevMonday.setDate(date.getDate() - 7);
    } else {
        prevMonday.setDate(date.getDate() - (day - 1));
    }
    return prevMonday;
}

function nextDay(x, pickedDate) {
    var now = new Date(pickedDate);
    now.setDate(now.getDate() + (x + (7 - now.getDay())) % 7);
    return now;
}
let pointsRegex = /\((.+?)\)/gm;
let dateRegex = />>>\D([^.*]{10})/;


function CalculateSum() {
    var sum = 0;
    $('#results td').each(function() {
        var number = parseInt($(this).text().replaceAll(' ', ''));
        if (number > 0) {
            sum += number;
        }
    });
    var dateMatch = $('details').text().match(dateRegex);
    console.log(dateMatch[1]);
    const monday = getPreviousMonday(dateMatch[1]);
    console.log('monday',monday);
    const sunday = nextDay(7, dateMatch[1]);
    console.log('sunday',sunday);
    const title = 'Darowizny ' + ("0" + monday.getDate()).slice(-2) + '.' + ("0" + (monday.getMonth() + 1)).slice(-2) + '-' + ("0" + sunday.getDate()).slice(-2) + '.' + ("0" + (sunday.getMonth() + 1)).slice(-2) + '.' + sunday.getFullYear() + ' - ';
    $('#results').prepend("<p style='font-weight:bold;font-size:16px;color:red;'>" + sum + " - " + title + sum.toLocaleString('nl').replaceAll('.', ' ') + "</p>");
    var pointMatch = $("details").text().match(pointsRegex);
    let points = parseInt(pointMatch[1].replace(")", "").replace("(", "").replaceAll(".", ""));
    let maxResources = points < 20000 ? 100000 : points * 5;
    let canReciveResources = maxResources - sum;
    var textAfter = title + sum.toLocaleString('nl').replaceAll('.', ' ') + 
    '<br/>===================================================<br/>' +
    'Punkty pierwszy transport: ' + points.toLocaleString('nl').replaceAll('.', ' ') + 
    '<br/>Limit surowców: ' + maxResources.toLocaleString('nl').replaceAll('.', ' ') + 
    '<br/>Gracz może jeszcze otrzymać: ' + canReciveResources.toLocaleString('nl').replaceAll('.', ' ') + 
    '<br/>===================================================<br/>';
    if (canReciveResources < 0){
        textAfter += 'Kara: warn + nakaz odsyłki<br/>' +
        'Surowce do odesłania: '+(canReciveResources*-1).toLocaleString('nl').replaceAll('.', ' ')+
        '<br/>===================================================<br/>';
    }
    
    $('details summary').after(textAfter);
    $('details').attr('open','open');
    $('details').append('===================================================');
    console.log('sum', sum.toLocaleString('nl'));
    return false;
}

$('form').append('<button type=\'button\' class=\'free-resources\'>Darowizna!</button>')

$('.free-resources').click(function(){ CalculateSum(); });


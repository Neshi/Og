// ==UserScript==
// @name         Sumator
// @namespace    https://comastuff.com/
// @version      2.0 beta
// @description  Skrypt ten pozwala na szybsze liczenie surowców podczas wyliczania darowizn. Ustawia także domyślne parametry toola. Pozwala także na sumowanie liczby statków w ruchach flot
// @author       Neshi
// @updateURL    https://github.com/Neshi/Og/raw/main/scripts/Sumator.user.js
// @downloadURL  https://github.com/Neshi/Og/raw/main/scripts/Sumator.user.js
// @match        https://art.comastuff.com/ogame/resources.php
// @match        https://*.ogame.gameforge.com/game/admin2/flottenlog.php?uid=*
// @icon         https://support.gameforge.com/template/games/ogame/favicon.ico
// @grant        none
// ==/UserScript==


// darowizna

$('select[name="lng"]').val('pl');
$('input[name="beauty"]').attr('checked',true);
$('input[name="attacks"]').attr('checked',false);
$('input[name="harvests"]').attr('checked',false)

function getPreviousMonday(pickedDate) {
    var date = new Date(pickedDate);
    var day = date.getDay();
    var prevMonday = new Date(pickedDate);
    if (date.getDay() == 0) {
        prevMonday.setDate(date.getDate() - 6);
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

    $('table[rules="all"] tr').each(function(){
        $(this).find('td:first').append(':');        
    });

    return false;
}

$('form').append('<button type=\'button\' class=\'free-resources\'>Darowizna!</button>')

$('.free-resources').click(function(){ CalculateSum(); });



// sum fleets

$(document).ready(function () {
    $('.contbox table').each(function () {
        var firstRow = $(this).find('tr:first td.no:first-child');
        var firstRowText = firstRow.text();
        if (firstRowText.indexOf('Napadaj') < 0 && firstRowText.indexOf('Niszcz') < 0) {
            return;
        }
        firstRow.prepend('<input type="checkbox" class=\"attack\" />')
        firstRow.click(function (e) {
            console.log(e.target.type);
            if (e.target.type != 'checkbox') {
                if ($(this).find('input.attack:checked').length > 0) {
                    $(this).find('input.attack').prop('checked', false);
                } else {
                    $(this).find('input.attack').prop('checked', true);
                }
            }
        });
    });

});

$('.contbox .content h3:first').append('<button class="countFleet" type="button" style="margin-left:10px;" >Policz flotę!</button>')
$('.countFleet').click(function () { CountFleet(); });

$('.contbox .content h3:first').append('<button class="countFleetAndResources" type="button" style="margin-left:10px;" >Policz flotę i jej punkty!</button>')
$('.countFleetAndResources').click(function () { CountFleet(true); });


$('.textbox h4').after('<p id=\"fleetSummary\"></p>');
$('.contbox .textbox a[onclick="openPage(1, 1)"]').after(' <a href=\"#\" onclick=\"$(\'input.attack\').prop(\'checked\',true);\">Zaznacz wszystkie</a>/<a href=\"#\" onclick=\"$(\'input.attack\').prop(\'checked\',false);\">Odznacz wszystkie</a>');


Array.prototype.sum = function (prop) {
    var total = 0
    for (var i = 0, _len = this.length; i < _len; i++) {
        total += this[i][prop]
    }
    return total
}

var shipsStaticArray = [
    { shipName: 'Mały transporter', resources: 4000 },
    { shipName: 'Duży transporter', resources: 12000 },
    { shipName: 'Lekki myśliwiec', resources: 4000 },
    { shipName: 'Ciężki myśliwiec', resources: 10000 },
    { shipName: 'Krążownik', resources: 29000 },
    { shipName: 'Okręt wojenny', resources: 60000 },
    { shipName: 'Statek kolonizacyjny', resources: 40000 },
    { shipName: 'Recykler', resources: 18000 },
    { shipName: 'Sonda szpiegowska', resources: 1000 },
    { shipName: 'Bombowiec', resources: 90000 },
    { shipName: 'Satelita słoneczny', resources: 2000 },
    { shipName: 'Niszczyciel', resources: 125000 },
    { shipName: 'Gwiazda śmierci', resources: 10000000 },
    { shipName: 'Pancernik', resources: 85000 },
    { shipName: 'Rozpruwacz', resources: 160000 },
    { shipName: 'Pionier', resources: 31000 },
    { shipName: 'Pełzacz', resources: 5000 },
]

function GetMultiplier(shipName) {
    var foundShip = shipsStaticArray.find((x) => x.shipName == shipName);
    if (foundShip != undefined) {
        return foundShip.resources;
    }
    return 0;
}

function CountFleet(countPoints) {

    var wholeFleet = [];
    $('input.attack:checked').each(function () {
        var table = $(this).closest('table');
        var fleetArray = table.find('tr:eq(2) td:eq(0)').html().replaceAll('<br>', '|').split('|');
        console.log(fleetArray);
        wholeFleet = wholeFleet.concat(fleetArray);
    });
    wholeFleet = wholeFleet.filter(function (str) {
        return /\S/.test(str);
    });

    var ships = [];
    for (var i = 0; i < wholeFleet.length; i++) {
        var shipLine = wholeFleet[i].replaceAll('.', '').split(':');
        console.log('shipLine', shipLine);
        console.log('ships', ships);
        var currentShip = ships.find((x) => x.shipName == shipLine[0].trim());
        console.log('currentShip', currentShip);
        if (currentShip != undefined) {
            currentShip.count = currentShip.count + parseInt(shipLine[1].trim());
        } else {
            ships.push({ shipName: shipLine[0].trim(), count: parseInt(shipLine[1].trim()), totalPoints: 0 })
        }



    }
    console.log(ships);

    if (countPoints) {
        for (var i = 0; i < ships.length; i++) {
            var multiplier = GetMultiplier(ships[i].shipName);
            if (multiplier > 0) {
                ships[i].totalPoints = ships[i].count * multiplier;
            }

        }
    }

    var output = '';
    if (ships.length > 0) {
        output += '<span style="text-decoration:underline;">Podsumowanie zaznaczonych flot:</span><br/><ul>'
        for (var i = 0; i < ships.length; i++) {

            output += '<li>' + ships[i].shipName + ': ' + ships[i].count.toLocaleString('nl');
            if (countPoints) {
                output += ' = ' + ships[i].totalPoints.toLocaleString('nl');
            }

            output += '</li>';
        }
        output += '</ul>';
        if (countPoints) {
            output += '<p>Suma: ' + ships.sum('totalPoints').toLocaleString('nl') + '</p>';
        }
        output += '<br/>'
    }


    $('p#fleetSummary').html(output);


}
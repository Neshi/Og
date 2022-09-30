// ==UserScript==
// @name         Sumator
// @namespace    https://comastuff.com/
// @version      2.2
// @description  Skrypt ten pozwala na szybsze liczenie surowców podczas wyliczania darowizn. Ustawia także domyślne parametry toola. Pozwala także na sumowanie liczby statków w ruchach flot
// @author       Neshi
// @updateURL    https://github.com/Neshi/Og/raw/main/scripts/Sumator.user.js
// @downloadURL  https://github.com/Neshi/Og/raw/main/scripts/Sumator.user.js
// @match        https://art.comastuff.com/ogame/resources.php
// @match        https://*.ogame.gameforge.com/game/admin2/flottenlog.php?uid=*&touser=*
// @icon         https://support.gameforge.com/template/games/ogame/favicon.ico
// @grant        none
// ==/UserScript==


// darowizna
if (window.location.host == "art.comastuff.com") {
    $('select[name="lng"]').val('pl');
    $('input[name="beauty"]').attr('checked', true);
    $('input[name="attacks"]').attr('checked', false);
    $('input[name="harvests"]').attr('checked', false)

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
        $('#results td').each(function () {
            var number = parseInt($(this).text().replaceAll(' ', ''));
            if (number > 0) {
                sum += number;
            }
        });
        var dateMatch = $('details').text().match(dateRegex);
        console.log(dateMatch[1]);
        const monday = getPreviousMonday(dateMatch[1]);
        console.log('monday', monday);
        const sunday = nextDay(7, dateMatch[1]);
        console.log('sunday', sunday);
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
        if (canReciveResources < 0) {
            textAfter += 'Kara: warn + nakaz odsyłki<br/>' +
                'Surowce do odesłania: ' + (canReciveResources * -1).toLocaleString('nl').replaceAll('.', ' ') +
                '<br/>===================================================<br/>';
        }

        $('details summary').after(textAfter);
        $('details').attr('open', 'open');
        $('details').append('===================================================');
        console.log('sum', sum.toLocaleString('nl'));

        $('table[rules="all"] tr').each(function () {
            $(this).find('td:first').append(':');
        });

        return false;
    }

    $('form').append('<button type=\'button\' class=\'free-resources\'>Darowizna!</button>')

    $('.free-resources').click(function () { CalculateSum(); });
}


// sum fleets

var debrisFactor = 0.3;
var x = new XMLHttpRequest();
x.open("GET", "https://" + document.domain + "/api/serverData.xml", true);
x.onreadystatechange = function () {
    if (x.readyState == 4 && x.status == 200) {
        var doc = x.responseXML;
        var xDoc = doc.getElementsByTagName("serverData");
        debrisFactor = parseFloat(xDoc[0].getElementsByTagName("debrisFactor")[0].childNodes[0].nodeValue);
        // …
    }
};
x.send(null);

$(document).ready(function () {
    $('.contbox table').each(function () {
        var firstRow = $(this).find('tr:first td.no:first-child');
        var firstRowText = firstRow.text();
        if (firstRowText.indexOf('Napadaj') < 0 && firstRowText.indexOf('Niszcz') < 0) {
            return;
        }
        firstRow.prepend('<input type="checkbox" class=\"attack\" />')
        firstRow.click(function (e) {
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

$('.contbox .content h3:first').append('<button class="countFleetAndResources" type="button" style="margin-left:10px;" >Policz wartość floty!</button>')
$('.countFleetAndResources').click(function () { CountFleet(true); });


$('.textbox h4').after('<p id=\"fleetSummary\"></p>');
$('.contbox .textbox a[onclick="openPage(1, 1)"]').before('<a href=\"#\" onclick=\"$(\'input.attack\').prop(\'checked\',true);\">Zaznacz wszystkie</a>/<a href=\"#\" onclick=\"$(\'input.attack\').prop(\'checked\',false);\">Odznacz wszystkie</a> - ');


Array.prototype.sum = function (prop) {
    var total = 0
    for (var i = 0, _len = this.length; i < _len; i++) {
        total += this[i][prop]
    }
    return total
}

var shipsStaticArray = [
    { shipName: 'Mały transporter', resources: 4000, metal: 2000, crystal: 2000, deuter: 0 },
    { shipName: 'Duży transporter', resources: 12000, metal: 6000, crystal: 6000, deuter: 0 },
    { shipName: 'Lekki myśliwiec', resources: 4000, metal: 3000, crystal: 1000, deuter: 0 },
    { shipName: 'Ciężki myśliwiec', resources: 10000, metal: 6000, crystal: 4000, deuter: 0 },
    { shipName: 'Krążownik', resources: 29000, metal: 20000, crystal: 7000, deuter: 2000 },
    { shipName: 'Okręt wojenny', resources: 60000, metal: 45000, crystal: 15000, deuter: 0 },
    { shipName: 'Statek kolonizacyjny', resources: 40000, metal: 10000, crystal: 20000, deuter: 10000 },
    { shipName: 'Recykler', resources: 18000, metal: 10000, crystal: 6000, deuter: 2000 },
    { shipName: 'Sonda szpiegowska', resources: 1000, metal: 0, crystal: 1000, deuter: 0 },
    { shipName: 'Bombowiec', resources: 90000, metal: 50000, crystal: 25000, deuter: 15000 },
    { shipName: 'Satelita słoneczny', resources: 2000, metal: 2000, crystal: 2000, deuter: 500 },
    { shipName: 'Niszczyciel', resources: 125000, metal: 60000, crystal: 50000, deuter: 15000 },
    { shipName: 'Gwiazda Śmierci', resources: 10000000, metal: 5000000, crystal: 4000000, deuter: 1000000 },
    { shipName: 'Pancernik', resources: 85000, metal: 30000, crystal: 40000, deuter: 15000 },
    { shipName: 'Rozpruwacz', resources: 160000, metal: 85000, crystal: 55000, deuter: 20000 },
    { shipName: 'Pionier', resources: 31000, metal: 8000, crystal: 15000, deuter: 8000 },
    { shipName: 'Pełzacz', resources: 5000, metal: 2000, crystal: 2000, deuter: 1000 },
]

function GetShipDetails(shipName) {
    var foundShip = shipsStaticArray.find((x) => x.shipName == shipName);
    if (foundShip != undefined) {
        return foundShip;
    }
    return undefined;
}

function CountFleet(countPoints) {

    var wholeFleet = [];
    $('input.attack:checked').each(function () {
        var table = $(this).closest('table');
        var fleetArray = table.find('tr:eq(2) td:eq(0)').html().replaceAll('<br>', '|').split('|');

        wholeFleet = wholeFleet.concat(fleetArray);
    });
    wholeFleet = wholeFleet.filter(function (str) {
        return /\S/.test(str);
    });

    var ships = [];
    for (var i = 0; i < wholeFleet.length; i++) {
        var shipLine = wholeFleet[i].replaceAll('.', '').split(':');

        var currentShip = ships.find((x) => x.shipName == shipLine[0].trim());

        if (currentShip != undefined) {
            currentShip.count = currentShip.count + parseInt(shipLine[1].trim());
        } else {
            ships.push({ shipName: shipLine[0].trim(), count: parseInt(shipLine[1].trim()), resources: '', totalPoints: 0 })
        }



    }

    if (countPoints) {
        for (var i = 0; i < ships.length; i++) {
            var shipDetails = GetShipDetails(ships[i].shipName);
            if (shipDetails != undefined) {
                ships[i].totalPoints = ships[i].count * shipDetails.resources;

                var metal = (ships[i].count * shipDetails.metal);
                var metalString = metal == 0 ? '-' : metal.toLocaleString('nl');

                var crystal = (ships[i].count * shipDetails.crystal);
                var crystalString = crystal == 0 ? '-' : crystal.toLocaleString('nl');

                var deuter = (ships[i].count * shipDetails.deuter);
                var deuterString = deuter == 0 ? '-' : deuter.toLocaleString('nl');

                var debrisMetal = (metal == 0 ? 1 : metal) * debrisFactor;;
                var debrisCrystal = (crystal == 0 ? 1 : crystal) * debrisFactor;
                var debrisMetalString = debrisMetal == 0 ? '-' : debrisMetal.toLocaleString('nl');
                var debrisCrystalString = debrisCrystal == 0 ? '-' : debrisCrystal.toLocaleString('nl');

                ships[i].resources = '<u>' + ships[i].totalPoints.toLocaleString('nl') +
                    '</u> (<span style=\"color:#5454d7;\">' + metalString + '</span>/<span style=\"color:green;\">' + crystalString + '</span>/<span style=\"color:aqua;\">' + deuterString
                    + '</span>) - PZ (<span style="color:#5454d7;\">' + debrisMetalString + '</span>/<span style="color:green;\">' + debrisCrystalString + '</span>)';
            }

        }
    }

    var output = '';
    if (ships.length > 0) {
        output += '<span style="text-decoration:underline;">Podsumowanie zaznaczonych flot:</span> (<span style=\"color:#5454d7;\">Metal</span>/<span style=\"color:green;\">Kryształ</span>/<span style=\"color:aqua;\">Deuter</span>)<br/><ul>'
        for (var i = 0; i < ships.length; i++) {

            output += '<li>' + ships[i].shipName + ': ' + ships[i].count.toLocaleString('nl');
            if (countPoints) {
                output += ' = ' + ships[i].resources;
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
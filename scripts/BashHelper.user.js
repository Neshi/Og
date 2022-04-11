// ==UserScript==
// @name         Bash Helper (beta)
// @namespace    https://comastuff.com/
// @version      2.0
// @description  Skrypt ten sprawdza czy została naruszona zasada Bash
// @author       Neshi
// @match        https://*.ogame.gameforge.com/game/admin2/flottenlog.php?uid=*&touser=*
// @icon         https://support.gameforge.com/template/games/ogame/favicon.ico
// @updateURL    https://github.com/Neshi/Og/raw/main/scripts/BashHelper.user.js
// @downloadURL  https://github.com/Neshi/Og/raw/main/scripts/BashHelper.user.js
// @grant        none
// ==/UserScript==




function subtractTimeFromDate(objDate, intHours) {
    var numberOfMlSeconds = objDate.getTime();
    var addMlSeconds = (intHours * 60) * 60 * 1000;
    var newDateObj = new Date(numberOfMlSeconds - addMlSeconds);

    return newDateObj;
}

function CountBash(){

    let missionTypeRegex = /^[^\(]*/gm
    var attackTimeTable = [];
    $('.contbox table').each(function() {
        var firstRow = $(this).find('tr:first td.no:first-child').text();

        if (firstRow.indexOf('Napadaj') < 0 && firstRow.indexOf('Niszcz') < 0) {
            return;
        }
        var coordsString = $(this).find('tr:eq(1) td:eq(2)').text();
        var planetLink = $(this).find('tr:eq(1) td:eq(2) a').attr('href');
        var dateString = $(this).find('tr:eq(3) td:last').text();
        var params = new Proxy(new URLSearchParams(planetLink), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        var returnTable = $(this).next();
        var nextRow = returnTable.find('tr:first td.no:first-child').text();

        if (nextRow.indexOf('Powrót na planetę') < 0){
            return;
        }
        var backTimeString = returnTable.find('tr:eq(3) td:first').text();

        console.log("Czas dolotu: ", dateString,"; Czas powrotu: ",backTimeString);
        if (dateString === backTimeString){
            let match = firstRow.match(missionTypeRegex)
            var planetId = params.toplanet == null ? 'Zniszczony': params.toplanet;
            attackTimeTable.push({text:dateString+' ('+match[0].replace(' ','')+')',time:new Date(dateString),coords:coordsString + ' ('+planetId+')'})
        } else {
            console.log("Zawrócone");
        }

    });


console.log('attacktimetable',attackTimeTable);
    var allCoords = [...new Set(attackTimeTable.map(item=>item.coords))];
    //console.log(allCoords);

    var bashTable = [];
    for(var j=0;j<allCoords.length;j++)
    {
        let coordsAttackList = attackTimeTable.filter(x=>x.coords===allCoords[j]);
        var firstAttackTime = coordsAttackList[0].time;
        var previous24Hours = subtractTimeFromDate(firstAttackTime,24);

        console.log(firstAttackTime);
        console.log(previous24Hours);
        bashTable.push(coordsAttackList[0]);
        for(var i=0;i<coordsAttackList.length;i++){
            if (coordsAttackList[i].time>previous24Hours && coordsAttackList[i].time<firstAttackTime){
                bashTable.push(coordsAttackList[i]);
            }
        }
    }

    var output='';
    if (bashTable.length>0){
        for(var i=0;i<allCoords.length;i++){
            output+= '<p><span style="text-decoration:underline;">'+allCoords[i]+':</span><br/><ol>'
            let coordsAttackList = bashTable.filter(x=>x.coords===allCoords[i]);
            for(var j=0;j<coordsAttackList.length;j++){
                output+= '<li>'+ coordsAttackList[j].text+'</li>'
            }
            output+='</ol></p><br/>'
        }
    }

    $('.textbox h4').after(output);

    console.log(bashTable);
}


$('.contbox .content h3:first').append('<button class="countBash" type="button" style="margin-left:10px;" >Sprawdź bash!</button>')

$('.countBash').click(function(){ CountBash(); });

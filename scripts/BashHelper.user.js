// ==UserScript==
// @name         Bash Helper (beta)
// @namespace    https://comastuff.com/
// @version      1.0
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
    var attackTimeTable = [];
    $('.contbox table').each(function() {
        var firstRow = $(this).find('tr:first td.no:first-child').text();

        if (firstRow.indexOf('Napadaj') < 0) {
            return;
        }
        var coordsString = $(this).find('tr:eq(1) td:eq(2)').text();
        var dateString = $(this).find('tr:eq(3) td:last').text();
        attackTimeTable.push({text:dateString,time:new Date(dateString),coords:coordsString})
    //console.log(coordsString);
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


$('#GM_ActivateButton').after('<button class="countBash" type="button" style="margin-left:10px;" >Sprawdź bash! (beta)</button>')

$('.countBash').click(function(){ CountBash(); });

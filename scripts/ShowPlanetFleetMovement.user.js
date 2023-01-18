
// ==UserScript==
// @name           ShowPlanetFleetMovement
// @description    Adds a link to player overview for all fleet movement to and from a planet or moon
// @include        *://*.ogame.gameforge.com/game/admin2/kontrolle.php?uid=*
// @version        03.12.2015
// @updateURL    https://github.com/Neshi/Og/raw/main/scripts/ShowPlanetFleetMovement.user.js
// @downloadURL  https://github.com/Neshi/Og/raw/main/scripts/ShowPlanetFleetMovement.user.js
// @grant none
// ==/UserScript==

//** edit by pax OGame.pl
//** 14.12.19 - fix for ogame version 7.1.0-rc14

var all_links = document.getElementsByTagName('a'); //gets all links
var uid = /uid=(\d{6})/.exec(document.location.href)[1]; //stores user id from browser url
for(x=0; x<all_links.length; x++){
  if(/renameplanet/.test(all_links[x])){
    var pid = /pid=(\d{8})/.exec(all_links[x])[1]; //stores planet id
    newElement = document.createElement('span'); //creates a new child filled in next line
    newElement.innerHTML = '&nbsp;&nbsp;<a href="flottenlog.php?uid=*' +
       '&uid=' + uid + '&list=&touser=&showplanet=' + pid +
      '"><img src="http://gf1.geo.gfsrv.net/cdna9/e1f22858e4d54125ed88c6de5a3068.gif" width="20" height="20" alt="fleetlog"></a>';
    // adds child after the link to change planet name
    all_links[x].parentNode.insertBefore(newElement, all_links[x].nextSibling);
  }
}
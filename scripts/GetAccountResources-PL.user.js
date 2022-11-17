// ==UserScript==
// @name        GetAccountRessources - PL
// @namespace   ogameteam
// @include     http*://s*-*.ogame.gameforge.com/game/admin2/kontrolle.php?=*&uid=*
// @include     http*://s*-*.ogame.gameforge.com/game/admin2/kontrolle.php?uid=*
// @version     1
// @grant       none
// @updateURL    https://github.com/Neshi/Og/raw/main/scripts/GetAccountResources-PL.user.js
// @downloadURL  https://github.com/Neshi/Og/raw/main/scripts/GetAccountResources-PL.user.js
// @grant       none
// ==/UserScript==

//** edit by pax OGame.pl
//** added Pl language
//** 14.12.19 - fix for ogame version 7.1.0-rc14

// get total amount of ressources in account

var planettable = $('.contbox .textbox').prepend(
    `
    <div id="calcRessDiv">
      <button id="calcRess">Pokaż wszystkie surowce</button>
      <br>
      <span id="calcRessText"></span>
    </div>
    `);
  
  var button = document.querySelector('#calcRess');
  var resstext = document.querySelector('#calcRessText');
  
  function getRess(){
    button.disabled = true;
  
    var metall = 0;
    var kristall = 0;
    var deuterium = 0;
  
    var reqs = [];
    var urls = [];
    document.querySelectorAll('body > div.contbox > div.content > div > table:nth-child(12) td:nth-child(1) a:nth-child(1)').forEach(item => {
      urls.push(item.href);
    });
    document.querySelectorAll('body > div.contbox > div.content > div > table:nth-child(12) td:nth-child(2) a:nth-child(1)').forEach(item => {
      urls.push(item.href);
    });
    urls.forEach(item => {
      reqs.push(new Promise((resolve, reject) => {
        $.get(item).then(data => {
          var parser = new DOMParser();
          var doc = parser.parseFromString(data, "text/html");
          var metInput = doc.getElementById("res1");
          var krisInput = doc.getElementById("res2");
          var deutInput = doc.getElementById("res3");
          if(metInput)
            metall += parseInt(metInput.value);
          if(krisInput)
            kristall += parseInt(krisInput.value);
          if(deutInput)
            deuterium += parseInt(deutInput.value);
          resolve();
        }).fail(() => {
          reject();
        })
      }))
    })
    // add thousands separator
    function formatNumber (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").replace(/,/g,'.')
    }
  
    Promise.all(reqs).then(() => {
      resstext.innerHTML = "Metal : " + formatNumber(metall)
                          + ", Kryształ : " + formatNumber(kristall) + ", Deuter : " + formatNumber(deuterium);
                button.disabled = false;
    })
  }
  
  button.addEventListener('click',getRess,true);
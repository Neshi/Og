// ==UserScript==
// @name           ogame admintool script multilang
// @author         Dark Sky
// @include        https://*.ogame.gameforge.com/game/admin2/*
// @exclude        https://s*pl.ogame.gameforge.com/game/admin2/flottenlog.php?*=&uid=*&*
// @exclude        https://s*pl.ogame.gameforge.com/game/admin2/flottenlog.php?*=&showplanet*
// @include        http://ogame1304.de/game/admin2/*
// @exclude        http://ogame1304.de/game/admin2/flottenlog.php?session=*&uid=*&*
// @exclude        http://ogame1304.de/game/admin2/flottenlog.php?session=*&showplanet*
// @updateURL    https://github.com/Neshi/Og/raw/main/scripts/OgameAdminToolScriptMultiLang.user.js
// @downloadURL  https://github.com/Neshi/Og/raw/main/scripts/OgameAdminToolScriptMultiLang.user.js
// @grant          none
// ==/UserScript==

// 08.02.16 - merged available languages into single script
// 05.02.16 - fix for ogame version 6.0.19 - support https
// 08.02.13 - fix for ogame version 5.3.1
// 16.03.13 - fix for ogame version 5.3.3
//** edit by pax OGame.pl
//** added Pl language
//** 14.12.19 - fix for ogame version 7.1.0-rc14

// init settings begin



var defaultScriptLanguage = "Pl";

var first = toBool(getVar("firsttime","true"));
if (first){
  setVar("fleetlog","true");
  setVar("kontrolle","true");
  setVar("loginlogs","true");
  setVar("toplist","true");
  setVar("allylist","true");
  setVar("klappshort","true");
  setVar("firsttime","false");
  setVar("ipLogDays",29);
  setVar("vacationLogDays",30);
  setVar("scriptlanguage", defaultScriptLanguage);
}  

//  var session = document.URL.match(/([0-9a-zA-Z]+)/)[1];
var urlreg = document.URL.match(/(^https?):\/\/([0-9a-zA-Z\-\._]+)\//);
var ogameProtocol = urlreg[1];
var server = urlreg[2];
var changefleetlog = toBool(getVar("fleetlog","false"));
var changekontrollseite = toBool(getVar("kontrolle","false"));
var changeloginlogs = toBool(getVar("loginlogs","false"));
var changetoplist = toBool(getVar("toplist","false"));
var changeklappshort = toBool(getVar("klappshort","false"));
var changeallylist = toBool(getVar("allylist","false"));
var ipLogDays = getVar("ipLogDays",29);
var vacationLogDays = getVar("vacationLogDays",30);
var language = getVar("scriptlanguage", defaultScriptLanguage);;

// init settings end

// localization begin

var LANG_MAP = [];

LANG_MAP["DE"] = [];  
LANG_MAP["DE"]["comatool"] = "CoMaTool";
LANG_MAP["DE"]["ingameoverview"] = "Ingame";
LANG_MAP["DE"]["scriptsettings"] = "Scripteinstellungen";
LANG_MAP["DE"]["language"] = "Sprache";
LANG_MAP["DE"]["changefleetlogpage"] = "Ändere Flottenlogseite";
LANG_MAP["DE"]["changecontrollpage"] = "Verbessere Kontrollseite";
LANG_MAP["DE"]["shrinkshortnotes"] = "Automatisch eingeklappte Shortnotes";
LANG_MAP["DE"]["changeloginlogs"] = "Verbesserte Loginlogs";
LANG_MAP["DE"]["loginlogdays"] = "Tage Loginlogs";
LANG_MAP["DE"]["vacationmodelogdays"] = "Tage Umodlogs";
LANG_MAP["DE"]["markusers"] = "Markiere in der Toplist bereits angeklickte User";
LANG_MAP["DE"]["markalliances"] = "Markiere in der Allianzübersicht bereits angeklickte Allys";
LANG_MAP["DE"]["minimizeall"] = "Alle einklappen";
LANG_MAP["DE"]["maximizeall"] = "Alle ausklappen";
LANG_MAP["DE"]["openuserid"] = "Öffne UserId";
LANG_MAP["DE"]["removebbcode"] = "Entferne BB-Code";
LANG_MAP["DE"]["userid"] = "UserId";
LANG_MAP["DE"]["showshortloginlog"] = "Zeige gekürztes Log";
LANG_MAP["DE"]["hideshortloginlog"] = "Verstecke gekürztes Log";
LANG_MAP["DE"]["resetmarkings"] = "Resette Markierungen";

LANG_MAP["EN"] = [];  
LANG_MAP["EN"]["comatool"] = "CoMaTool";
LANG_MAP["EN"]["ingameoverview"] = "Ingame";
LANG_MAP["EN"]["scriptsettings"] = "Script settings";
LANG_MAP["EN"]["language"] = "Language";
LANG_MAP["EN"]["changefleetlogpage"] = "Change fleet log page";
LANG_MAP["EN"]["changecontrollpage"] = "Change player view / alliance view";
LANG_MAP["EN"]["shrinkshortnotes"] = "Minimize short notes";
LANG_MAP["EN"]["changeloginlogs"] = "Change login logs";
LANG_MAP["EN"]["loginlogdays"] = "Login log days";
LANG_MAP["EN"]["vacationmodelogdays"] = "Vacation mode log days";
LANG_MAP["EN"]["markusers"] = "Mark clicked users in toplist";
LANG_MAP["EN"]["markalliances"] = "Mark clicked alliances in alliance overview";
LANG_MAP["EN"]["minimizeall"] = "Minimize all";
LANG_MAP["EN"]["maximizeall"] = "Maximize all";
LANG_MAP["EN"]["openuserid"] = "Open userid";
LANG_MAP["EN"]["removebbcode"] = "Remove BB-code";
LANG_MAP["EN"]["userid"] = "Insert userid";
LANG_MAP["EN"]["showshortloginlog"] = "Show short log";
LANG_MAP["EN"]["hideshortloginlog"] = "Hide short log";
LANG_MAP["EN"]["resetmarkings"] = "Reset marking";

// translated by Chontic
LANG_MAP["FR"] = [];  
LANG_MAP["FR"]["comatool"] = "CoMaTool";
LANG_MAP["FR"]["ingameoverview"] = "Retour InGame";
LANG_MAP["FR"]["scriptsettings"] = "Options AT-Script";
LANG_MAP["FR"]["language"] = "Langue";
LANG_MAP["FR"]["changefleetlogpage"] = "Modifier les Logs Flotte";
LANG_MAP["FR"]["changecontrollpage"] = "Modifier les Pages Joueur et Alliance";
LANG_MAP["FR"]["shrinkshortnotes"] = "Réduire les ShortNews automatiquement";
LANG_MAP["FR"]["changeloginlogs"] = "Améliorer les Logs IP";
LANG_MAP["FR"]["loginlogdays"] = "Jours de Logs IP";
LANG_MAP["FR"]["vacationmodelogdays"] = "Jours de Logs mode vacances";
LANG_MAP["FR"]["markusers"] = "Marquer les joueurs visités dans le Classement";
LANG_MAP["FR"]["markalliances"] = "Marquer les alliances visitées dans la Vue Alliance";
LANG_MAP["FR"]["minimizeall"] = "Réduire";
LANG_MAP["FR"]["maximizeall"] = "Montrer";
LANG_MAP["FR"]["openuserid"] = "Montrer le joueur avec l`ID";
LANG_MAP["FR"]["removebbcode"] = "Enlever le BB-Code";
LANG_MAP["FR"]["userid"] = "Mettre l`ID";
LANG_MAP["FR"]["showshortloginlog"] = "Montrer Logs réduits";
LANG_MAP["FR"]["hideshortloginlog"] = "Cacher Logs réduits";
LANG_MAP["FR"]["resetmarkings"] = "Remettre à 0 les marquages";
  
  // translated by pax
  LANG_MAP["Pl"] = [];  
LANG_MAP["Pl"]["comatool"] = "CoMaTool";
LANG_MAP["Pl"]["ingameoverview"] = "Podglad gry";
LANG_MAP["Pl"]["scriptsettings"] = "Ustawienia skryptu";
LANG_MAP["Pl"]["language"] = "Jezyk";
LANG_MAP["Pl"]["changefleetlogpage"] = "Zmien strone logow flot";
LANG_MAP["Pl"]["changecontrollpage"] = "Zmien podglad gracza / sojuszu";
LANG_MAP["Pl"]["shrinkshortnotes"] = "Zminimalizuj krotkie notki";
LANG_MAP["Pl"]["changeloginlogs"] = "Zmien logi loginow";
LANG_MAP["Pl"]["loginlogdays"] = "Historia logowań";
LANG_MAP["Pl"]["vacationmodelogdays"] = "Logi statusu urlopu";
LANG_MAP["Pl"]["markusers"] = "Zaznaczenie uzytkownikow kliknietych w topliscie";
LANG_MAP["Pl"]["markalliances"] = "Zaznaczenie sojuszy kliknietych w podgladzie sojuszu";
LANG_MAP["Pl"]["minimizeall"] = "Zminimalizuj wszystko";
LANG_MAP["Pl"]["maximizeall"] = "Powieksz wszystko";
LANG_MAP["Pl"]["openuserid"] = "Otworz userid";
LANG_MAP["Pl"]["removebbcode"] = "Usun BB-code";
LANG_MAP["Pl"]["userid"] = "Podaj userid";
LANG_MAP["Pl"]["showshortloginlog"] = "Pokaz krotki log";
LANG_MAP["Pl"]["hideshortloginlog"] = "Ukryj krotki log";
LANG_MAP["Pl"]["resetmarkings"] = "Reset zaznaczen";

var supportedLanguages = ["DE", "EN", "FR", "Pl"];
if (supportedLanguages.indexOf(language) < 0)
  language = defaultScriptLanguage;
var lang = LANG_MAP[language];

// localization end


//### left menu
var x = document.evaluate("/html/body/div[3]/div[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext();
if(x){  
  var infodiv = document.createElement("div");
  infodiv.id ='ATscriptinfobox';
  infodiv.style.fontSize = 'small';
  x.appendChild(document.createElement("br"));
  x.appendChild(infodiv);
  
  var text = document.createTextNode(lang["comatool"]);
  var a = document.createElement("a");
  a.href = "#"; 
  a.appendChild(text);
  a.setAttribute('onclick', 'javascript:window.open("https://coma.gameforge.com/", "Comatool");');
  infoboxInsert(a);
  
  var text = document.createTextNode(lang["ingameoverview"]);
  var a = document.createElement("a");
  a.href = '#';
  a.appendChild(text);
  a.setAttribute('onclick', 'javascript:window.open("'+ogameProtocol+'://'+server+'/game/index.php?page=ingame&component=overview", "Ingame");');
  infoboxInsert(a);    
}
//###



// settings
if (document.URL.indexOf("/game/admin2/home.php") > -1){
  var settings = document.createElement("table");
  settings.width="500";
  settings.innerHTML =   '<tbody><tr><th bgcolor="#5F5F75">'+lang["scriptsettings"]+'</th></tr>'+
              '<tr><td>' + lang["language"] + ' <input id=\"scriptlanguage\" type =\"text\" onchange=\"localStorage.setItem(this.id,this.value.toUpperCase());\">' +
              '(' + supportedLanguages.toString() + ')</td></tr>'+
              '<tr><td>' + lang["changefleetlogpage"] + '  <input id=\"fleetlog\" type=\"checkbox\" onchange=\"localStorage.setItem(this.id,this.checked);\"></td></tr>'+
              '<tr><td>' + lang["changecontrollpage"] + '  <input id=\"kontrolle\" type=\"checkbox\" onchange=\"localStorage.setItem(this.id,this.checked);\"></td></tr>'+
              '<tr><td>' + lang["shrinkshortnotes"] + '  <input id=\"klappshort\" type=\"checkbox\" onchange=\"localStorage.setItem(this.id,this.checked);\"></td></tr>'+
              '<tr><td>' + lang["changeloginlogs"] + '  <input id=\"loginlogs\" type=\"checkbox\" onchange=\"localStorage.setItem(this.id,this.checked);\"></td></tr>'+
              '<tr><td>' + lang["loginlogdays"] + ' <input id=\"ipLogDays\" type =\"text\" onchange=\"localStorage.setItem(this.id,this.value);\"></td></tr>'+
                              //'<tr><td>' + lang["loginlogdays"] + ' <input id=\"ipLogDays\" type =\"checkbox\" onchange=\"localStorage.setItem(this.id,this.value);\"></td></tr>'+
              '<tr><td>' + lang["vacationmodelogdays"] + ' <input id=\"vacationLogDays\" type =\"text\" onchange=\"localStorage.setItem(this.id,this.value);\"></td></tr>'+
              '<tr><td>' + lang["markusers"] + '<input id=\"toplist\" type=\"checkbox\" onchange=\"localStorage.setItem(this.id,this.checked);\"></td></tr>'+
              '<tr><td>' + lang["markalliances"] + '<input id=\"allylist\" type=\"checkbox\" onchange=\"localStorage.setItem(this.id,this.checked);\"></td></tr>'+
              '</tbody>';
  document.evaluate("/html/body/div[5]/div[2]/div", document, null, XPathResult.ANY_TYPE, null).iterateNext().appendChild(settings);
  setSettingValues();
}

//controll page
if (document.URL.indexOf("/game/admin2/kontrolle.php?") > -1) {
  if(changekontrollseite){
    if (document.URL.indexOf("&uid=") > -1 ){
      if ((document.URL.indexOf("logs") < 0)&&(document.URL.indexOf("ressourcen") < 0)){
      
      // mark user
        var usertab = document.evaluate("/html/body/div[5]/div[2]/div/table/tbody", document, null, XPathResult.ANY_TYPE, null).iterateNext();
        var userid = document.URL.match(/&uid=(\d+)/)[1];
        var markCheckbox = document.createElement("input");
        markCheckbox.type = "checkbox";
        markCheckbox.name = "mark";  
        markCheckbox.id = "markCheckbox";
        
        if (localStorage[server+'userids']){
          var ok = false;
          var users = new Array();
          users = getVar(server+'userids',0).split('|');
          var sortedUsers = new Array();
          for (var i = 0;i<users.length;i++){
            sortedUsers[i] = parseInt(users[i]);
          }
          setVar(server+'userids',sort(sortedUsers).join('|'));
          ok = true;
          if(ok){                            
            var index = search(sortedUsers,userid);
            if (index > -1){
              usertab.firstChild.firstChild.style.color = '#FF0000';
                markCheckbox.checked = true;
            }                
          }
        }

        
        var on = document.createAttribute("onclick");
        on.nodeValue = 'javascript:'+
                        'var checkbox = document.getElementById("markCheckbox");                '+
                'var server = document.URL.match(/^https?:\\/\\/([0-9a-zA-Z\-\._]+)\/)[1];        '+
                'var userid = document.URL.match(/uid=([0-9]+)/)[1];                  '+
                'if(checkbox){                                      '+
                '  var aaaa = new Array();                                '+
                    // mark
                '  if(checkbox.checked){                                '+
                '    if(localStorage[server+\'userids\']){                      '+                        
                '      aaaa = localStorage[server+\'userids\'].split(\'|\');            '+
                '      var nichtdoppelt = true;                          '+
                '      for (var x=0;x<aaaa.length;x++){                      '+
                '        if (aaaa[x] == userid){                         '+
                '          nichtdoppelt=false;                          '+
                '        }                                     '+
                '      }                                      '+
                '      if (nichtdoppelt){                              '+
                '        aaaa.push(userid);                            '+
                '      }                                       '+
                '    }else{                                      '+
                '      aaaa[0] = userid;                              '+
                '    }                                        '+
                '    localStorage[server+\'userids\'] = aaaa.join(\'|\');              '+
                '    checkbox.checked = true;                            '+
                '       checkbox.parentNode.style.color = \'#FF0000\';                               '+
                '  }else{                                        '+
                    //remove        
                '    if(localStorage[server+\'userids\']){                      '+                        
                '      aaaa = localStorage[server+\'userids\'].split(\'|\');            '+
                '      var index = -1;                                '+
                '      for (var x=0;x<aaaa.length;x++){                      '+
                '        if (aaaa[x] == userid){                         '+
                '          index = x;                              '+
                '          break;                                '+
                '        }                                     '+
                '      }                                      '+
                '      if (index > -1){                              '+
                '        if (index == 0){                            '+
                '          aaaa.shift();                            '+
                '        }else {                                  '+
                '          aaaa = aaaa.slice(0,index).concat(aaaa.slice(index+1,aaaa.length));  '+
                '        }                                    '+
                '      }                                      '+
                '    }                                        '+
                '    localStorage[server+\'userids\'] = aaaa.join(\'|\');              '+
                '    checkbox.checked = false;                            '+  
                '       checkbox.parentNode.style.color = \'#CCCCCC\';                  '+
                '  }                                          '+
                '}';
        markCheckbox.setAttributeNode(on);
        
        usertab.firstChild.firstChild.appendChild(markCheckbox);

      // add new short note by clicking on "Short Notes"

        var blu = document.evaluate("/html/body/div[5]/div[2]/div/table[3]/tbody", document, null, XPathResult.ANY_TYPE, null).iterateNext();
        var link = ogameProtocol+'://'+server+'/game/admin2/kontrolle.php?&uid='+document.URL.match(/uid=([0-9]+)/)[1] ;
        var x = lang["minimizeall"];
        if (changeklappshort) x = lang["maximizeall"];
        blu.firstChild.innerHTML = '<th colspan=\"4\"><a href = \"'+link+'&shortadd=1\">Short Notes</a>'+
                 '<div align="left">'+
                 '<a onclick="javascript:var trs = this.parentNode.parentNode.parentNode.parentNode.getElementsByTagName(\'tr\');'+
                 'if (this.innerHTML == \''+lang["maximizeall"]+'\'){'+
                 '  for (var i = 1; i < trs.length-1;i++){'+
                 '    trs[i].getElementsByTagName(\'td\')[2].firstChild.style.height = \'auto\';'+
                 '    trs[i].getElementsByTagName(\'td\')[2].firstChild.style.overflow = \'hidden\';'+
                 '  }'+
                 '  this.innerHTML = \''+lang["minimizeall"]+'\';'+
                 '}else{'+
                 '  for (var i = 1; i < trs.length-1;i++){'+
                 '    trs[i].getElementsByTagName(\'td\')[2].firstChild.style.height = \'18px\';'+
                 '    trs[i].getElementsByTagName(\'td\')[2].firstChild.style.overflow = \'hidden\';'+
                 '  }'+
                 '  this.innerHTML = \''+lang["maximizeall"]+'\';'+
                 '}'+
                 '">'+x+'</a></div></th>' ;

  //show / hide individual notes

        var trs = blu.getElementsByTagName("tr");
        for (var i = 1; i < trs.length-1;i++){
          var td = trs[i].getElementsByTagName("td")[2];
          var on = document.createAttribute("onclick");
          var on2 = document.createAttribute("onclick");
          on.nodeValue = ' javascript: var x = this.parentNode.firstChild.nextSibling.nextSibling.firstChild;x.style.overflow = \'hidden\';if (x.style.height != \'18px\'){x.style.height = \'18px\';}else{x.style.height = \'auto\';}';
          on2.nodeValue = on.nodeValue;
          td.innerHTML = '<div>'+td.innerHTML+'</div>';
          trs[i].firstChild.setAttributeNode(on);
          trs[i].firstChild.nextSibling.setAttributeNode(on2);
          if (changeklappshort){
            td.firstChild.style.overflow = 'hidden';
            td.firstChild.style.height = '18px';
          }
        }
      }
    }else{

// open user with id

      if (document.URL.indexOf("&aid=") < 0 ){ //it's a player
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td")
        var input = document.createElement("input");
        input.id = "inputid" ;
        input.value = 0;
        input.size = 10;
        td1.appendChild(input);
        var a = document.createElement("a");
        a.href = '#';
        a.appendChild(document.createTextNode(lang["openuserid"]));
        var url = ogameProtocol+'://'+server+'/game/admin2/kontrolle.php?&uid=';
        a.setAttribute('onclick', 'javascript:function b(){'+
                'var i = document.getElementById(\'inputid\').value;'+
                'window.location.href = \''+url+'\'+i;}'+
                'b();');
        td2.appendChild(a);
        tr.appendChild(td1);
        tr.appendChild(td2);
        document.getElementsByTagName("tbody")[0].appendChild(tr);
      }else{// it's an alliance 
      
      // mark ally
        var allyid = document.URL.match(/&aid=(\d+)/)[1];
        var allytab = document.getElementsByTagName("tbody")[0];
        allytab.firstChild.firstChild.innerHTML = '<a target="_blank" href="'+ogameProtocol+'://'+server+'/game/allianceInfo.php?allianceId='+allyid+'">'+allytab.firstChild.firstChild.innerHTML+'</a>';
        
        var markCheckbox = document.createElement("input");
        markCheckbox.type = "checkbox";
        markCheckbox.name = "mark";  
        markCheckbox.id = "markCheckbox";
        
        if (localStorage[server+'allyids']){
          var ok = false;
          var allys = new Array();
          allys = getVar(server+'allyids',0).split('|');
          var sortedAllys = new Array();
          for (var i = 0;i<allys.length;i++){
            sortedAllys[i] = parseInt(allys[i]);
          }
          setVar(server+'allyids',sort(sortedAllys).join('|'));
          ok = true;
          if(ok){                            
            var index = search(sortedAllys,allyid);
            if (index > -1){
              allytab.firstChild.firstChild.firstChild.style.color = '#FF0000';
                markCheckbox.checked = true;
            }                
          }
        }

        
        var on = document.createAttribute("onclick");
        on.nodeValue = 'javascript:'+
                        'var checkbox = document.getElementById("markCheckbox");                '+
                'var server = document.URL.match(/^https?:\\/\\/([0-9a-zA-Z\-\._]+)\/)[1];          '+
                'var allyid = document.URL.match(/aid=([0-9]+)/)[1];                  '+
                'if(checkbox){                                      '+
                '  var aaaa = new Array();                                '+
                    // mark
                '  if(checkbox.checked){                                '+
                '    if(localStorage[server+\'allyids\']){                      '+                        
                '      aaaa = localStorage[server+\'allyids\'].split(\'|\');            '+
                '      var nichtdoppelt = true;                          '+
                '      for (var x=0;x<aaaa.length;x++){                      '+
                '        if (aaaa[x] == allyid){                         '+
                '          nichtdoppelt=false;                          '+
                '        }                                     '+
                '      }                                      '+
                '      if (nichtdoppelt){                              '+
                '        aaaa.push(allyid);                            '+
                '      }                                       '+
                '    }else{                                      '+
                '      aaaa[0] = allyid;                              '+
                '    }                                        '+
                '    localStorage[server+\'allyids\'] = aaaa.join(\'|\');              '+
                '    checkbox.checked = true;                            '+
                '       checkbox.previousSibling.style.color = \'#FF0000\';                             '+
                '  }else{                                        '+
                    //remove        
                '    if(localStorage[server+\'allyids\']){                      '+                        
                '      aaaa = localStorage[server+\'allyids\'].split(\'|\');            '+
                '      var index = -1;                                '+
                '      for (var x=0;x<aaaa.length;x++){                      '+
                '        if (aaaa[x] == allyid){                         '+
                '          index = x;                              '+
                '          break;                                '+
                '        }                                     '+
                '      }                                      '+
                '      if (index > -1){                              '+
                '        if (index == 0){                            '+
                '          aaaa.shift();                            '+
                '        }else {                                  '+
                '          aaaa = aaaa.slice(0,index).concat(aaaa.slice(index+1,aaaa.length));  '+
                '        }                                    '+
                '      }                                      '+
                '    }                                        '+
                '    localStorage[server+\'allyids\'] = aaaa.join(\'|\');              '+
                '    checkbox.checked = false;                            '+  
                '       checkbox.previousSibling.style.color = \'#CCCCCC\';                '+
                '  }                                          '+
                '}';
        markCheckbox.setAttributeNode(on);
        
        allytab.firstChild.firstChild.appendChild(markCheckbox);

// remove bb codes from alliance text and replace urls by corresponding links   

        function killBB(){
          var allytab = document.getElementsByTagName("tbody")[0];
          var allytexttd = allytab.getElementsByTagName("tr")[3].getElementsByTagName("td")[1];
          var allytext = allytexttd.innerHTML;
          var textneu = allytext;          
          textneu = textneu.replace(/(https?:\/\/[a-zA-Z0-9\-\._\?&\/=]+)/gi,'<b><a href="$1">$1<\/a><\/b>'); // urls in html-links umwandeln
          textneu = textneu.replace(/\[(img|url|b|i|u|s|sub|sup|font=\S+|color=[#]?[a-zA-Z0-9]+|align=\S+|size=\S+)*?\]/gi,'');
          textneu = textneu.replace(/\[\/(img|url|b|i|u|s|sub|sup|font|color|align|size)*?\]/gi,'');
          allytexttd.innerHTML = textneu;
          this.removeEventListener('click',killBB,true);
        }
        
        var button = document.createElement("button");
        button.id = 'allybutton';
        button.textContent = lang["removebbcode"];
        button.style.marginLeft = '10px';
        var content = document.evaluate("/html/body/div[5]/div[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext();
        content.insertBefore(button,content.firstChild);
        document.getElementById("allybutton").addEventListener('click',killBB,true);
      }
    }
  }
}

// fleetlog
if ((document.URL.indexOf("/game/admin2/flottenlog.php") > -1)&& !(document.URL.indexOf("list=")>-1)) {    
  var user = document.URL.match(/uid=([0-9]+)/);
  user = user ? user[1] : '';

// show possible bash / push

  if (changefleetlog){
    var name = document.getElementsByTagName("h4")[0].firstChild.innerHTML; 
    var angriffszeile = document.evaluate("/html/body/div[5]/div[2]/div/table/tbody/tr[3]", document, null, XPathResult.ANY_TYPE, null).iterateNext();
    var transportzeile = document.evaluate("/html/body/div[5]/div[2]/div/table/tbody/tr[4]", document, null, XPathResult.ANY_TYPE, null).iterateNext();
    var transportehin = document.evaluate("/html/body/div[5]/div[2]/div/table/tbody/tr[4]/td[2]/center/a", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML;
    var transportezu = document.evaluate("/html/body/div[5]/div[2]/div/table/tbody/tr[4]/td[3]/center/a", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML;
    if (parseInt(angriffszeile.firstChild.nextSibling.firstChild.firstChild.innerHTML)== 0) 
      angriffszeile.firstChild.firstChild.style.color = '#00A000';


 // Push

    transportzeile.firstChild.firstChild.style.color = '#00A000';
    var eigenepunkte = document.getElementsByTagName("h4")[0].innerHTML.match(/\(([0-9]+)\)/)[1];
    var push = false;
    if (document.getElementsByTagName("tbody")[1]){
      var trs = document.getElementsByTagName("tbody")[1].getElementsByTagName("tr");
      var other = false;
      
      transportzeile.firstChild.firstChild.style.color = '#55aaff';
      for (var i=2; i < trs.length; i++){   
        var von = trs[i].getElementsByTagName("td")[5].firstChild.firstChild.innerHTML;
        var zu = trs[i].getElementsByTagName("td")[6].firstChild.firstChild.innerHTML;
        // only check rows of other players
        if (!(trs[i].getElementsByTagName("td")[1].innerHTML.indexOf(name) >-1)) {
          if ( von != 0 || zu != 0){
            other = true;
          }  
          var match = trs[i].firstChild.nextSibling.firstChild.innerHTML.match(/\(([0-9]+)\)/);
          if (match){
            var zeilenpunkte = match[1];
            // if foreign player has less points, 0 X may be push
            if (parseInt(eigenepunkte) > parseInt(zeilenpunkte)) {
              if( (von == 0) && (zu!=0)){
                trs[i].firstChild.nextSibling.firstChild.style.color ='#C00000';
                push = true;
              }
            }
            // if foreign player has more points, X 0 may be push
            if (parseInt(eigenepunkte) < parseInt(zeilenpunkte)) {
              if( (zu == 0) && (von!=0)){
                trs[i].firstChild.nextSibling.firstChild.style.color ='#C00000';
                push = true;
              }
            }
          }
        }
        if (i == trs.length-1){
          if (!other){
            transportzeile.firstChild.firstChild.style.color = '#00A000';
          }
          if(push) {
            transportzeile.firstChild.firstChild.style.color = '#C00000';
          }
        }
      }
      if (trs.length == 2){
        transportzeile.firstChild.firstChild.style.color = '#00A000';
      }
    }

// Bash

    if (document.getElementsByTagName("tbody")[1]){
      var trs = document.getElementsByTagName("tbody")[1].getElementsByTagName("tr");
      for (var i=2; i < trs.length; i++){
        if ( parseInt(trs[i].getElementsByTagName("td")[2].firstChild.firstChild.innerHTML) < 7){
          angriffszeile.firstChild.firstChild.style.color = '#00A000';
        }else{
          var defname =  trs[i].getElementsByTagName("td")[1].firstChild.innerHTML  ;
          if ((defname.indexOf('<font color="#FFED00">I</font>') == -1)&&(defname != 'unknown (0)')){
            angriffszeile.firstChild.firstChild.style.color = '#C00000';
            break;
          }
        }
      }
    }
    
// bash via moon destruction

    var destructionCount = parseInt(document.evaluate("/html/body/div[5]/div[2]/div/table/tbody/tr[9]/td[2]/center/a", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML);
    var destCell = document.evaluate("/html/body/div[5]/div[2]/div/table/tbody/tr[9]/td", document, null, XPathResult.ANY_TYPE, null).iterateNext()
    if(destructionCount > 6){
      destCell.firstChild.style.color = '#C00000';  
    }else{
      if(destructionCount == 0){
        destCell.firstChild.style.color = '#00A000';  
      }else{
        // may be bash if you account for normal attacks too
        if(destructionCount <= 6){
          destCell.firstChild.style.color = '#00FFFF';  
        }
      } 
    }            
  }
}


// login logs
if (document.URL.indexOf("/game/admin2/login_log.php?") > -1){
  // button to insert userID
  var user = document.URL.match(/uid=([0-9]+)/);
  if (user){
    user =user[1];
    if (user>0){
      var a = document.createElement("a");
      a.appendChild(document.createTextNode("    "+lang["userid"]));
      a.href='#';
      a.setAttribute('onclick','javascript:document.getElementsByName("user")[0].value='+user+';');
      document.getElementsByName("user")[0].parentNode.appendChild(a);
    }
  }
  if (changeloginlogs) {

// set login log days

    var starttag = document.getElementsByName("login_start_day")[0];
    var startmonat = document.getElementsByName("login_start_month")[0];
    var startjahr = document.getElementsByName("login_start_year")[0];
    var endtag = document.getElementsByName("login_end_day")[0];
    var endmonat = document.getElementsByName("login_end_month")[0];
    var mil = new Date().getTime();
    mil = mil - ipLogDays * 24 * 60 * 60 * 1000 ;
    var datumneu = new Date(mil);
    starttag.value = datumneu.getDate();
    startmonat.value = datumneu.getMonth()+1
    startjahr.value = datumneu.getFullYear();
    if (endtag.value <= 30){
      endtag.value = parseInt(endtag.value)+ 1;
    }else{
      endtag.value = 1;
      endmonat.value = parseInt(endmonat.value) + 1;
    }

//create short login log
// if there are more than 2 logins in a row with the same ip, only show first login and last login
// you can use any other ip location tool than utrace.de 
    var logtabelle = document.evaluate("/html/body/div[5]/div[2]/div/table/tbody", document, null, XPathResult.ANY_TYPE, null).iterateNext();
    var logtabelleclean = document.createElement("table");
    var tbody = document.createElement("tbody");
    var trs = logtabelle.getElementsByTagName("tr");
    for (var x = 1; x<trs.length; x++){
      var logins = trs[x].innerHTML.split("<br>");
      var loginsclean = new Array();
      logins[0] = logins[0].replace(/(\d+\.\d+\.\d+\.\d+)/, "<a href='http://www.utrace.de/?query=$1'>$1</a>") ;
      loginsclean[0] = logins[0];
      var j = 0;
      for (var i=1; i < logins.length-1; i++){
        if (logins[i].match(/\d+\.\d+\.\d+\.\d+/) && loginsclean[j].match(/\d+\.\d+\.\d+\.\d+/)){
          var normal = logins[i].match(/\d+\.\d+\.\d+\.\d+/)[0];
          var clean = loginsclean[j].match(/\d+\.\d+\.\d+\.\d+/)[0];
          logins[i] = logins[i].replace(/\d+\.\d+\.\d+\.\d+/, "<a href='http://www.utrace.de/?query="+normal+"'>"+normal+"</a>") ;
          if (clean != normal){
            loginsclean[j+1] = logins[i];
            loginsclean[j] = loginsclean[j]+'<br>'; ;
            j++;
          }else{
            if ((j>0)&&(loginsclean[j-1].match(/\d+\.\d+\.\d+\.\d+/)[0] == clean)){
              loginsclean[j] = logins[i];
            }else{
              loginsclean[j+1] = logins[i];
              loginsclean[j] = loginsclean[j]+'<br>';
              j++;
            }
          }
        }
      }
      var trneu = document.createElement("tr");
      var td = document.createElement("td");
      td.innerHTML = loginsclean;
      td.innerHTML = td.innerHTML.replace(/,/g, "");
      trneu.appendChild(td);
      tbody.appendChild(trneu);
      logtabelleclean.appendChild(tbody);
      logtabelleclean.style.color ='#55AAFF';
      var div = document.createElement("div");
      div.id = "logtabneu";
      div.appendChild(logtabelleclean);
      div.style.display = 'none';
    }
    logtabelle.parentNode.parentNode.insertBefore(div,logtabelle.parentNode);

    function showhidelog(){
      var b = document.getElementById("logtabneu"); 
      if (b.style.display =="none"){
        b.style.display = "block";
        this.textContent = lang["hideshortloginlog"];
      }else{
        b.style.display= "none";
        this.textContent = lang["showshortloginlog"];
      }
    }
    var button = document.createElement("button");
    button.id = 'iplogbutton';
    button.textContent = lang["showshortloginlog"];
    button.style.marginLeft = '10px';
    getElementsByClass("content")[2].insertBefore(button,getElementsByClass("content")[2].firstChild);
    document.getElementById("iplogbutton").addEventListener('click',showhidelog,true);

// add links to ip location tool in full login log
    var logtabelle = document.evaluate("/html/body/div[5]/div[2]/div/table/tbody", document, null, XPathResult.ANY_TYPE, null).iterateNext();
    var trs = logtabelle.getElementsByTagName("tr");
    for (var x = 1; x<trs.length; x++){
      var logins = trs[x].innerHTML.split("<br>");
      var loginsclean = new Array();
      for (var y = 0; y<logins.length-1; y++){
        logins[y] = logins[y].replace(/(\d+\.\d+\.\d+\.\d+)/, "<a href='http://www.utrace.de/?query=$1'>$1</a>") ;
        loginsclean[y] = logins[y]+'<br>';
      }
      trs[x].innerHTML = loginsclean;
      trs[x].innerHTML = trs[x].innerHTML.replace(/,/g,"");     
    }
    logtabelle.parentNode.style.color='#77B0FF';
  }
}

// alliance overview

if (document.URL.indexOf("/game/admin2/uebersicht.php?&allianz") > -1 ){
  if(changeallylist){
    //mark clicked alliances
    var ok = false;
    if (localStorage[server+'allyids']){
      // sort alliance ids
      var allys = new Array();
      allys = getVar(server+'allyids',0).split('|');
      var asd = new Array();
      for (var i = 0;i<allys.length;i++){
        asd[i] = parseInt(allys[i]);
      }
      setVar(server+'allyids',sort(asd).join('|'));
      allys = asd;

      function reset2(){
        var server = document.URL.match(/https?:\/\/([0-9a-zA-Z\-\._]+)/)[1];
        localStorage.removeItem(server+'allyids');
        location.reload();
      }
      
      var button = document.createElement("button");
      button.id = 'allybutton';
      button.textContent = lang["resetmarkings"];
      button.style.marginLeft = '10px';
      getElementsByClass("content")[2].insertBefore(button,getElementsByClass("content")[2].firstChild);
      document.getElementById("allybutton").addEventListener('click',reset2,true);
      ok = true;
    }
    var t = document.getElementsByTagName("tbody")[1];
    var a = t.getElementsByTagName("a");
    for (var j = 0;j<a.length; j++) {
      if (a[j].href.indexOf("/game/admin2/kontrolle.php?&aid=")>-1){
        var akt = a[j];
        var on = document.createAttribute("onclick");
        on.nodeValue = 'javascript:this.style.color = \'#FF0000\';'+
                       'var aaaa = new Array();var nichtdoppelt=true;'+
                       'var server = document.URL.match(/https?:\\/\\/([0-9a-zA-Z\-\._]+)\/)[1];'+
                       'if (localStorage[server+\'allyids\']){'+                           
                          'aaaa = localStorage[server+\'allyids\'].split(\'|\');'+
                          'for (var x=0;x<aaaa.length;x++){'+
                            'if (aaaa[x] == this.href.match(/id=([0-9]+)/)[1]){ nichtdoppelt=false;} }'+
                          'if (nichtdoppelt){'+
                            'aaaa.push(this.href.match(/id=([0-9]+)/)[1]);} }'+
                       'else{'+
                          'aaaa[0] = this.href.match(/id=([0-9]+)/)[1];}'+
                       'localStorage[server+\'allyids\'] = aaaa.join(\'|\');';
        akt.setAttributeNode(on);

      
        if (ok){
          var id = akt.href.match(/id=([0-9]+)/)[1];
          var index = search(allys,id);
          if (index > -1){
            akt.style.color = '#FF0000';
            if (index == 0){
              allys.shift();
            }else {
              allys = allys.slice(0,index).concat(allys.slice(index+1,allys.length));
            }
          }
        }
      }
    }
  }
}

// toplist
if (document.URL.indexOf("/game/admin2/toplist.php?") > -1){
  if (changetoplist){

// mark clicked users

    var ok = false;
    if (localStorage[server+'userids']){
      var users = new Array();
      users = getVar(server+'userids',0).split('|');
      var asd = new Array();
      for (var i = 0;i<users.length;i++){
        asd[i] = parseInt(users[i]);
      }
      setVar(server+'userids',sort(asd).join('|'));
      users = asd;

      function reset(){
        var server = document.URL.match(/https?:\/\/([0-9a-zA-Z\-\._]+)/)[1];
        localStorage.removeItem(server+'userids');
        location.reload();
      }
      
      var button = document.createElement("button");
      button.id = 'toplistbutton';
      button.textContent = lang["resetmarkings"];
      button.style.marginLeft = '10px';
      getElementsByClass("content")[2].insertBefore(button,getElementsByClass("content")[2].firstChild);
      document.getElementById("toplistbutton").addEventListener('click',reset,true);
      ok = true;
    }
    var t = document.getElementsByTagName("tbody")[0];
    var a = t.getElementsByTagName("a");
    for (var j = 0;j<a.length; j++) {
      if (a[j].href.indexOf("kontrolle.php")>-1){
        var akt = a[j];
        var on = document.createAttribute("onclick");
        on.nodeValue = 'javascript:this.style.color = \'#FF0000\';'+
                       'var aaaa = new Array();var nichtdoppelt=true;'+
                       'var server = document.URL.match(/https?:\\/\\/([0-9a-zA-Z\-\._]+)\/)[1];'+
                       'if (localStorage[server+\'userids\']){'+                           
                          'aaaa = localStorage[server+\'userids\'].split(\'|\');'+
                          'for (var x=0;x<aaaa.length;x++){'+
                            'if (aaaa[x] == this.href.match(/id=([0-9]+)/)[1]){ nichtdoppelt=false;} }'+
                          'if (nichtdoppelt){'+
                            'aaaa.push(this.href.match(/id=([0-9]+)/)[1]);} }'+
                       'else{'+
                          'aaaa[0] = this.href.match(/id=([0-9]+)/)[1];}'+
                       'localStorage[server+\'userids\'] = aaaa.join(\'|\');';
        akt.setAttributeNode(on);
        for (var k = 1;k<6; k++) {
          if (a[j+k].href.indexOf("flottenlog.php")>-1){
            var on2 = document.createAttribute("onclick");
            on2.nodeValue = 'javascript:this.parentNode.previousSibling.previousSibling.firstChild.style.color = \'#FF0000\';'+
              'var aaaa = new Array();var nichtdoppelt=true;'+
              'var server = document.URL.match(/https?:\\/\\/([0-9a-zA-Z\-\._]+)\/)[1];'+
              'if (localStorage[server+\'userids\']){'+
              'aaaa = localStorage[server+\'userids\'].split(\'|\');'+
              'for (var x=0;x<aaaa.length;x++){'+
              'if (aaaa[x] == this.href.match(/id=([0-9]+)/)[1]){ nichtdoppelt=false;} }'+
                              'if (nichtdoppelt){'+
              'aaaa.push(this.href.match(/id=([0-9]+)/)[1]);} }'+
              'else{'+
                              'aaaa[0] = this.href.match(/id=([0-9]+)/)[1];}'+
              'localStorage[server+\'userids\'] = aaaa.join(\'|\');';
            a[j+k].setAttributeNode(on2);
            break;
          }
        }

        if (ok){
          var id = akt.href.match(/id=([0-9]+)/)[1];
          var index = search(users,id);
          if (index > -1){
            akt.style.color = '#FF0000';
            if (index == 0){
              users.shift();
            }else {
              users = users.slice(0,index).concat(users.slice(index+1,users.length));
            }
          }
        }
      }
    }
  }
}

if (document.URL.indexOf("/game/admin2/vacation_log.php?") > -1){
// set the days of vacation log to 'vacationLogDays' days

    var starttag = document.getElementsByName("vacation_start_day")[0];
    var startmonat = document.getElementsByName("vacation_start_month")[0];
    var startjahr = document.getElementsByName("vacation_start_year")[0];
    var endtag = document.getElementsByName("vacation_end_day")[0];
    var endmonat = document.getElementsByName("vacation_end_month")[0];
    var mil = new Date().getTime();
    mil = mil - vacationLogDays * 24 * 60 * 60 * 1000 ;
    var datumneu = new Date(mil);
    starttag.value = datumneu.getDate();
    startmonat.value = datumneu.getMonth()+1
    startjahr.value = datumneu.getFullYear();
    if (endtag.value <= 30){
      endtag.value = parseInt(endtag.value)+ 1;
    }else{
      endtag.value = 1;
      endmonat.value = parseInt(endmonat.value) + 1;
     }
}

function setVar(name,wert) {
return localStorage.setItem(name, wert);
}


function getVar(key,def){
  var x = localStorage.getItem(key);
return x ? x:def;
}


function toBool(str){
if ("false" == str)
  return false;
if ("true" == str) 
  return str;
return null;  
}


function getElementsByClass (cName, domNode) {
  if (cName == undefined || cName.length == 0) return;
  if (domNode == undefined) domNode = document;
  if (domNode.getElementsByClassName)
      return domNode.getElementsByClassName(cName);
  cName = " " + cName + " "; 
  var elements = domNode.getElementsByTagName('*');
  var res = new Array();
  for (var i = 0; i < elements.length; i++) {
      var className = " " + elements[i].className + " ";
      if (className.indexOf(cName) > -1) {
          res.push(elements[i]);
      }
  }
  return res;
}


function setSettingValues(){  
document.getElementById("fleetlog").checked = changefleetlog;
document.getElementById("kontrolle").checked = changekontrollseite;
document.getElementById("loginlogs").checked = changeloginlogs;
document.getElementById("toplist").checked = changetoplist;
document.getElementById("klappshort").checked = changeklappshort;
document.getElementById("allylist").checked = changeallylist;
document.getElementById("ipLogDays").value = ipLogDays;
document.getElementById("vacationLogDays").value = vacationLogDays;
document.getElementById("scriptlanguage").value = language
}

function Numsort (a, b) {
return a - b;
}

function sort(intArray){
return intArray.sort(Numsort);
}

function infoboxInsert(element){
if (element){
  document.getElementById("ATscriptinfobox").appendChild(element);
  document.getElementById("ATscriptinfobox").appendChild(document.createElement("br"));
  document.getElementById("ATscriptinfobox").appendChild(document.createElement("br"));
}
}

/*checks if sortedIntArray contains int_
if true, returns the index of int_ , else -1
binary search*/
function search(sortedIntArray, int_){
var low = 0;
var up = sortedIntArray.length;
while(up-low != 0){
  if (int_ <= sortedIntArray[low+parseInt((up-low)/2)]){
     up = up - Math.ceil((up-low)/2.);
  }else{
     low = low + Math.ceil((up-low)/2.);
  }
}
if (up-low == 0 && sortedIntArray[low] == int_) return up;
else return -1;
}

// ==UserScript==
// @name           AT go quick link
// @description    Menu z linkami do narzędzi GO
// @author         pax
// @include        https://*.ogame.gameforge.com/game/admin2/*
// @grant          none
// @updateURL    https://github.com/Neshi/Og/raw/main/scripts/ATGoQuickLink.user.js
// @downloadURL  https://github.com/Neshi/Og/raw/main/scripts/ATGoQuickLink.user.js
// @version        7.5
// ==/UserScript==


var defaultScriptLanguage = "Pl";

var first = toBool(getVar("firsttime","true"));
if (first){
  setVar("scriptlanguage", defaultScriptLanguage);
}

//  var session = document.URL.match(/session=([0-9a-zA-Z]+)/)[1];
var urlreg = document.URL.match(/(^https?):\/\/([0-9a-zA-Z\-\._]+)\//);
var ogameProtocol = urlreg[1];
var server = urlreg[2];
var language = getVar("scriptlanguage", defaultScriptLanguage);;


var LANG_MAP = [];

  LANG_MAP["Pl"] = [];
LANG_MAP["Pl"]["ATTools"] = "ATTools";
  LANG_MAP["Pl"]["Anonimizer IP"] = "Anonimizer IP";
LANG_MAP["Pl"]["oPush"] = "oPush";
LANG_MAP["Pl"]["log_sort"] = "log_sort";
LANG_MAP["Pl"]["Board Pl"] = "Board Pl";
LANG_MAP["Pl"]["Surowce"] = "Surowce";

var supportedLanguages = ["Pl"];
if (supportedLanguages.indexOf(language) < 0)
  language = defaultScriptLanguage;
var lang = LANG_MAP[language];


//### left menu
var x = document.evaluate("/html/body/div[3]/div[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext();
if(x){
  var infodiv = document.createElement("div");
  infodiv.id ='ATscriptinfobox';
  infodiv.style.fontSize = 'small';
  x.appendChild(document.createElement("br"));
  x.appendChild(infodiv);

  var text = document.createTextNode(lang["ATTools"]);
  var a = document.createElement("a");
  a.href = "#";
  a.appendChild(text);
  a.setAttribute('onclick', 'javascript:window.open("https://ogamepl.comastuff.com/attools/", "ATTools");');
  infoboxInsert(a);

      var text = document.createTextNode(lang["Anonimizer IP"]);
  var a = document.createElement("a");
  a.href = "#";
  a.appendChild(text);
  a.setAttribute('onclick', 'javascript:window.open("https://art.comastuff.com/anonymous.php", "Anonimizer IP");');
  infoboxInsert(a);

  var text = document.createTextNode(lang["oPush"]);
  var a = document.createElement("a");
  a.href = "#";
  a.appendChild(text);
  a.setAttribute('onclick', 'javascript:window.open("https://art.comastuff.com/ogame/push.php", "oPush");');
  infoboxInsert(a);

  var text = document.createTextNode(lang["log_sort"]);
  var a = document.createElement("a");
  a.href = "#";
  a.appendChild(text);
  a.setAttribute('onclick', 'javascript:window.open("https://art.comastuff.com/ogame/log_sort.php", "log_sort");');
  infoboxInsert(a);
  
  var text = document.createTextNode(lang["Board Pl"]);
  var a = document.createElement("a");
  a.href = "#";
  a.appendChild(text);
  a.setAttribute('onclick', 'javascript:window.open("https://board.pl.ogame.gameforge.com/", "Board Pl");');
  infoboxInsert(a);
  
  var text = document.createTextNode(lang["Surowce"]);
  var a = document.createElement("a");
  a.href = "#";
  a.appendChild(text);
  a.setAttribute('onclick', 'javascript:window.open("https://art.comastuff.com/ogame/resources.php", "Surowce");');
  infoboxInsert(a);
}
        markCheckbox.setAttributeNode(on);

        usertab.firstChild.firstChild.appendChild(markCheckbox);'}';



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


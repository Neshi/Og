// ==UserScript==
// @name         Quick notes
// @version      2.7.1
// @description  Skrypt ten pozwala na szybsze dodawanie notatek, jeśli notatka będzie za długo podzieli ją. Automatycznie ją anonimizuje korzystając z https://art.comastuff.com/anonymous.php
// @author       v0ldem0rt, Neshi
// @match        http*://*.ogame.gameforge.com/game/admin2/seenotes.php?uid=*&notetyp=1*
// @updateURL    https://github.com/Neshi/Og/raw/main/scripts/QuickNotes.user.js
// @downloadURL  https://github.com/Neshi/Og/raw/main/scripts/QuickNotes.user.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==


//note page
if (document.URL.indexOf("/game/admin2/seenotes.php") > -1 && document.URL.indexOf("notetyp=1") > -1) {
    var addNote = document.createElement("div");
    var textareaValue = 'Insert note body here..';
    if (window.location.search.indexOf('quickMessage') > -1){
        const urlParams = new URLSearchParams(window.location.search);
        textareaValue = urlParams.get("quickMessage");
    }
    addNote.innerHTML = '<textarea placeholder="'+textareaValue+'" id="noteToSplit" style="width: 100%" rows="10"></textarea><button type="button" id="splittedNotesButton">Save notes</button>';
    document.evaluate("/html/body/div[5]/div[2]/div/h3", document, null, XPathResult.ANY_TYPE, null).iterateNext().appendChild(addNote);
    document.getElementById("splittedNotesButton").addEventListener('click',splitNoteString,true);

    
}

function getFirstLine(text) {
    var index = text.indexOf("\n");
    if (index === -1) index = undefined;
    return text.substring(0, index);
}

function splitNoteString() {
    var text = document.getElementById("noteToSplit").value;
    anonimizeNote(text);
}

function saveNote(text){
    var userid = document.URL.match(/uid=(\d+)/)[1];
    var headerText = getFirstLine(text);
    var array = text.split('\n');//wordwrap(text, 55000, '\n'); // text.match(/.{1,55000}(\s|$|\-)/g); //text.match(/(.|[\r\n]){1,55000}/g);
    let endArray = [];
    text = "";
    for(let i = 0; i<array.length; i++) {
        if((text.length + array[i].length) < 55000) {
            text += array[i] + "\n";
        } else {
            endArray.push(text);
            text = array[i] + "\n";
        }
    }
    endArray.push(text);
    if (endArray.length>1){
        let splittedHeader = headerText.split('\n');
        for(let j = 0; j < endArray.length; j++) {
            let hTxt = "(note " + (j+1).toString() + ")" + splittedHeader[0] + "\n";
            for(let k = 1; k < splittedHeader.length; k++)
                hTxt += splittedHeader[k];
            endArray[j] = hTxt + "\n" + endArray[j];
        }
    }
    for(let i = 0; i < endArray.length; i++) {
        var xhttp = new XMLHttpRequest();
        var FD  = new FormData();
        FD.append('add', '   Send   ');
        FD.append('notiz', endArray[i]);
        xhttp.open("POST",  "/game/admin2/note.php?addnew=1&uid=" + userid, false);
        xhttp.send(FD);
    }

    window.location.href = window.location.href + '&quickMessage=Note added successfully';
}

function anonimizeNote(note){

    GM_xmlhttpRequest({
        method: "POST",
        url: "https://art.comastuff.com/anonymous.php",
        headers:    {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "action=do&stuff="+encodeURIComponent(note)+"&noblank=1",
        onload: function(response){
                console.log(response);
                saveNote(response.responseText);
            }
    });
}
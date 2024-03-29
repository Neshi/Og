// ==UserScript==
// @name         SGO+ Support Helper
// @namespace    https://comastuff.com/
// @version      1.6
// @description  Skrypt ten przypisuje przy temacie nick operatora/ów bazując na informacjach jakie są umieszczone na stronie https://ogamepl.comastuff.com/ . Przy nieobsadzonych uniach nick nie jest dodawany. Dodaje również link przy kodach API w zgłoszeniach.
// @author       Neshi
// @match        https://coma.gameforge.com/ticket/index.php?page=tickets*
// @match        https://coma.gameforge.com/ticket/index.php?page=answer*
// @match        https://ogamepl.comastuff.com/
// @updateURL    https://github.com/Neshi/Og/raw/main/scripts/SGOSupportHelper.user.js
// @downloadURL  https://github.com/Neshi/Og/raw/main/scripts/SGOSupportHelper.user.js
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @icon         https://www.google.com/s2/favicons?domain=gameforge.com
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

function selectElementContents(el) {
    var body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(el);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
        }
    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg)
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err)
    }
    window.getSelection().removeAllRanges();
}

(function() {
'use strict';

let uniSettings = [];

if (window.location.hostname == 'ogamepl.comastuff.com'){
    let regex68 = /Universum 68 : (.*)/
    let regex = /^(\(([^)]+)\).*:(.*))/

    var lines = $('h3:contains("Operatorzy")').next().text().split('\n')
    var htmlLines = $('h3:contains("Operatorzy")').next().html().split('\n')

    for(let i=0;i<lines.length;i++){
        let line = lines[i].replace(' ','');
        let holiday = htmlLines[i] !== undefined ? htmlLines[i].indexOf('urlop')>0?' (u)':'':'';
        if (regex68.test(line)){
            let match = line.match(regex68)
            //console.log('key:68;value:'+match[1].replace(' ','')+holiday)
            uniSettings.push({
                key:'68',
                value:match[1].replace(/\s/g,'')+holiday
            });
        }
        if (regex.test(line)){
            let match = line.match(regex)
            //console.log('key:'+match[2]+';value:'+match[3].replace(' ','')+holiday)
            uniSettings.push({
                key:match[2],
                value:match[3].replace(/\s/g,'')+holiday
            });
        }
    }
    GM_deleteValue('uniSettings');
    GM_setValue('uniSettings',uniSettings);
}

if (window.location.hostname == 'coma.gameforge.com'){
    if (window.location.search.indexOf('page=answer')>0){
        let reportRegex = /[crsm]r-pl-\d{2,3}-[^.*]{40}/g;
        let prntScRegex = /prnt.sc\/\w*\b/g;
        let gyozoScRegex = /gyazo.com\/\w*\b/g;

        jQuery('table.nav div').each(function(){ 
            var match;
            var tdHtml = jQuery(this).html();
            var matches = [];
            if (reportRegex.test(tdHtml)){
                match = tdHtml.match(reportRegex);
                if (match){
                    matches.push(match[1]);
                    console.log(match[1]);
                }
                while (match = reportRegex.exec(tdHtml)){
                    matches.push(match[0]);
                }
                matches = matches.filter(function(item, pos) {
                    return matches.indexOf(item) == pos;
                });
                for(var i=0;i<matches.length;i++){
                    tdHtml = tdHtml.replace(matches[i],matches[i]+'&nbsp;<a href="https://nomoreangel.de/api-reader/?apiid='+matches[i]+'" target="_blank" title="Otwórz w nowym oknie API reader">(Przeglądaj)</a>')
                }
                jQuery(this).html(tdHtml);
            }

            matches = [];
            if (gyozoScRegex.test(tdHtml)){
                match = tdHtml.match(gyozoScRegex);
                if (match){
                    matches.push(match[1]);
                    console.log(match[1]);
                }
                while (match = gyozoScRegex.exec(tdHtml)){
                    matches.push(match[0]);
                }
                matches = matches.filter(function(item, pos) {
                    return matches.indexOf(item) == pos;
                });
                for(var i=0;i<matches.length;i++){
                    tdHtml = tdHtml.replace(matches[i],matches[i]+'&nbsp;<a href="//'+matches[i]+'" target="_blank" title="Otwórz w nowym oknie">(Przeglądaj)</a>')
                }
                jQuery(this).html(tdHtml);
            }

            matches = [];
            if (prntScRegex.test(tdHtml)){
                match = tdHtml.match(prntScRegex);
                if (match){
                    matches.push(match[1]);
                    console.log(match[1]);
                }
                while (match = prntScRegex.exec(tdHtml)){
                    matches.push(match[0]);
                }
                matches = matches.filter(function(item, pos) {
                    return matches.indexOf(item) == pos;
                });
                for(var i=0;i<matches.length;i++){
                    tdHtml = tdHtml.replace(matches[i],matches[i]+'&nbsp;<a href="//'+matches[i]+'" target="_blank" title="Otwórz w nowym oknie">(Przeglądaj)</a>')
                }
                jQuery(this).html(tdHtml);
            }
            
        });    
    }
    if (window.location.search.indexOf('page=tickets')>0 && window.location.search.indexOf('action=submit')<0){
        uniSettings = GM_getValue('uniSettings');
        if (uniSettings == undefined){
            $('body').append('<a target=\'_blank\' href=\'https://ogamepl.comastuff.com/\'>Przejdź na stronę Teamu, aby załadować operatorów.</a> Następnie odśwież tą stronę.')
        }
        //console.log(uniSettings);

        $('table table table tr:gt(2)').each(function(){
            let currentServerText = $(this).find('td:eq(2)').text();
            if (currentServerText != '00'){
                let go = uniSettings.find(x=>x.key==currentServerText);
                if (go != undefined && go.value.length>0){
                    $(this).find('td:eq(1)').append(' ('+go.value+')')
                }
            }
        });
    }
    if (window.location.search.indexOf('page=answer')>0 && window.location.search.indexOf('action=submit')>0){
        var params = new Proxy(new URLSearchParams(window.location.href), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
        //console.log(params.id);
        //console.log(params.value);
        jQuery('table.nav:first tr:first').after('<tr><td>&nbsp;</td><td class="text"><a href="https://coma.gameforge.com/ticket/index.php?page=answer&action=view&id='+params.id+'&value='+params.value+'&preview=1">Przejdź do podglądu zgłoszenia</a></td></tr>')

    }
    if (window.location.search.indexOf('page=answer')>0 && window.location.search.indexOf('preview=1')>0){

        jQuery('head').append('<style>button.copyResult { cursor:pointer; background-color: #aabeca; height: 17px;  font-size: 10px; background-image: none; padding: 2px 5px 2px 5px; float: left;  border: 1px solid #676767;} button.copyResult:hover {  background-color: #fff;}</style>')

        var content = '<div id="toBeCopied"></div>';
        jQuery('body>div>table>tbody>tr:eq(1)>td>table>tbody>tr:eq(2)>td>*').not('ul').wrapAll(content);
        jQuery('body>div>table>tbody>tr:last>td>table tr:first').before('<tr><td class="text">&nbsp;</td></tr>');
        jQuery('body>div>table>tbody>tr:last>td>table').clone().appendTo('#toBeCopied');
        jQuery('body>div>table>tbody>tr:last>td>table').remove();

        jQuery('body>div>table>tbody>tr:eq(1)>td>table>tbody>tr:eq(2)>td> #qm0 .qmclear').before('<li><button class="copyResult" type="button" style="float:right;margin-bottom:5px;" >Kopiuj Zawartość!</button></li>')

        jQuery('button.copyResult').click(function() {
            selectElementContents( document.getElementById('toBeCopied') );
        });
    }
}
})();
// ==UserScript==
// @name         SGO+ Support Helper
// @namespace    https://comastuff.com/
// @version      0.4
// @description  Skrypt ten przypisuje przy temacie nick operatora/ów bazując na informacjach jakie są umieszczone na stronie https://ogamepl.comastuff.com/ . Przy nieobsadzonych uniach nick nie jest dodawany.
// @author       Neshi
// @match        https://coma.gameforge.com/ticket/index.php?page=tickets*
// @match        https://ogamepl.comastuff.com/
// @updateURL    https://github.com/Neshi/Og/raw/main/scripts/SGOSupportHelper.user.js
// @downloadURL  https://github.com/Neshi/Og/raw/main/scripts/SGOSupportHelper.user.js
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @icon         https://www.google.com/s2/favicons?domain=gameforge.com
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

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
        uniSettings = GM_getValue('uniSettings');
        if (uniSettings == undefined){
            $('body').append('<a target=\'_blank\' href=\'https://ogamepl.comastuff.com/\'>Przejdź na stronę Teamu, aby załadować operatorów.</a> Następnie odśwież tą stronę.')
        }
        //console.log(uniSettings);

        $('table table table tr:gt(2)').each(function(){
            let currentServerText = $(this).find('td:eq(2)').text();
            let go = uniSettings.find(x=>x.key==currentServerText).value;
            if (go.length>0){
                $(this).find('td:eq(1)').append(' ('+go+')')
            }
        });
    }
})();
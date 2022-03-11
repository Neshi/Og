// ==UserScript==
// @name         Copy helper
// @namespace    https://comastuff.com/
// @version      0.2
// @description  Skrypt ten pozwala na szybsze kopiowanie danych w profilu użytkownika
// @author       Neshi
// @match        https://*.ogame.gameforge.com/game/admin2/kontrolle.php?uid=*
// @match        https://*.ogame.gameforge.com/game/admin2/login_log.php?uid=*
// @icon         https://support.gameforge.com/template/games/ogame/favicon.ico
// @updateURL    https://github.com/Neshi/Og/raw/main/scripts/CopyHelper.user.js
// @downloadURL  https://github.com/Neshi/Og/raw/main/scripts/CopyHelper.user.js
// @grant        none
// ==/UserScript==

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg)
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err)
    }
    document.body.removeChild(textArea)
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!')
    }, function(err) {
        console.error('Async: Could not copy text: ', err)
    })
}

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


if ($('form[action*="kontrolle.php"]').length > 0){
    $('form[action*="kontrolle.php"] table tr:eq(0) th').append('<button class="copyNick" type="button" style="margin-left:20px">Kopiuj nick</<button> <button class="copyZWG" type="button" style="margin-left:20px">Kopiuj do ZWG</<button> <button class="copyProfile" type="button" style="margin-left:20px">Kopiuj profil</<button>')

    $('button.copyNick').click(function() {
        copyTextToClipboard($('form[action*="kontrolle.php"] table tr:eq(0) th').get(0).firstChild.nodeValue);
    });

    $('button.copyZWG').click(function() {
        copyTextToClipboard($('form[action*="kontrolle.php"] table tr:eq(0) th').get(0).firstChild.nodeValue +' ('+ $('form[action*="kontrolle.php"] table tr:eq(1) td:last').text()+')');
    });

    $('.textbox').attr('id','profileData');

    $('button.copyProfile').click(function() {
        selectElementContents( document.getElementById('profileData') );
    });
}

//login table
if ($('.textbox table:eq(1) tr').length > 2 ){
    $('.textbox table:eq(1)').attr('id','loginTable');
    $('.textbox table:eq(1) tr:eq(0)').remove();
    $('.textbox table:eq(1)').before('<button class="copyTable" type="button" style="float:right;margin-bottom:5px;" >Kopiuj tabele!</button>')

    $('button.copyTable').click(function() {
        selectElementContents( document.getElementById('loginTable') );
    });
}


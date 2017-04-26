// ==UserScript==
// @name         Highlight
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *
// @grant        none
// ==/UserScript==

var WorldMarket = [];

function main() {
    window.onkeypress = function(event) {
        if (event.keyCode == 49 ) {
            post(); }
        else if (event.keyCode == 50) {
            show();
        }
    };
}


function post() {
    for (i = 0; i < 16; i++) {
        var element = document.getElementById('itemSel');
        element.value = i + 1;
        document.getElementsByClassName("searchBtn bv_button bv_small_font")[0].click();
        setInterval(grab, 5000);
        setTimeout(grab, 5000);
    }
}

function grab() {
    for (i = 1; i < document.getElementById("displayResults").childNodes[4].childElementCount; i++) {
        var PriceSearch = parseInt(document.getElementById('displayResults').childNodes[4].childNodes[i].childNodes[0].childNodes[1].childNodes[2].innerHTML.replace(/[^\d]/g, ''));
        var NameSearch = document.getElementById('displayResults').childNodes[4].childNodes[i].childNodes[0].childNodes[0].innerHTML;
        var pos = NameSearch.indexOf("["); var pos2 = NameSearch.indexOf("]");
        var NameSearchC = NameSearch.slice(pos + 1, pos2);
        WorldMarket.push([NameSearchC,PriceSearch,]);
    }

}
function show() {
    WorldMarket.sort(compareSecondColumn);
    for (var i = 0; i < WorldMarket.length; i++) {
        console.log(WorldMarket[i][0] + " " + WorldMarket[i][1]);
    }
}


function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}
main();


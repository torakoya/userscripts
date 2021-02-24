// ==UserScript==
// @name         Google Direct Links
// @namespace    http://y.ps.st/
// @version      0.1
// @description  Prevent Google from changing link addresses on right-click
// @author       Yoichiro Takahashi
// @match        *://www.google.com/search?*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    document.querySelectorAll("#search a[onmousedown]").forEach(e => {
        e.removeAttribute("onmousedown");
    });
})();

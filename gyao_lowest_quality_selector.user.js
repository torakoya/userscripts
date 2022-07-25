// ==UserScript==
// @name         Gyao Lowest Quality Selector
// @namespace    http://y.ps.st/
// @version      0.1
// @description  Select the lowest-quality video on Gyao
// @author       Yoichiro Takahashi
// @match        *://gyao.yahoo.co.jp/episode/*
// @match        *://gyao.yahoo.co.jp/title/*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    let o = new MutationObserver(mutations => {
        mutations.forEach(m => {
            // "lowest" will probably always exist.
            let e = m.target.querySelector("[data-quality-type=lowest]");
            if (e) {
                e.click();
                o.disconnect();
            }
        });
    });

    let e = document.querySelector(".gyao-player");
    if (e) {
        o.observe(e, {subtree: true, childList: true});
    }
})();

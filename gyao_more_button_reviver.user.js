// ==UserScript==
// @name         Gyao More Button Reviver
// @namespace    http://y.ps.st/
// @version      0.1
// @description  Revive the More buttons that disappear on error in the new arrivals pages on Gyao by pressing Ctrl+Meta+M
// @author       Yoichiro Takahashi
// @match        *://gyao.yahoo.co.jp/arrivals
// @match        *://gyao.yahoo.co.jp/arrivals/*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    document.addEventListener("keydown", event => {
        if (event.code == "KeyM" && event.ctrlKey && event.metaKey) {
            let ee = document.querySelectorAll(".video-list-lazy.is-ended");
            for (let e of ee) {
                e.classList.remove("is-ended");
                e.lazyLoader.state.requestTimes--;
            }
        }
    });
})();

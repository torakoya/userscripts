// ==UserScript==
// @name         Gyao More Button Reviver
// @namespace    http://y.ps.st/
// @version      0.1
// @description  Revive the More buttons that disappear on error in the new arrivals pages on Gyao
// @author       Yoichiro Takahashi
// @match        *://gyao.yahoo.co.jp/arrivals
// @match        *://gyao.yahoo.co.jp/arrivals/*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    let o = new MutationObserver(mutations => {
        mutations.forEach(m => {
            let e = m.target;
            if (e.classList.contains("is-ended") && !e.classList.contains("is-loading")) {
                e.classList.remove("is-ended");
                e.lazyLoader.state.requestTimes--;
                alert("The More button has been shown again by force. It was hidden, which means a server error occurred or you reached the end of the list.");
            }
        });
    });

    let ee = document.querySelectorAll(".video-list-lazy");
    for (let e of ee) {
        o.observe(e, {attributes: true});
    }
})();

// ==UserScript==
// @name         Gyao Clickable Current Video
// @namespace    http://y.ps.st/
// @version      0.1
// @description  Make the current video in the video list clickable. Useful for moving from /title/ to /episode/.
// @author       Yoichiro Takahashi
// @match        *://gyao.yahoo.co.jp/episode/*
// @match        *://gyao.yahoo.co.jp/title/*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    let o = new MutationObserver(mutations => {
        mutations.forEach(m => {
            let e = m.target.querySelector(".video-list-item.is-current");
            if (e) {
                e.style.pointerEvents = "auto";
            }
        });
    });

    let ee = document.querySelectorAll(".video-list");
    for (let e of ee) {
        o.observe(e, {subtree: true, childList: true});
    }
})();

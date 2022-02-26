// ==UserScript==
// @name         Gyao Review Site Links
// @namespace    http://y.ps.st/
// @version      0.1
// @description  Add links to review sites on Gyao video pages
// @author       Yoichiro Takahashi
// @match        *://gyao.yahoo.co.jp/episode/*
// @match        *://gyao.yahoo.co.jp/title/*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    let series = get_series_info();
    switch (series.category) {
    case "anime":
        add_google_link("Anikore", [series.title, "site:anikore.jp"]);
        add_google_link("MyAnimeList", [series.title, "site:myanimelist.net"]);
        add_google_link("Amazon", [series.title, "site:amazon.co.jp", "prime", "アニメ"]);
        add_google_link("Wikipedia", [series.title, "site:ja.wikipedia.org", "アニメ"]);
        break;
    case "movie":
        add_google_link("Filmarks", [series.title, "site:filmarks.com", "-inurl:spoiler", "映画"]);
        add_google_link("Amazon", [series.title, "site:amazon.co.jp", "prime"]); // "映画" isn't included in the pages
        add_google_link("Wikipedia", [series.title, "site:ja.wikipedia.org", "映画"]);
        break;
    case "tv":
    case "drama":
        add_google_link("Filmarks", [series.title, "site:filmarks.com", "-inurl:spoiler", "ドラマ"]);
        add_google_link("Amazon", [series.title, "site:amazon.co.jp", "prime", "ドラマ"]);
        add_google_link("Wikipedia", [series.title, "site:ja.wikipedia.org", "ドラマ"]);
        break;
    }
    add_google_link("Google", [series.title]);

    function add_google_link(label, keywords) {
        let s = document.querySelector(".video-titles");
        let a = document.createElement("a");
        a.setAttribute(
            "href",
            "https://www.google.com/search?q=" +
                keywords.map(e => encodeURIComponent(e.replace(/(\s)-/g, "$1")))
                    .join("+").replace(/^-/, ""));
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
        a.append(`[${label}]`);
        s.parentNode.appendChild(a);
    }

    function get_series_info() {
        let category, title;

        let ee = document.querySelectorAll(".breadcrumb-list-item-link");
        for (let e of ee) {
            if (!category) {
                let found = e.href.match(/\/titles\/([^/]+)/);
                if (found) {
                    category = found[1];
                }
            }
            if (!title) {
                if (e.href.search(/\/title\//) != -1) {
                    title = normalize_title(e.innerText);
                }
            }
        }
        return {category, title};
    }

    function normalize_title(title) {
        return title.replace(/（R15[+＋]）$/, "")
            .replace("[B-ch]", ""); // Bandai Channel
    }
})();

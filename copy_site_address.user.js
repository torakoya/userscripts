// ==UserScript==
// @name         Copy Site Address
// @namespace    http://y.ps.st/
// @version      0.1
// @description  Copy the title and the URL by Ctrl+Meta+C
// @author       Yoichiro Takahashi
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    function reportSuccess(str) {
        alert("(Copied!)\n" + str);
    }

    function reportFailure(str) {
        // Avoid alert(), whose content can't be copied with some browsers
        prompt("Copy failed", str);
    }

    // Clipboard API is the up-to-date way but doesn't work on http://
    function copyByClipboardApi(str) {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(str);
        } else {
            return Promise.reject(new Error("navigator.clipboard doesn't exist"));
        }
    }

    // execCommand is deprecated but works even on http://
    function copyByExecCommand(str) {
        let e = document.createElement("textarea");
        e.value = str;
        e.style.position = "fixed";
        document.body.appendChild(e);
        e.focus();
        e.select();
        try {
            return document.execCommand("copy");
        } catch (ex) {
            return false;
        } finally {
            document.body.removeChild(e);
        }
    }

    document.addEventListener("keydown", event => {
        if (event.code == "KeyC" && event.ctrlKey && event.metaKey) {
            let s = document.title + "\n" + document.URL;
            copyByClipboardApi(s)
                .then(value => reportSuccess(s))
                .catch(reason => {
                    if (copyByExecCommand(s)) {
                        reportSuccess(s);
                    } else {
                        reportFailure(s);
                    }
                });
        }
    }, true);
})();

/* flatpickr v4.5.2, @license MIT */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.scrollPlugin = factory());
}(this, (function () { 'use strict';

    function delta(e) {
        return Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY));
    }
    const scroll = (e) => {
        e.preventDefault();
        const ev = new CustomEvent("increment", {
            bubbles: true,
        });
        ev.delta = delta(e);
        e.target.dispatchEvent(ev);
    };
    function scrollMonth(fp) {
        return (e) => {
            e.preventDefault();
            const mDelta = delta(e);
            fp.changeMonth(mDelta);
        };
    }
    function scrollPlugin() {
        return function (fp) {
            const monthScroller = scrollMonth(fp);
            return {
                onReady() {
                    if (fp.timeContainer) {
                        fp.timeContainer.addEventListener("wheel", scroll);
                    }
                    fp.yearElements.forEach(yearElem => yearElem.addEventListener("wheel", scroll));
                    fp.monthElements.forEach(monthElem => monthElem.addEventListener("wheel", monthScroller));
                },
                onDestroy() {
                    if (fp.timeContainer) {
                        fp.timeContainer.removeEventListener("wheel", scroll);
                    }
                    fp.yearElements.forEach(yearElem => yearElem.removeEventListener("wheel", scroll));
                    fp.monthElements.forEach(monthElem => monthElem.removeEventListener("wheel", monthScroller));
                },
            };
        };
    }

    return scrollPlugin;

})));

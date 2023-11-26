import { Tablist } from "https://cdn.jsdelivr.net/npm/jolty/dist/jolty.esm.min.js";


Tablist.data("navigation", (tablist) => {
    const marker = tablist.firstElementChild;

    const setMarker = (tab) => {
    marker.style.width = tab.offsetWidth + "px";
    marker.style.translate = tab.offsetLeft + "px";
    };

    return {
    data: "ui-tabs",
    on: {
        show(instance, { tab }) {
        setMarker(tab);
        }
    }
    };
});

Tablist.initAll();
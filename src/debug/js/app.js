var isOpen = false;

var resources = [];

function OpenResource(resourceName) {
    if (!resources.includes(resourceName)) return;
    console.log("Opening resource " + resourceName);
}

function ListenSearchInput() {
    $("#search-resource-input").on("input", () => {
        const input = $("#search-resource-input").val();
        if (input.length < 0) return;
        const filtered = resources.filter(resource => resource.toLowerCase().includes(input.toLowerCase()));
        $("#resources-content").html("");
        filtered.forEach(resource => {
            $("#resources-content").append(`
            <div class="box" id="resource-list-${resource}">
                <div class="grid--box">
                    <div class="adjust">
                        <div class="flex">
                            <p style="margin: 0;">${resource}</p>
                            <p class="desc">Script that manage all connections and querys to the
                                database. </p>
                        </div>
                    </div>
                    <div class="right--icon">
                        <lord-icon class="icon--box" src="https://cdn.lordicon.com/svpxtchp.json"
                            trigger="hover" colors="primary:#858585">
                        </lord-icon>
                    </div>
                </div>
            </div>`);

            $("#resource-list-" + resource).click(() => {
                OpenResource(resource);
            });
        });
    });
}

function LoadResources(rscs) {
    resources = rscs;
    rscs.forEach(resource => {
        $("#resources-content").append(`
        <div class="box" id="resource-list-${resource}">
            <div class="grid--box">
                <div class="adjust">
                    <div class="flex">
                        <p style="margin: 0;">${resource}</p>
                        <p class="desc">Script that manage all connections and querys to the
                            database. </p>
                    </div>
                </div>
                <div class="right--icon">
                    <lord-icon class="icon--box" src="https://cdn.lordicon.com/svpxtchp.json"
                        trigger="hover" colors="primary:#858585">
                    </lord-icon>
                </div>
            </div>
        </div>`);

        $("#resource-list-" + resource).click(() => {
            OpenResource(resource);
        });
    });
}

function OpenUI(state) {
    $("#main-container").css("display", state ? "" : "none");
    $("#body").css("background-color", state ? "#00000087" : "");
    if (!state)
        $.post("https://ice_mysql/closeDebugUI", {});
    isOpen = state;
}

// LoadResources(["ice_gym", "ice_core", "ice_hud", "ice_callbacks", "ice_vehicleshop"]);
// ListenSearchInput();

$(document).ready(function () {
    window.addEventListener("message", function (event) {
        if (event.data.action == undefined) return;
        switch (event.data.action) {
            case "open":
                OpenUI(true);
                break;
        }
    })
    window.addEventListener("keydown", function (event) {
        if (event.key == "Escape" && isOpen) {
            OpenUI(false);
        }
    })
})
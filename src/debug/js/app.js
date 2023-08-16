var isOpen = false;

var resources = [];

var queries = [
    {
        resourceName: "ice_gym",
        type: "query",
        db: "1",
        query: "SELECT * FROM `gym` WHERE `id` = @id ",
        values: { id: 1 },
        time: 0.512,
        currentTimestamp: Date.now(),
        cache: true
    },
    {
        resourceName: "ice_gym",
        type: "query",
        db: "1",
        query: "SELECT * FROM `gym` WHERE `id` = @id ",
        values: { id: 1 },
        time: 0.512,
        currentTimestamp: Date.now(),
        cache: true
    },
    {
        resourceName: "ice_gym",
        type: "query",
        db: "1",
        query: "SELECT * FROM `gym` WHERE `id` = @id ",
        values: { id: 1 },
        time: 0.512,
        currentTimestamp: Date.now(),
        cache: true
    },
    {
        resourceName: "ice_gym",
        type: "query",
        db: "1",
        query: "SELECT * FROM `gym` WHERE `id` = @id ",
        values: { id: 1 },
        time: 0.512,
        currentTimestamp: Date.now(),
        cache: true
    },
    {
        resourceName: "ice_gym",
        type: "query",
        db: "1",
        query: "SELECT * FROM `gym` WHERE `id` = @id ",
        values: { id: 1 },
        time: 0.512,
        currentTimestamp: Date.now(),
        cache: true
    },
    {
        resourceName: "ice_gym",
        type: "query",
        db: "1",
        query: "SELECT * FROM `gym` WHERE `id` = @id ",
        values: { id: 1 },
        time: 0.512,
        currentTimestamp: Date.now(),
        cache: true
    },
    {
        resourceName: "ice_gym",
        type: "query",
        db: "1",
        query: "SELECT * FROM `gym` WHERE `id` = @id ",
        values: { id: 1 },
        time: 0.512,
        currentTimestamp: Date.now(),
        cache: true
    },
    {
        resourceName: "ice_gym",
        type: "query",
        db: "1",
        query: "SELECT * FROM `gym` WHERE `id` = @id ",
        values: { id: 1 },
        time: 0.512,
        currentTimestamp: Date.now(),
        cache: true
    },
    {
        resourceName: "ice_gym",
        type: "query",
        db: "1",
        query: "SELECT * FROM `gym` WHERE `id` = @id ",
        values: { id: 1 },
        time: 0.512,
        currentTimestamp: Date.now(),
        cache: true
    },
    {
        resourceName: "ice_gym",
        type: "query",
        db: "1",
        query: "SELECT * FROM `gym` WHERE `id` = @id ",
        values: { id: 1 },
        time: 0.512,
        currentTimestamp: Date.now(),
        cache: true
    },
    {
        resourceName: "ice_gym",
        type: "query",
        db: "1",
        query: "SELECT * FROM `gym` WHERE `id` = @id ",
        values: { id: 1 },
        time: 0.512,
        currentTimestamp: Date.now(),
        cache: true
    }
]

function LoadStats() {
    var data = {
        queries: 150,
        slowQueries: 10,
        timeQueries: 0.74,
        timeQuerying: 9.28,
        scripts: 10,
        databasesUsed: 2,
        failedQueries: 1
    }
    $("#statsQueries").html("Queries: " + data.queries);
    $("#statsSlowQueries").html("Slow queries: " + data.slowQueries);
    $("#statsAverageQueries").html("Average queries: " + data.timeQueries + "ms");
    $("#statsTimeQuerying").html("Time querying: " + data.timeQuerying + " s");
    $("#statsScripts").html("Scripts: " + data.scripts);
    $("#statsDBCount").html("Databases used: " + data.databasesUsed);
    $("#statsFailedQueries").html("Failed queries: " + data.failedQueries);
}

function CloseResourceModal() {
    $(".popup_container").removeClass("animate__fadeInUp");
    $(".popup_container").addClass("animate__fadeOutDown");
    $("#resourceModal").removeClass("--active");
    $("#resourceModal").addClass("--hide");
    setTimeout(() => {
        $("#resourceModal").removeClass("--hide");
        $("#resourceModal").css("display", "none");
    }, 500);
}

function OpenResource(resourceName) {
    if (!resources.includes(resourceName)) return;
    $(".popup_container").removeClass("animate__fadeOutDown");
    $("#resourceModal").css("display", "");
    $("#resourceModal").addClass("--active");
    $("#resourceModalTitle").html(resourceName);
    setTimeout(() => {
        $(".popup_container").addClass("animate__fadeInUp");
    }, 100);
    var resourceQueries = queries.filter(query => query.resourceName == resourceName);
    console.log("resourceQueries: ", resourceQueries);
    $("#resourceModalBody").html("");
    resourceQueries.forEach(query => {
        $("#resourceModalBody").append(`
            <tr>
                <td id="dbid">${query.cache ? '<i class="fa-solid fa-memory"></i> ' : ''}${query.db}</td>
                <td id="query">${query.query}</td>
                <td id="values">${JSON.stringify(query.values)}</td>
                <td id="time">${query.time} ms</td>
            </tr>
        `)
    });
}

function ListenSearchInput() {
    $("#inputBox").on("input", () => {
        const input = $("#inputBox").val();
        if (input.length < 0) return;
        // console.log(resources)
        const filtered = resources.filter(resource => resource.name.toLowerCase().includes(input.toLowerCase()));
        $("#resources-content").html("");
        filtered.forEach(resource => {
            $("#resources-content").append(`
            <div class="box" id="resource-list-${resource.name}">
                <div class="grid--box">
                    <div class="adjust">
                        <div class="flex">
                            <p style="margin: 0;">${resource.name}</p>
                            <p class="desc">${resource.description}</p>
                        </div>
                    </div>
                    <div class="right--icon">
                        <lord-icon class="icon--box" src="https://cdn.lordicon.com/svpxtchp.json"
                            trigger="hover" colors="primary:#858585">
                        </lord-icon>
                    </div>
                </div>
            </div>`);

            $("#resource-list-" + resource.name).click(() => {
                OpenResource(resource.name);
            });
        });
    });
}

function LoadResources(rscs) {
    resources = rscs;
    rscs.forEach(resource => {
        $("#resources-content").append(`
        <div class="box" id="resource-list-${resource.name}">
            <div class="grid--box">
                <div class="adjust">
                    <div class="flex">
                        <p style="margin: 0;">${resource.name}</p>
                        <p class="desc">${resource.description}</p>
                    </div>
                </div>
                <div class="right--icon">
                    <lord-icon class="icon--box" src="https://cdn.lordicon.com/svpxtchp.json"
                        trigger="hover" colors="primary:#858585">
                    </lord-icon>
                </div>
            </div>
        </div>`);

        $("#resource-list-" + resource.name).click(() => {
            OpenResource(resource.name);
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

LoadResources([
    {
        "name": "testing-mysql",
        "description": "Script that manage all connections and querys to the database."
    }
]);
ListenSearchInput();

$(document).ready(function () {
    LoadStats();
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
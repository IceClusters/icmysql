var isOpen = false;
const Colors = {
    // "danger": "#ca0a0a1c",
    // "warn": "#ffb3001c",
    // "success": "#8bff001c",
    // "info": "#0034ff1c"
}
const mainSection = "section__buttons"
const sections = [
    "section__resources",
    "section__dbs",
    "section__logs",
    "section__cache",
    "section__backup",
]

const dbs = [
    {
        id: "1",
        orm: false,
        type: "mysql",
        time: 23.62
    }
]

var resources = [];

var queries = [
    {
        resourceName: "ice_gym",
        type: "query",
        db: "1",
        query: "SELECT * FROsM `gym`",
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
        query: "SELECT * FROM `gym` WHERE `id` = @id AND `name` = @name AND `lastname` = @lastname AND `age` = @age AND `city` = @city AND `address` = @address AND `phone` = @phone AND `email` = @email ",
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

function ReduceText(text) {
    if (text.length <= 47) return text;
    return text.substr(0, 47) + "...";
}

function LoadStats() {
    var data = {
        queries: 700,
        slowQueries: 40,
        timeQueries: 800,
        timeQuerying: 50,
        scripts: 20,
        databasesUsed: 2,
        failedQueries: 5
    }
    $("#statsQueries").html("Queries: " + data.queries);
    $("#statsQueries").css("border-color", data.queries >= 1000 ? Colors.danger : data.queries >= 500 ? Colors.warn : Colors.success)

    $("#statsSlowQueries").html("Slow queries: " + data.slowQueries);
    $("#statsSlowQueries").css("border-color", data.slowQueries >= 40 ? Colors.danger : data.slowQueries >= 15 ? Colors.warn : Colors.success)

    $("#statsAverageQueries").html("Average queries: " + data.timeQueries + "ms");
    $("#statsAverageQueries").css("border-color", data.timeQueries >= 1000 ? Colors.danger : data.timeQueries >= 300 ? Colors.warn : Colors.success)

    $("#statsTimeQuerying").html("Time querying: " + data.timeQuerying + " s");
    $("#statsTimeQuerying").css("border-color", data.timeQuerying >= 100 ? Colors.danger : data.timeQuerying >= 50 ? Colors.warn : Colors.success)

    $("#statsScripts").html("Scripts: " + data.scripts);
    $("#statsScripts").css("border-color", data.scripts >= 40 ? Colors.danger : data.scripts >= 30 ? Colors.warn : Colors.success)

    $("#statsDBCount").html("Databases used: " + data.databasesUsed);
    $("#statsDBCount").css("border-color", data.databasesUsed >= 4 ? Colors.danger : data.databasesUsed > 2 ? Colors.warn : Colors.success)

    $("#statsFailedQueries").html("Failed queries: " + data.failedQueries);
    $("#statsFailedQueries").css("border-color", data.failedQueries >= 10 ? Colors.danger : data.failedQueries >= 5 ? Colors.warn : Colors.success)
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
    let exist = false;
    for (let i = 0; i < resources.length; i++) {
        if (resources[i].name == resourceName) {
            exist = true;
            break;
        }
    }
    if (!exist) return;
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
                <td id="query">${ReduceText(query.query)}</td>
                <td id="values">${ReduceText(JSON.stringify(query.values))}</td>
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

function LoadDBs() {
    for (let i = 0; i < dbs.length; i++) {
        const db = dbs[i];
        var lastUse = null;
        queries.forEach(element => {
            if (element.db == db.id) {
                lastUse = element.currentTimestamp;
            }
        });

        $("#dbs-content").append(`
            <div class="boxdb" id="resource-list-ice_gym">
                <div class="column">
                    <div class="icon__db">
                        <lord-icon class="icon--box" src="https://cdn.lordicon.com/wjrtlwtp.json"
                            trigger="loop"
                            colors="primary:#08a88a,secondary:#646e78,tertiary:#3a3347,quaternary:#ffc738">
                        </lord-icon>
                        <p style="margin: 0;">Database #${db.id}</p>
                    </div>
                    <div class="adjust-content">
                        <div class="row ">
                            <div class="column justify-content align-item">
                                <p class="desc desc--db">2023-07-10 11:48:53</p>
                                <p class="desc desc--db sub">Last Use</p>
                            </
                            <div class="column justify-content align-item">
                                <p class="desc desc--db">${db.time} ms</p>
                                <p class="desc desc--db sub">Connection Time</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        `)
    }
}

function GoBack() {
    sections.forEach(element => {
        $(`#${element}`).css("display", "none");
    });
    $(`#${mainSection}`).css("display", "flex");
}

function OpenSection(sec) {
    $(`#${mainSection}`).css("display", "none");
    $(`#${sec}`).css("display", "flex");
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
        "name": "ice_gym",
        "description": "Script that manage all connections and querys to the database."
    },
    {
        "name": "ice_hud",
        "description": "Script that manage all connections and querys to the database."
    }
]);
ListenSearchInput();

$(document).ready(function () {
    LoadStats();
    LoadDBs();
    // Only for testing
    OpenSection("section__backup")

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
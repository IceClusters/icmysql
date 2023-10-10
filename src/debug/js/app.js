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
var queries = [];

var resources = [];

function ReduceText(text, max) {
    if (text.length <= max) return text;
    return text.substr(0, max) + "...";
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
    $("#resourceModalBody").html("");
    resourceQueries.forEach(query => {
        $("#resourceModalBody").append(`
            <tr>
                <td id="dbid">${query.cache ? '<i class="fa-solid fa-memory"></i> ' : ''}${query.db}</td>
                <td id="query">${ReduceText(query.query, 47)}</td>
                <td id="values">${ReduceText(JSON.stringify(query.values), 47)}</td>
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
    $("#resources-content").html("");

    resources.forEach(resource => {
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

function LoadDBs(dbs) {
    dbs = JSON.parse(dbs)
    $("#dbs-content").html("");
    for (let i = 0; i < dbs.length; i++) {
        const db = dbs[i];
        var lastUse = null;
        queries.forEach(element => {
            if (element.db == db.id) {
                lastUse = element.currentTimestamp;
            }
        });
        var date = new Date(lastUse);
        date = date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString();

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
                                <p class="desc desc--db">${date}</p>
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

function LoadLogs(logs) {
    $("#logsModalBody").html("");
    logs.forEach(log => {
        $("#logsModalBody").append(`
            <tr>
                <td style="width:10%">${log.type}</td>
                <td style="width: 70% !important;">${log.message.replace("^0", "").replace("^1", "").replace("^2", "").replace("^3", "")}</td>
                <td style="width:20%">${log.solution ? log.solution : "Unavailable"}</td>
            </tr>
        `);
    });
}

function LoadCache(cache) {
    $("#cacheModalBody").html("");
    for (let i = 0; i < cache.length; i++) {
        $("#cacheModalBody").append(`
            <tr>
                <td style="width:10%">${cache[i].table}</td>
                <td style="width: 20% !important;">${cache[i].hash}</td>
                <td style="width:50%">${ReduceText(JSON.stringify(cache[i].values), 60)}</td>
            </tr>
        `);
    }
}

function LoadBackups(backups) {
    $("#backupModalBody").html("");
    for (let i = 0; i < backups.length; i++) {
        $("#backupModalBody").append(`
            <tr>
                <td style="width:10%">${backups[i].name}</td>
                <td style="width: 20% !important;">${backups[i].date}</td>
                <td style="width:50%">${backups[i].size} mb</td>
            </tr>
        `);
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

let isOpened = false;

function OpenUI(state) {
    if (state){
        $("#main-container").css("display", "flex");
        $(".menu").removeClass("animate__fadeOutDown");
        $(".menu").css("display", "flex");
        $(".menu").addClass("animate__fadeInUp");
    }else {
        $(".menu").removeClass("animate__fadeInUp");
        $(".menu").addClass("animate__fadeOutDown");
        setTimeout(() => {
            $("#main-container").css("display", "none");
            $.post("https://icmysql/closeDebugUI", {});
        }, 1000);
    }
    
  
    isOpen = state;
}

// LoadResources([
//     {
//         "name": "ice_gym",
//         "description": "Script that manage all connections and querys to the database."
//     },
//     {
//         "name": "ice_hud",
//         "description": "Script that manage all connections and querys to the database."
//     }
// ]);

$(document).ready(function () {
    ListenSearchInput();
    // LoadStats();
    // LoadDBs();

    // // Only for testing
    // OpenSection("section__backup")

    window.addEventListener("message", function (event) {
        if (event.data.action == undefined) return;
        switch (event.data.action) {
            case "open":
                $.post("https://icmysql/loadData", JSON.stringify({ "load": "queries" }));
                OpenUI(true);
                break;
            case "loadData":
                if (event.data.info == "dbs") {
                    LoadDBs(event.data.data);
                } else if (event.data.info == "queries") {
                    queries = event.data.data;
                    $.post("https://icmysql/loadData", JSON.stringify({ "load": "dbs" }));
                    $.post("https://icmysql/loadData", JSON.stringify({ "load": "resources" }));
                    $.post("https://icmysql/loadData", JSON.stringify({ "load": "logs" }));
                    $.post("https://icmysql/loadData", JSON.stringify({ "load": "cache" }));
                    $.post("https://icmysql/loadData", JSON.stringify({ "load": "backup" }));
                } else if (event.data.info == "resources") {
                    LoadResources(event.data.data);
                } else if (event.data.info == "logs") {
                    LoadLogs(event.data.data)
                } else if (event.data.info == "cache") {
                    LoadCache(JSON.parse(event.data.data))
                } else if (event.data.info == "backup") {
                    LoadBackups(event.data.data)
                }
                break;
        }
    })
    window.addEventListener("keydown", function (event) {
        if (event.key == "Escape" && isOpen) {
            OpenUI(false);
        }
    })
})
var obj = [];
var isOpen = false;

function exitWeb() {
    document.getElementById("kt_body").style.display = "none";
    isOpen = false;
    $.post("https://ice_mysql/close");
}

window.addEventListener("keydown", function (e) {
    if (event.keyCode == 27) {
        exitWeb()
    }
});

window.addEventListener("message", function (event) {
    switch (event.data.action) {
        case "open":
            document.getElementById("kt_body").style.display = "";
            isOpen = true;
            break;
        case "updateData":
            obj = event.data.data;
            var dbs = [];
            for (let i = 0; i < obj.length; i++) {
                if (dbs[obj[i].dbID - 1] == undefined) {
                    dbs[obj[i].dbID - 1] = {};
                    dbs[obj[i].dbID - 1].ID = obj[i].dbID;
                    dbs[obj[i].dbID - 1].date = obj[i].date;
                    dbs[obj[i].dbID - 1].response = obj[i].executionTime;
                }
            }
            $("#databasesContainer").html("")
            dbs.forEach(element => {
                $("#databasesContainer").append(`
                <div class="col-md-6 col-xxl-4 animate__animated animate__fadeIn">
                <div class="justify-content-end ribbon ribbon-start" style="
                margin-top: 30px;
                position: absolute;
                margin-left: 5px;
            ">
                
                    </div>
                    <div class="card ">
                        <div class="card-body d-flex flex-center flex-column py-9 px-5">
                            <div class="animate__animated" id="main-info-ban-${element.ID}" style="display:contents;position:relative">
                                <div class="symbol symbol-65px symbol-circle mb-5"> <img
                                        src="https://th.bing.com/th/id/OIP.ZeDDs6DTtZ6b4RKgvC3emgHaG7?pid=ImgDet&rs=1"
                                        alt="image">
                                </div> <a href="#"
                                    class="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Databse
                                    #${element.ID}</a>
                            </div>
                            <div class="d-flex flex-center flex-wrap mb-5">
                                <div
                                    class="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                                    <div class="fs-6 fw-bold text-gray-700">
                                        ${element.date}</div>
                                    <div class="fw-semibold text-gray-400">Last Use</div>
                                </div>
                                <div
                                    class="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                                    <div class="fs-6 fw-bold text-gray-700">
                                    ${element.response.toFixed(6)} ms</div>
                                    <div class="fw-semibold text-gray-400">Average Response</div>
                                </div>
                            </div>
                            <div>
                                <button type="button"  data-bs-toggle="modal" data-bs-target="#dbQueries" onclick="OpenDBQueries(${element.ID})"
                                    class="btn btn-sm btn-light-primary btn-flex btn-center">
                                    Queries
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                `)
            });
            break;
    }
});

function OpenDBQueries(dbid) {
    $("#dbQueriesTitle").html(`DB#${dbid} Queries`)
    $("#dbQueriesBody").html("")
    for (let i = 0; i < obj.length; i++) {
        const data = obj[i];
        if (data.dbID == dbid) {
            $("#dbQueriesBody").append(`
            <tr class="animate__animated animate__fadeIn">
                <td>
                    <div class="d-flex align-items-center">
                        ${data.resourceName}
                    </div>
                </td>
                <td>
                    <span class="text-gray-600 fw-bold fs-6">
                        ${data.query}
                    </span>
                </td>
                <td>
                    <span class="text-gray-600 fw-bold fs-6">${data.date}</span>
                </td>
                <td>
                    <span class="text-gray-600 fw-bold fs-6">${data.executionTime.toFixed(5)} ms</span>
                </td>
                <td>
                    <span class="text-gray-600 fw-bold fs-6">${JSON.stringify(data.params)}</span>
                </td>
            </tr>`)
        }
    }
}

function SearchResource(rName) {
    var names = [];
    var founded = [];
    for (let i = 0; i < obj.length; i++) {
        const data = obj[i];
        if (data.resourceName.includes(rName) && !names.includes(data.resourceName)) {
            founded.push(data)
            names.push(data.resourceName)
        }
    }
    return founded;
}

function InputSearchResource() {
    const data = SearchResource($("#search-input").val());
    $("#resourceTableContent").html("")
    data.forEach(element => {
        $("#resourceTableContent").append(`<tr class="animate__animated animate__fadeIn">
            <td>
                <div class="d-flex align-items-center">
                    ${element.resourceName}
                </div>
            </td>
            <td>
                <span class="text-gray-600 fw-bold fs-6">${element.date}</span>
            </td>
            <td>
                <span class="text-gray-600 fw-bold fs-6">${Number.parseFloat(element.executionTime).toFixed(5)} ms</span>
            </td>
            <td>
                <span class="text-gray-600 fw-bold fs-6">DB#${element.dbID}</span>
            </td>
            <td>
                <button class="btn btn-primary" onclick="OpenQueries('${element.resourceName}')" data-bs-toggle="modal" data-bs-target="#queriesList">Queries</button>
            </td>
        </tr>`);
    });
}

function OpenQueries(rName) {
    $("#queriesTitle").html(rName);
    $("#queriesBody").html("")
    for (let i = 0; i < obj.length; i++) {
        const data = obj[i];
        if (data.resourceName == rName) {
            $("#queriesBody").append(`
            <tr class="animate__animated animate__fadeIn">
                <td>
                    <div class="d-flex align-items-center">
                        ${data.query}
                    </div>
                </td>
                <td>
                    <span class="text-gray-600 fw-bold fs-6">${data.date}</span>
                </td>
                <td>
                    <span class="text-gray-600 fw-bold fs-6">${data.executionTime.toFixed(5)} ms</span>
                </td>
                <td>
                    <span class="text-gray-600 fw-bold fs-6">${JSON.stringify(data.params)}</span>
                </td>
            </tr>`)
        }
    }
}
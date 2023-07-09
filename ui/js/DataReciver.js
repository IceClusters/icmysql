window.addEventListener("message", function (event) {
    switch (event.data.action) {
        case "open":
            document.getElementById("main").style.display = "";
            break;
        case "updateData":
            console.log(JSON.stringify(event.data.data))
            break;
    }
});

const obj = [
    {
        "result": [{ "identifier": "char1:0ca0dfbead8e22c4235769d9380d1fb9d6f32d5a" }]
        , "executionTime": 2.55640000104904,
        "date": "2023-07-09 01:08:58",
        "query": "SELECT identifier FROM users WHERE `group`=?",
        "params": ["admin"],
        "dbID": 1,
        "resourceName": "ice_testing"
    }
]

function SearchResource(rName) {
    var founded = [];
    for (let i = 0; i < obj.length; i++) {
        const data = obj[i];
        if (data.resourceName.includes(rName)) founded.push(data)
    }
    console.log(JSON.stringify(founded))
}

SearchResource("ice_a")
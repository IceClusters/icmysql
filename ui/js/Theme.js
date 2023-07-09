const body = document.querySelector("body");
const mysidebar = document.getElementById("mysidebar");
function toggleDark() {
    if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        localStorage.setItem("theme", "light");
    } else {
        body.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }
}
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
}

function toggleMneu() {
    mysidebar.classList.toggle("shrink_sidebar");
}
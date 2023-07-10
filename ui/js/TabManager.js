var currentTab = null;
var currentActive = null;
var changingTab = false;

const eventListeners = {
  "resourcesBtn": "OpenTab('resourcesTab', 'resourcesActive')",
  "searchUserBtn": "OpenTab('searchUserTab', 'searchUserActive')",
  "databasesBtn": "OpenTab('databasesListTab', 'databasesActive')"
};

function SetButtonsListenersTabs() {
  const keys = Object.keys(eventListeners);
  for (let i = 0; i < keys.length; i++) {
    $(`#${keys[i]}`).on("click", function () {
      eval(eventListeners[keys[i]]);
    });
  }
}

function OpenTab(tabName, activeID) {
  if (currentTab == tabName || changingTab) return;
  changingTab = true;
  $(`#${currentTab}`).addClass("animate__fadeOutLeft");
  $(`#${tabName}`).addClass("animate__fadeInRight");
  $(`#${currentTab}`).css("display", "");
  $(`#${tabName}`).css("display", "");

  $(`#${activeID}`).addClass("active")
  $(`#${currentActive}`).removeClass("active")

  setTimeout(() => {
    $(`#${currentTab}`).removeClass("animate__fadeOutLeft");
    $(`#${tabName}`).removeClass("animate__fadeInRight");
    $(`#${currentTab}`).css("display", "none");
    currentActive = activeID
    currentTab = tabName;
    changingTab = false;
  }, 990);
}

$(document).ready(function () {
  SetButtonsListenersTabs()
  OpenTab("resourcesTab", "resourcesActive")
});

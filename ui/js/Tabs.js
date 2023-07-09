function TabOpen(tab) {

    // select all elements that have tabSelector attribute and remove class active
    var tabSelectors = document.querySelectorAll('[tabSelector]');
    for (var i = 0; i < tabSelectors.length; i++) {
        tabSelectors[i].classList.remove('sidebar_tab_active');
    }
    document.getElementById(tab).classList.add('sidebar_tab_active');
}
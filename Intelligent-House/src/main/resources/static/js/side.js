document.addEventListener('DOMContentLoaded', function() {
    const sidebarButton = document.getElementById('sidebarButton');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    sidebarButton.addEventListener('click', function() {
        sidebar.classList.add('open');
        overlay.classList.add('open');
    });

    overlay.addEventListener('click', function() {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
    });
});

// 1. hiddenSidebar.html 불러오기
fetch('/sidebar/hiddenSidebar.html')
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);

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

// 2. fixedSidebar.html 불러오기
fetch('/sidebar/fixedSidebar.html')
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);

    const fixedSidebar = document.getElementById('fixed-sidebar');
    const toggleButton = document.getElementById('fixed-sidebar-button');
    let isFixedSidebarClose = true; // 기본은 닫힘 상태

    // 첫 상태 맞추기
    fixedSidebar.classList.add('closed');
    toggleButton.classList.add('closed');

    toggleButton.addEventListener('click', () => {
      if (isFixedSidebarClose) {
        fixedSidebar.classList.remove('closed');
        fixedSidebar.classList.add('open');
        toggleButton.classList.remove('closed');
        toggleButton.classList.add('open');
      } else {
        fixedSidebar.classList.remove('open');
        fixedSidebar.classList.add('closed');
        toggleButton.classList.remove('open');
        toggleButton.classList.add('closed');
      }
      isFixedSidebarClose = !isFixedSidebarClose;
    });
  });

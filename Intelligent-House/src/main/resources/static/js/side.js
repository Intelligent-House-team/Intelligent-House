fetch('/sidebar.html')
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html); // body 맨 마지막에 삽입

    // sidebar.html 이 body에 삽입된 이후에 실행!
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

    // 고정형 사이드바 관련
    const fixedSidebar = document.getElementById('fixed-sidebar');
        const toggleButton = document.getElementById('toggle-sidebar-button');
        const closeFixedSidebarButton = document.getElementById('closeFixedSidebarButton');

        let isFixedSidebarOpen = true;

        toggleButton.addEventListener('click', () => {
          if (isFixedSidebarOpen) {
            fixedSidebar.style.right = '-300px'; // 숨김
          } else {
            fixedSidebar.style.right = '0';
          }
          isFixedSidebarOpen = !isFixedSidebarOpen;
        });

        closeFixedSidebarButton.addEventListener('click', function() {
            fixedSidebar.style.display = 'none';
        });
  });

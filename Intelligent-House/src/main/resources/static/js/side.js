fetch('/hiddenSidebar.html')
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

    // 고정형 사이드바
    const fixedSidebar = document.getElementById('fixed-sidebar');
    const toggleButton = document.getElementById('fixed-sidebar-button');
    let isFixedSidebarClose = true;

    toggleButton.addEventListener('click', () => {
          if (isFixedSidebarClose) {
            // 열기
            fixedSidebar.classList.remove('closed');
            fixedSidebar.classList.add('open');
          } else {
            // 닫기
            fixedSidebar.classList.remove('open');
            fixedSidebar.classList.add('closed');
          }
          isFixedSidebarClose = !isFixedSidebarClose;
        });

    // 🔥 추가: 페이지 처음 로딩할 때 사이드바 상태 보고 버튼 클래스 설정
        if (fixedSidebar.classList.contains('open')) {
          toggleButton.classList.add('open');
          toggleButton.classList.remove('closed');
          isFixedSidebarClose = false; // 상태도 맞춰줌
        } else {
          toggleButton.classList.add('closed');
          toggleButton.classList.remove('open');
          isFixedSidebarClose = true;
        }
  });

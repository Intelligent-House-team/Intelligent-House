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

      //가이드 페이지 전환 버튼
      const guide1 = document.getElementById('Guide1');
      const guide2 = document.getElementById('Guide2');
      const header = document.getElementById('layoutGroup-View');

      const guideImg = document.querySelector('#Guide1');
      guideImg.style.display = 'block';

      guide1.addEventListener('click', function() {
        document.querySelector('#map').style.display = 'none';
        document.querySelector('footer').style.display = 'none';
            });
      guide2.addEventListener('click', function() {

            });

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

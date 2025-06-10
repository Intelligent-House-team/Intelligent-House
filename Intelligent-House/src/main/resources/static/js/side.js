// 1. hiddenSidebar.html 불러오기
fetch('/sidebar/hiddenSidebar.html')
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);

    const sidebarButton = document.getElementById('sidebarButton');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const sidebarCloseBtn = document.getElementById("closeSidebar");

    const guide1 = document.getElementById('Guide1');
    const guide2 = document.getElementById('Guide2');

    const mapDiv = document.getElementById('map');
    const guideDiv = document.getElementById('guide');
    const footer = document.querySelector('footer');
    const header = document.getElementById('layoutGroup-View');

    // 버튼 없으면 return
    if (!guide1 || !guide2 || !mapDiv || !guideDiv) {
      console.log('필요한 요소 중 일부를 찾지 못했습니다.');
      if (window.location.pathname !== '/boards'){
        console.error('게시판 페이지가 아닌데 요소를 잃어버림');
        return;
      }
    }

    // 사이드바 열기
    sidebarButton.addEventListener('click', () => {
      sidebar.classList.add('open');
      overlay.classList.add('open');
      sidebarCloseBtn.classList.add('open');
    });

    // 히든 사이드 바 닫기
    function closeHiddenSidebar() {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      sidebarCloseBtn.classList.remove('open');
    }
    // 이벤트 등록
    overlay.addEventListener('click', closeHiddenSidebar);
    sidebarCloseBtn.addEventListener('click', closeHiddenSidebar);

    // Guide1 클릭
    guide1.addEventListener('click', () => {
      mapDiv.style.display = 'none';
      guideDiv.style.display = 'block';
      guideDiv.style.backgroundImage = "url('/images/Youtube.jpg')";
      guideDiv.style.backgroundSize = "cover";
      guideDiv.style.backgroundPosition = "center";

      if (footer) {
        footer.style.visibility = 'hidden';
        footer.style.pointerEvents = 'none';
      }
      if (header) {
        header.style.visibility = 'hidden';
        header.style.pointerEvents = 'none';
      }

      closeHiddenSidebar();
    });

    // Guide2 클릭
    guide2.addEventListener('click', () => {
      mapDiv.style.display = 'none';
      guideDiv.style.display = 'block';
      guideDiv.style.backgroundImage = "url('/images/HouseIcon.png')";
      guideDiv.style.backgroundSize = "cover";
      guideDiv.style.backgroundPosition = "center";

      if (footer) {
        footer.style.visibility = 'hidden';
        footer.style.pointerEvents = 'none';
      }
      if (header) {
        header.style.visibility = 'hidden';
        header.style.pointerEvents = 'none';
      }

      closeHiddenSidebar();
    });

    // MainPage 복귀 (site-title 클릭)
    const siteTitle = document.getElementById('site-title');
    if (siteTitle) {
      siteTitle.addEventListener('click', () => {
        mapDiv.style.display = 'block';
        guideDiv.style.display = 'none';

        if (footer) {
          footer.style.visibility = 'visible';
          footer.style.pointerEvents = 'auto';
        }
        if (header) {
          header.style.visibility = 'visible';
          header.style.pointerEvents = 'auto';
        }
      });
    }
  });

// 2. fixedSidebar.html 불러오기
if (window.location.pathname !== '/boards') {
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
}
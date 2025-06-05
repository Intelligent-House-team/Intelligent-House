fetch('/sidebar/hiddenSidebar.html')
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);

    const sidebarButton = document.getElementById('sidebarButton');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const guide1 = document.getElementById('Guide1');
    const guide2 = document.getElementById('Guide2');
    const siteTitle = document.getElementById('site-title');

    const mapDiv = document.getElementById('map');
    const guideDiv = document.getElementById('guide');
    const footer = document.querySelector('footer');
    const header = document.getElementById('layoutGroup-View');

    // 필수 요소 존재 여부 확인
    if (!sidebarButton || !sidebar || !overlay || !guide1 || !guide2 || !mapDiv || !guideDiv) {
      console.error('[side.js] 필수 요소가 존재하지 않습니다. HTML 확인 필요');
      return;
    }

    // 사이드바 열기
    sidebarButton.addEventListener('click', () => {
      sidebar.classList.add('open');
      overlay.classList.add('open');
    });

    // 오버레이 클릭 시 닫기
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });

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
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
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
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });

    // 메인 복귀
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
  })
  .catch(err => {
    console.error('[side.js] hiddenSidebar.html 로딩 실패:', err);
  });

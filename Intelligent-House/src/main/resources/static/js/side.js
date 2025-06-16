// 헤더 버튼 찾기 재시도 함수
function findHeaderButtonWithRetry(maxRetries = 10, delay = 500) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    function tryFind() {
      attempts++;

      const sidebarButton = document.getElementById('sidebarButton');

      if (sidebarButton) {
        console.log(`헤더 버튼 찾기 성공! (시도 횟수: ${attempts})`);
        resolve(sidebarButton);
        return;
      }

      if (attempts >= maxRetries) {
        console.error(`헤더 버튼 최대 재시도 횟수(${maxRetries})를 초과했습니다.`);
        reject(new Error('헤더 버튼 찾기 실패'));
        return;
      }

      console.log(`헤더 버튼 찾기 실패, ${delay}ms 후 재시도... (${attempts}/${maxRetries})`);
      setTimeout(tryFind, delay);
    }

    tryFind();
  });
}

// 가이드 요소 찾기 재시도 함수
function findGuideElementsWithRetry(maxRetries = 10, delay = 500) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    function tryFind() {
      attempts++;

      const guide1 = document.getElementById('Guide1');
      const guide2 = document.getElementById('Guide2');
      const mapDiv = document.getElementById('map');
      const guideDiv = document.getElementById('guide');

      if (guide1 && guide2 && mapDiv && guideDiv) {
        console.log(`가이드 요소 찾기 성공! (시도 횟수: ${attempts})`);
        resolve({ guide1, guide2, mapDiv, guideDiv });
        return;
      }

      if (attempts >= maxRetries) {
        console.error(`가이드 요소 최대 재시도 횟수(${maxRetries})를 초과했습니다.`);
        reject(new Error('가이드 요소 찾기 실패'));
        return;
      }

      console.log(`가이드 요소 찾기 실패, ${delay}ms 후 재시도... (${attempts}/${maxRetries})`);
      setTimeout(tryFind, delay);
    }

    tryFind();
  });
}

// 1. hiddenSidebar.html 불러오기
fetch('/sidebar/hiddenSidebar.html')
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);

    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const sidebarCloseBtn = document.getElementById("closeSidebar");

    // 히든 사이드 바 닫기 함수 미리 정의
    function closeHiddenSidebar() {
      if (sidebar && overlay && sidebarCloseBtn) {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        sidebarCloseBtn.classList.remove('open');
      }
    }

    // 헤더 버튼 찾기 재시도
    findHeaderButtonWithRetry()
      .then(sidebarButton => {
        // 사이드바 열기 이벤트
        sidebarButton.addEventListener('click', () => {
          if (sidebar && overlay && sidebarCloseBtn) {
            sidebar.classList.add('open');
            overlay.classList.add('open');
            sidebarCloseBtn.classList.add('open');
          }
        });

        console.log('사이드바 버튼 이벤트 등록 완료');
      })
      .catch(error => {
        console.error('헤더 버튼 찾기 실패:', error);
      });

    // 오버레이와 닫기 버튼 이벤트 등록
    if (overlay && sidebarCloseBtn) {
      overlay.addEventListener('click', closeHiddenSidebar);
      sidebarCloseBtn.addEventListener('click', closeHiddenSidebar);
    }

    // 가이드 요소 찾기 재시도 로직
    findGuideElementsWithRetry()
      .then(({ guide1, guide2, mapDiv, guideDiv }) => {
        const footer = document.querySelector('footer');
        const header = document.getElementById('layoutGroup-View');

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
      })
      .catch(error => {
        console.error('가이드 요소 찾기 최종 실패:', error);

        // 특정 페이지에서는 에러를 무시
        if (window.location.pathname === '/port' ||
            window.location.pathname.startsWith('/content/')) {
          console.log('게시판 페이지에서는 해당 요소가 없는 것이 정상입니다.');
          return;
        }

        console.error('메인 페이지에서 요소를 찾을 수 없습니다.');
      });
  })
  .catch(error => {
    console.error('hiddenSidebar.html 로드 실패:', error);
  });

// 2. fixedSidebar.html 불러오기 (루트 페이지에서만)
if (window.location.pathname === '/') {
  console.log('루트 페이지에서 고정 사이드바 로드 시작');

  fetch('/sidebar/fixedSidebar.html')
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);

      const fixedSidebar = document.getElementById('fixed-sidebar');
      const toggleButton = document.getElementById('fixed-sidebar-button');

      if (!fixedSidebar || !toggleButton) {
        console.error('고정 사이드바 요소를 찾을 수 없습니다.');
        return;
      }

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

      console.log('고정 사이드바 초기화 완료');
    })
    .catch(error => {
      console.error('fixedSidebar.html 로드 실패:', error);
    });
} else {
  console.log(`현재 페이지(${window.location.pathname})는 루트 페이지가 아니므로 고정 사이드바를 로드하지 않습니다.`);
}
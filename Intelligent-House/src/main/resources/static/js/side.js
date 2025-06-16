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

// 페이지 유형 확인 함수
function isMainPage() {
  return window.location.pathname === '/';
}

function isBoardPage() {
  return window.location.pathname === '/port' ||
         window.location.pathname.startsWith('/content/') ||
         window.location.pathname.startsWith('/post/');
}
// ✅ 외부에서 재호출 가능하게 함수 분리
window.loadLatestNewsToSidebar = function () {
  fetch('/api/post/latest')
    .then(res => res.json())
    .then(data => {
      const newsContainer = document.getElementById('news');
      if (!newsContainer) return;

      newsContainer.innerHTML = ''; // 초기화

      data.forEach(item => {
        const p = document.createElement('p');
        p.textContent = item.text;
        newsContainer.appendChild(p);
      });
    })
    .catch(err => {
      console.error('오늘의 소식 불러오기 실패:', err);
    });
};

// URL 파라미터에서 가이드 모드 확인
function checkGuideMode() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('guide');
}

// 가이드 실행 함수들
function executeGuide1(mapDiv, guideDiv, footer, header, closeHiddenSidebar) {
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
}

function executeGuide2(mapDiv, guideDiv, footer, header, closeHiddenSidebar) {
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
}

// 탭 기능 초기화 함수
function initializeTabs() {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 모든 탭에서 active 클래스 제거
      tabs.forEach(t => t.classList.remove('active'));
      // 클릭된 탭에 active 클래스 추가
      tab.classList.add('active');

      // 모든 탭 콘텐츠 숨기기
      tabContents.forEach(content => content.classList.add('hidden'));

      // 선택된 탭 콘텐츠 보이기
      const targetId = tab.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.remove('hidden');
      }
    });
  });
}

// 1. hiddenSidebar.html 불러오기
fetch('/sidebar/hiddenSidebar.html')
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);

    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const sidebarCloseBtn = document.getElementById('close-sidebar'); // 변경된 ID
    const hiddenCloseBtn = document.getElementById("closeSidebar"); // 기존 숨겨진 버튼

    // 탭 기능 초기화
    initializeTabs();
    window.loadLatestNewsToSidebar(); // ✅ 오늘의 소식 로딩

    // 히든 사이드바 열기 함수
    function openHiddenSidebar() {
      if (sidebar && overlay) {
        sidebar.classList.remove('closed');
        sidebar.classList.add('open');
        overlay.classList.add('open');
        if (hiddenCloseBtn) {
          hiddenCloseBtn.classList.add('open');
        }
      }
    }

    // 히든 사이드바 닫기 함수
    function closeHiddenSidebar() {
      if (sidebar && overlay) {
        sidebar.classList.remove('open');
        sidebar.classList.add('closed');
        overlay.classList.remove('open');
        if (hiddenCloseBtn) {
          hiddenCloseBtn.classList.remove('open');
        }
      }
    }

    // 헤더 버튼 찾기 재시도 (모든 페이지에서 실행)
    findHeaderButtonWithRetry()
      .then(sidebarButton => {
        // 사이드바 열기 이벤트
        sidebarButton.addEventListener('click', openHiddenSidebar);
        console.log('사이드바 버튼 이벤트 등록 완료');
      })
      .catch(error => {
        console.error('헤더 버튼 찾기 실패:', error);
      });

    // 오버레이, 닫기 버튼, 숨겨진 닫기 버튼 이벤트 등록
    if (overlay) {
      overlay.addEventListener('click', closeHiddenSidebar);
    }
    if (sidebarCloseBtn) {
      sidebarCloseBtn.addEventListener('click', closeHiddenSidebar);
    }
    if (hiddenCloseBtn) {
      hiddenCloseBtn.addEventListener('click', closeHiddenSidebar);
    }

    // 가이드 요소 찾기는 메인 페이지에서만 실행
    if (isMainPage()) {
      console.log('메인 페이지에서 가이드 요소 찾기 시작');

      findGuideElementsWithRetry()
        .then(({ guide1, guide2, mapDiv, guideDiv }) => {
          const footer = document.querySelector('footer');
          const header = document.getElementById('layoutGroup-View');

          // Guide1 클릭 - 메인 페이지에서
          guide1.addEventListener('click', () => {
            executeGuide1(mapDiv, guideDiv, footer, header, closeHiddenSidebar);
          });

          // Guide2 클릭 - 메인 페이지에서
          guide2.addEventListener('click', () => {
            executeGuide2(mapDiv, guideDiv, footer, header, closeHiddenSidebar);
          });

          // Guide3 클릭 - 메인 페이지에서도 동작하도록 추가
          const guide3 = document.getElementById('Guide3');
          if (guide3) {
            guide3.addEventListener('click', (e) => {
              e.preventDefault();
              console.log('Guide3(사건/사고 건물) 클릭 - 게시판으로 이동 (루트 페이지)');
              window.location.href = 'http://localhost:8081/post';
            });
          }

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

          // URL 파라미터로 가이드 모드 자동 실행
          const guideMode = checkGuideMode();
          if (guideMode === '1') {
            console.log('URL 파라미터로 Guide1 자동 실행');
            executeGuide1(mapDiv, guideDiv, footer, header, closeHiddenSidebar);
            // URL에서 파라미터 제거
            window.history.replaceState({}, document.title, window.location.pathname);
          } else if (guideMode === '2') {
            console.log('URL 파라미터로 Guide2 자동 실행');
            executeGuide2(mapDiv, guideDiv, footer, header, closeHiddenSidebar);
            // URL에서 파라미터 제거
            window.history.replaceState({}, document.title, window.location.pathname);
          }

          console.log('메인 페이지 가이드 요소 이벤트 등록 완료');
        })
        .catch(error => {
          console.error('메인 페이지에서 가이드 요소 찾기 실패:', error);
        });
    } else {
      // 루트 페이지가 아닌 곳에서의 가이드 버튼 이벤트 등록
      console.log(`비 메인 페이지(${window.location.pathname})에서 가이드 버튼 이벤트 등록`);

      const guide1 = document.getElementById('Guide1');
      const guide2 = document.getElementById('Guide2');
      const guide3 = document.getElementById('Guide3');

      if (guide1) {
        guide1.addEventListener('click', () => {
          console.log('Guide1 클릭 - 루트 페이지로 이동');
          window.location.href = '/?guide=1';
        });
      }

      if (guide2) {
        guide2.addEventListener('click', () => {
          console.log('Guide2 클릭 - 루트 페이지로 이동');
          window.location.href = '/?guide=2';
        });
      }

      if (guide3) {
        guide3.addEventListener('click', (e) => {
          e.preventDefault();
          console.log('Guide3(사건/사고 건물) 클릭 - 게시판으로 이동');
          window.location.href = 'http://localhost:8081/post';
        });
      }

      if (isBoardPage()) {
        console.log(`게시판 페이지(${window.location.pathname})에서 가이드 이벤트 등록 완료`);
      } else {
        console.log(`기타 페이지(${window.location.pathname})에서 가이드 이벤트 등록 완료`);
      }
    }
  })
  .catch(error => {
    console.error('hiddenSidebar.html 로드 실패:', error);
  });

// 2. fixedSidebar.html 불러오기 (루트 페이지에서만)
if (isMainPage()) {
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
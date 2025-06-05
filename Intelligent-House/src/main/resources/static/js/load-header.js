fetch('header.html')
  .then(res => res.text())
  .then(html => {
    // 헤더 HTML 삽입
    document.body.insertAdjacentHTML('afterbegin', html);

    // 사이트 타이틀 설정
    const title = 'Intelligent House';
    document.getElementById('site-title').textContent = title;
    document.title = title;

    // ===== 지도 / 스카이뷰 버튼 기능 =====
    const buttons = document.querySelectorAll('#layoutGroup-View .layout-button');
    let currentType = 'map'; // 기본 상태

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedType = btn.id === 'layout-MapView' ? 'map' : 'sky';

        if (selectedType === currentType) return;

        // 버튼 상태 업데이트
        buttons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        // 맵 타입 전환
        currentType = selectedType;
        toggleMapType(currentType);
        console.log("type: " + currentType);
      });
    });

    function toggleMapType(type) {
      if (type === 'map') {
        window.map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
      } else {
        window.map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
      }
    }

    // ===== 로그인 버튼 클릭 시 팝업 띄우기 =====
    const loginBtn = document.getElementById('LoginBtn');
    const loginPopup = document.getElementById('Login-PopUp');
    const signupPopup = document.getElementById('Signup-PopUp');
    const closeBtns = document.querySelectorAll('.close-btn');
    const overlays = document.querySelectorAll('#Login-overlay');

    if (loginBtn && loginPopup) {
      loginBtn.addEventListener('click', () => {
        loginPopup.style.display = 'flex';
      });
    }

    // 닫기 버튼들 이벤트 연결
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const popup = btn.closest('.popup-wrapper');
        if (popup) {
          popup.style.display = 'none';
          resetPopupInputs(popup.id);
        }
      });
    });

    // 오버레이 클릭 시 닫기 + 초기화
    overlays.forEach(overlay => {
      overlay.addEventListener('click', () => {
        const popup = overlay.closest('.popup-wrapper');
        if (popup) {
          popup.style.display = 'none';
          resetPopupInputs(popup.id);
        }
      });
    });

    // 입력값 초기화 함수
    function resetPopupInputs(popupId) {
      const popup = document.getElementById(popupId);
      if (!popup) return;
      const inputs = popup.querySelectorAll('input');
      inputs.forEach(input => input.value = '');
    }
  });

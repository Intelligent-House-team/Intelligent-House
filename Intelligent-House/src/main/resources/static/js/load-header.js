document.addEventListener('DOMContentLoaded', function () {
    const headerContainer = document.createElement('div');
    headerContainer.id = 'header-container';
    document.body.prepend(headerContainer);

    fetch('/header')
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.text();
        })
        .then(html => {
            headerContainer.innerHTML = html;

            // 1. 타이틀 설정
            const title = 'Intelligent House';
            const siteTitle = document.getElementById('site-title');
            if (siteTitle) {
                siteTitle.textContent = title;
                siteTitle.style.cursor = 'pointer';
                siteTitle.addEventListener('click', () => {
                    window.location.href = '/';
                });
            }

            // 2. 지도 타입 전환 버튼
            const buttons = document.querySelectorAll('#layoutGroup-View .layout-button');
            let currentType = 'map';

            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const selectedType = btn.id === 'layout-MapView' ? 'map' : 'sky';
                    if (selectedType === currentType) return;

                    buttons.forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');

                    currentType = selectedType;
                    toggleMapType(currentType);
                    console.log("지도 전환됨: " + currentType);
                });
            });

            function toggleMapType(type) {
                if (!window.map || !window.kakao || !window.kakao.maps) {
                    console.warn("지도가 아직 초기화되지 않았습니다.");
                    return;
                }
                window.map.setMapTypeId(
                    type === 'map'
                        ? kakao.maps.MapTypeId.ROADMAP
                        : kakao.maps.MapTypeId.HYBRID
                );
            }

            // 3. 로그인 버튼 로직 + 로그인 상태 분기
            const loginButton = document.getElementById('LoginBtn');
            if (!loginButton) return; // 버튼 없으면 종료

            // 로그인 상태 확인
            fetch('/api/user/nickname', { credentials: 'include' })
            .then(res => {
              if (!res.ok) throw new Error('Unauthorized');
              return res.json(); // ✅ JSON으로 파싱
            })
            .then(data => {
              const nickname = data.nickname;
              loginButton.textContent = nickname;

              // ✅ 로그인된 경우 → 클릭 시 로그아웃 팝업
              loginButton.onclick = () => {
                if (typeof openPopup === 'function') {
                  openPopup('Logout-PopUp');
                } else {
                  console.warn('openPopup 함수가 정의되지 않음');
                }
              };
            })
            .catch(() => {
              loginButton.textContent = '로그인';

              // ✅ 비로그인 상태 → 클릭 시 로그인 팝업
              loginButton.onclick = () => {
                if (typeof openPopup === 'function') {
                  openPopup('Login-PopUp');
                } else {
                  console.warn('openPopup 함수가 정의되지 않음');
                }
              };
            });
        })
        .catch(error => {
            console.error('헤더 로딩 실패:', error);
            headerContainer.innerHTML = '<p>헤더를 로드할 수 없습니다. 오류: ' + error.message + '</p>';
        });
});

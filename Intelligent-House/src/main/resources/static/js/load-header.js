document.addEventListener('DOMContentLoaded', function () {
    const headerContainer = document.createElement('div');
    headerContainer.id = 'header-container';
    document.body.prepend(headerContainer);

    fetch('/header') // 또는 '/header.html' 사용 가능
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

            // 2. 지도 타입 전환 버튼 로직
            const buttons = document.querySelectorAll('#layoutGroup-View .layout-button');
            let currentType = 'map';

            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const selectedType = btn.id === 'layout-MapView' ? 'map' : 'sky';

                    if (selectedType === currentType) return;

                    // 버튼 시각 상태 갱신
                    buttons.forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');

                    // 카카오 지도 타입 변경
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

            // 3. 로그인 버튼 로직
            const loginButton = document.getElementById('LoginBtn');
            if (loginButton) {
                loginButton.addEventListener('click', () => {
                    if (typeof openPopup === 'function') {
                        openPopup('Login-PopUp');
                    } else {
                        console.error('openPopup 함수가 정의되지 않았습니다.');
                    }
                });

                // 4. 로그인 사용자 닉네임 가져오기
                fetch('/api/user/nickname')
                    .then(response => response.ok ? response.text() : null)
                    .then(nickname => {
                        if (nickname && nickname !== 'Unauthorized') {
                            loginButton.textContent = nickname;
                        } else {
                            loginButton.textContent = '로그인';
                        }
                    })
                    .catch(error => {
                        console.error('닉네임 가져오기 오류:', error);
                        loginButton.textContent = '로그인';
                    });
            }
        })
        .catch(error => {
            console.error('헤더 로딩 실패:', error);
            headerContainer.innerHTML = '<p>헤더를 로드할 수 없습니다. 오류: ' + error.message + '</p>';
        });
});

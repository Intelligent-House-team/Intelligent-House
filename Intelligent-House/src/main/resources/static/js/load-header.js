// /js/load-header.js
document.addEventListener('DOMContentLoaded', function() {
    // 1. 헤더를 삽입할 컨테이너 생성 및 body 맨 앞에 추가
    const headerContainer = document.createElement('div');
    headerContainer.id = 'header-container';
    document.body.prepend(headerContainer);

    // 2. 서버에서 header.html 내용을 비동기로 가져오기
    fetch('/header') // HomeController에 매핑된 /header 엔드포인트 호출
        .then(response => {
            if (!response.ok) {
                // HTTP 상태 코드가 200번대가 아니면 오류 처리
                console.error(`Error fetching header: Status ${response.status}`);
                // 서버에서 보낸 오류 메시지를 함께 출력 (HTML 형식일 수 있음)
                return response.text().then(text => { throw new Error(text); });
            }
            return response.text(); // 응답 본문을 텍스트(HTML)로 파싱
        })
        .then(html => {
            // 가져온 HTML을 헤더 컨테이너에 삽입
            headerContainer.innerHTML = html;

            // 3. 헤더가 로드된 후 로그인 버튼 관련 로직 처리
            const loginButton = document.getElementById('LoginBtn'); // header.html에 있는 ID가 LoginBtn인 요소
            if (loginButton) {
                // 로그인 버튼 클릭 이벤트 리스너 추가 (팝업 열기)
                loginButton.addEventListener('click', function() {
                    // popup.js에 정의된 openPopup 함수 호출 (Main.html에서 popup.js가 로드되어야 함)
                    if (typeof openPopup === 'function') {
                        openPopup('Login-PopUp');
                    } else {
                        console.error('openPopup function is not defined. Make sure popup.js is loaded.');
                    }
                });

                // 4. 현재 로그인된 사용자의 닉네임 가져와서 버튼 텍스트 업데이트
                // (백엔드에 /api/user/nickname 엔드포인트가 필요)
                fetch('/api/user/nickname')
                    .then(response => {
                        if (response.ok) {
                            // 응답이 성공적이면 닉네임 텍스트 반환
                            return response.text();
                        } else {
                            // 인증되지 않았거나 다른 에러 발생 시 로그인 상태가 아님을 나타냄
                            // 예: HTTP 401 Unauthorized 등
                            return null;
                        }
                    })
                    .then(nickname => {
                        // 닉네임이 유효하고 'Unauthorized'와 같은 기본값이 아닌 경우
                        if (nickname && nickname !== 'Unauthorized') {
                            loginButton.textContent = nickname; // 버튼 텍스트를 닉네임으로 변경
                        } else {
                            // 닉네임이 없거나 유효하지 않으면 '로그인' 텍스트 유지
                            loginButton.textContent = '로그인';
                        }
                    })
                    .catch(error => {
                        // 닉네임 가져오기 중 네트워크 오류 등 발생 시
                        console.error('Error fetching user nickname:', error);
                        loginButton.textContent = '로그인'; // 오류 발생 시에도 '로그인' 텍스트 유지
                    });
            }
        })
        .catch(error => {
            // 헤더 HTML 가져오기 자체에서 오류 발생 시
            console.error('Failed to load header:', error);
            // 사용자에게 오류 메시지 표시 (선택 사항)
            headerContainer.innerHTML = '<p>헤더를 로드할 수 없습니다. 오류: ' + error.message + '</p>';
        });
});
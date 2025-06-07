// /js/auth.js (로그인 폼 제출 및 회원가입 AJAX 통합 스크립트)

document.addEventListener('DOMContentLoaded', function () {
    // --- 로그인 폼 처리 (AJAX 요청으로 변경) ---
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) { // async 키워드 추가
            e.preventDefault(); // 기본 제출 막기

            const username = loginForm.querySelector('input[name="username"]').value.trim();
            const password = loginForm.querySelector('input[name="password"]').value.trim();

            if (!username) {
                alert('아이디를 입력해주세요.');
                return;
            }
            if (!password) {
                alert('비밀번호를 입력해주세요.');
                return;
            }

            try {
                const response = await fetch('/login', { // /login으로 POST 요청
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded' // 폼 데이터 형식으로 전송
                    },
                    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
                });

                if (response.ok) { // 로그인 성공 (HTTP 200 OK)
                    // Spring Security는 기본적으로 성공 시 "/"로 리다이렉션하지만,
                    // AJAX 요청에서는 리다이렉션이 자동으로 따르지 않고 응답으로 받아집니다.
                    // 따라서 로그인 성공 후 사용자 정보를 가져오는 추가 API 호출이 필요합니다.
                    // 또는 Spring Security가 로그인 성공 시 사용자 정보를 포함한 응답을 보내도록 설정할 수도 있습니다.
                    // 여기서는 간단하게 새로고침하여 서버에서 사용자 세션 정보를 다시 로드하도록 하겠습니다.
                    // 더 좋은 방법은 별도의 /api/user/me 와 같은 엔드포인트를 호출하여 사용자 정보를 받는 것입니다.

                    alert('로그인에 성공했습니다!');
                    // 로그인 팝업 닫기
                    if (typeof closePopup === 'function') closePopup('Login-PopUp');

                    // 로그인 성공 후 페이지 새로고침하여 헤더 정보 및 사용자 상태 업데이트
                    // 실제 애플리케이션에서는 새로고침 대신 사용자 닉네임을 받아와 동적으로 업데이트하는 것이 더 좋습니다.
                    // (예: /api/user/me 엔드포인트 호출 후 닉네임 받아서 LoginBtn 업데이트)
                    window.location.reload(); // 페이지 새로고침
                } else {
                    // 로그인 실패 (예: 401 Unauthorized, 403 Forbidden)
                    const errorText = await response.text();
                    // Spring Security의 기본 실패 응답은 HTML일 수 있으므로,
                    // 필요한 경우 에러 텍스트를 파싱하거나, 백엔드에서 JSON 응답을 보내도록 설정해야 합니다.
                    // 여기서는 간단히 에러 텍스트를 그대로 표시합니다.
                    alert(`로그인 실패: ${errorText || '아이디 또는 비밀번호를 확인해주세요.'}`);
                }
            } catch (error) {
                console.error('로그인 처리 중 네트워크 오류 발생:', error);
                alert('로그인 처리 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');
            }
        });
    }

    // --- 회원가입 폼 처리 (AJAX 요청) ---
    const signupButton = document.getElementById('signup-submit');

    if (signupButton) {
        signupButton.addEventListener('click', async () => {
            const signupPopup = document.getElementById('Signup-PopUp');
            if (!signupPopup) {
                console.error('Signup-PopUp element not found.');
                return;
            }

            const usernameInput = signupPopup.querySelector('input[name="username"]');
            const passwordInput = signupPopup.querySelector('input[name="password"]');
            const nicknameInput = signupPopup.querySelector('input[name="nickname"]');

            const username = usernameInput ? usernameInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value.trim() : '';
            const nickname = nicknameInput ? nicknameInput.value.trim() : '';

            if (!username) {
                alert('아이디를 입력해주세요.');
                return;
            }
            if (!password) {
                alert('비밀번호를 입력해주세요.');
                return;
            }
            if (!nickname) {
                alert('닉네임을 입력해주세요.');
                return;
            }

            try {
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password, nickname })
                });

                if (response.ok) {
                    alert('회원가입에 성공했습니다!');
                    if (typeof closePopup === 'function') closePopup('Signup-PopUp');
                    if (typeof openPopup === 'function') openPopup('Login-PopUp');
                } else {
                    const errorText = await response.text();
                    alert(`회원가입 실패: ${errorText}`);
                }
            } catch (error) {
                console.error('회원가입 처리 중 네트워크 오류 발생:', error);
                alert('회원가입 처리 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');
            }
        });
    }
});
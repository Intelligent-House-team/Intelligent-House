// /js/auth.js (로그인 폼 제출 및 회원가입 AJAX 통합 스크립트)

document.addEventListener('DOMContentLoaded', function () {
    // --- 로그인 폼 처리 (AJAX 요청) ---
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
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

                if (response.status === 401) {
                    showMessage('아이디 또는 비밀번호가 잘못됐습니다.');

                } else if (response.ok) {
                    /*showMessage('로그인에 성공했습니다!');*/

                    if (typeof closePopup === 'function') closePopup('Login-PopUp');
                    window.location.reload();
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
                    showMessage('회원가입에 성공했습니다!');

                    if (typeof closePopup === 'function') closePopup('Signup-PopUp');
                    if (typeof openPopup === 'function') openPopup('Login-PopUp');
                } else {
                    const errorText = await response.text();
                    alert(`회원가입 실패: ${errorText}`);
                }
            } catch (error) {
                console.error('회원가입 처리 중 네트워크 오류 발생:', error);
                showMessage('회원가입 처리 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');

            }
        });
    }
});
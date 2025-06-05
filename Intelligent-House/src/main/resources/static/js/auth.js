// auth.js (Spring Security 기본 로그인 방식 대응)
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault(); // 기본 제출 막기

      // 필드에서 입력값 읽기
      const username = loginForm.querySelector('input[name="username"]').value;
      const password = loginForm.querySelector('input[name="password"]').value;

      // 새 form 생성하여 제출 (Spring Security가 자동 처리)
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = '/login';

      const usernameInput = document.createElement('input');
      usernameInput.name = 'username';
      usernameInput.value = username;
      form.appendChild(usernameInput);

      const passwordInput = document.createElement('input');
      passwordInput.name = 'password';
      passwordInput.type = 'password';
      passwordInput.value = password;
      form.appendChild(passwordInput);

      document.body.appendChild(form);
      form.submit();
    });
  }
});

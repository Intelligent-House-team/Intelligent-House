// /js/popup.js

// 팝업 열기
function openPopup(id) {
  const popup = document.getElementById(id);
  if (popup) {
    popup.style.display = 'flex';
  }
}

// 팝업 닫기 + 입력 초기화
function closePopup(id) {
  const popup = document.getElementById(id);
  if (popup) {
    popup.style.display = 'none';

    // 입력값 초기화
    const inputs = popup.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
  }
}

// 로그인 → 회원가입 전환
function switchToSignup() {
  closePopup('Login-PopUp');
  openPopup('Signup-PopUp');
}

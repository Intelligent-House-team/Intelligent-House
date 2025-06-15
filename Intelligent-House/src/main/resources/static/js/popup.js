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

function showMessage(message) {
  const popup = document.getElementById('message-popup');
  const text = document.getElementById('message-text');

  if (popup && text) {
    text.textContent = message;
    popup.classList.remove('hidden');
  }
}

function closeMessagePopup() {
  const popup = document.getElementById('message-popup');
  if (popup) {
    popup.classList.add('hidden');
  }
}


document.addEventListener('DOMContentLoaded', function () {
  const logoutYesBtn = document.getElementById('logout-yes');
  if (logoutYesBtn) {
    logoutYesBtn.addEventListener('click', async () => {
      try {
        const response = await fetch('/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        if (response.ok || response.redirected) {
          window.location.href = '/'; // 로그아웃 후 메인으로
        } else {
          showMessage('로그아웃 처리 중 오류가 발생했습니다.');
        }
      } catch (err) {
        console.error('로그아웃 실패:', err);
        showMessage('네트워크 오류로 로그아웃에 실패했습니다.');
      }
    });
  }
});

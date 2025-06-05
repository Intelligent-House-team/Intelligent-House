function openPopup(id) {
  document.getElementById(id).style.display = 'flex';
}

function closePopup(id) {
  const popup = document.getElementById(id);
  if (popup) {
    popup.style.display = 'none';
    resetPopupInputs(id);
  }
}

function switchToSignup() {
  closePopup('Login-PopUp');
  openPopup('Signup-PopUp');
}

// 입력값 초기화 함수
function resetPopupInputs(popupId) {
  const popup = document.getElementById(popupId);
  if (!popup) return;
  const inputs = popup.querySelectorAll('input');
  inputs.forEach(input => input.value = '');
}

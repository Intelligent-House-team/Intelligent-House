document.addEventListener('DOMContentLoaded', () => {
  const popupOverlay = document.getElementById('post-popup-overlay');
  const postBtn = document.getElementById('post-btn');
  const cancelBtn = document.getElementById('post-cancel');

  const dateInputWrapper = document.getElementById('date-input-wrapper');
  const dateUnknownText = document.getElementById('date-unknown-text');
  const dateRadios = document.querySelectorAll('input[name="dateKnown"]');

  // ✅ "투고" 버튼 클릭 시 로그인 여부 확인
  if (postBtn) {
    postBtn.addEventListener('click', () => {
      fetch('/api/user/nickname')
        .then(res => {
          if (!res.ok) throw new Error('Unauthorized');
          return res.json();
        })
        .then(data => {
          // 로그인된 경우 → 팝업 열기
          popupOverlay.style.display = 'flex';
        })
        .catch(err => {
          // 로그인 안 된 경우 → 메시지 팝업 열기
          openMessagePopup("로그인 후 투고 가능합니다.");
        });
    });
  }

  // ✅ "취소" 버튼 → 투고 팝업 닫기
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      popupOverlay.style.display = 'none';
    });
  }

  // ✅ 날짜 라디오 토글 → input or 텍스트 전환
  dateRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === "unknown" && radio.checked) {
        dateInputWrapper.style.display = 'none';
        dateUnknownText.style.display = 'block';
      } else {
        dateInputWrapper.style.display = 'block';
        dateUnknownText.style.display = 'none';
      }
    });
  });

  // ✅ ESC 키 누르면 팝업들 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popupOverlay.style.display = 'none';
      closeMessagePopup();
    }
  });
});


// ✅ 메시지 팝업 열기 함수 (기존 구조에 맞춤)
function openMessagePopup(message) {
  const popup = document.getElementById('message-popup');
  const text = document.getElementById('message-text');
  if (popup && text) {
    text.textContent = message;
  /*  popup.style.display = 'flex';*/
    popup.classList.remove('hidden');
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const popupOverlay = document.getElementById('post-popup-overlay');
  const postBtn = document.getElementById('post-btn');
  const cancelBtn = document.getElementById('post-cancel');

  const dateInputWrapper = document.getElementById('date-input-wrapper');
  const dateUnknownText = document.getElementById('date-unknown-text');
  const dateRadios = document.querySelectorAll('input[name="dateKnown"]');

  // 팝업 열기
  if (postBtn) {
    postBtn.addEventListener('click', () => {
      popupOverlay.style.display = 'flex';
    });
  }

  // 팝업 닫기
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      popupOverlay.style.display = 'none';
    });
  }

  // 라디오 버튼 클릭 시 날짜 입력창 표시/숨김
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

  // ESC 키로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popupOverlay.style.display = 'none';
    }
  });
});

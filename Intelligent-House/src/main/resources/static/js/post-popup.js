document.addEventListener('DOMContentLoaded', () => {
  const popupOverlay = document.getElementById('post-popup-overlay');
  const postBtn = document.getElementById('post-btn');
  const cancelBtn = document.getElementById('post-cancel');
  const submitBtn = document.getElementById('post-submit');

  const dateInputWrapper = document.getElementById('date-input-wrapper');
  const dateUnknownText = document.getElementById('date-unknown-text');
  const dateRadios = document.querySelectorAll('input[name="dateKnown"]');
  const postForm = popupOverlay.querySelector('form');

  // ✅ "투고" 버튼 클릭 시 로그인 여부 확인
  if (postBtn) {
    postBtn.addEventListener('click', () => {
      fetch('/api/user/nickname')
        .then(res => {
          if (!res.ok) throw new Error('Unauthorized');
          return res.json();
        })
        .then(() => {
          popupOverlay.style.display = 'flex';
        })
        .catch(() => {
          openMessagePopup("로그인 후 투고 가능합니다.");
        });
    });
  }

  // ✅ "취소" 버튼 → 팝업 닫기
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      popupOverlay.style.display = 'none';
      postForm.reset(); // ← 취소 시도 폼도 초기화
    });
  }

  // ✅ 날짜 라디오 토글
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

  // ✅ 등록 버튼 → API POST 요청
  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const isUnknownDate = document.querySelector('input[name="dateKnown"]:checked').value === "unknown";
      const date = isUnknownDate ? null : document.getElementById('post-date').value;
      const address = document.querySelector('input[placeholder="상세 주소를 입력 해주세요"]').value.trim();
      const content = document.querySelector('textarea').value.trim();
      const country = "대한민국";

      if (!address || !content) {
        openMessagePopup("주소와 내용을 모두 입력해 주세요.");
        return;
      }

      const payload = {
        unknownDate: isUnknownDate,
        date: date,
        country: country,
        address: address,
        content: content
      };

      fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (response.ok) {
            popupOverlay.style.display = 'none';
            postForm.reset(); // ✅ 등록 성공 후 폼 초기화
            openMessagePopup("등록이 완료되었습니다.");
          } else if (response.status === 401) {
            openMessagePopup("로그인 후 등록이 가능합니다.");
          } else {
            openMessagePopup("등록에 실패했습니다.");
          }
        })
        .catch(err => {
          console.error("등록 오류:", err);
          openMessagePopup("서버 오류로 등록에 실패했습니다.");
        });
    });
  }

  // ✅ ESC 누르면 팝업 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popupOverlay.style.display = 'none';
      closeMessagePopup();
    }
  });
});

// ✅ 메시지 팝업 열기 함수
function openMessagePopup(message) {
  const popup = document.getElementById('message-popup');
  const text = document.getElementById('message-text');
  if (popup && text) {
    text.textContent = message;
    popup.classList.remove('hidden');
  }
}

// ✅ 메시지 팝업 닫기 함수
function closeMessagePopup() {
  const popup = document.getElementById('message-popup');
  if (popup) {
    popup.classList.add('hidden');
  }
}

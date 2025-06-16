document.addEventListener('DOMContentLoaded', () => {
  const popupOverlay = document.getElementById('post-popup-overlay');
  const postBtn = document.getElementById('post-btn');
  const cancelBtn = document.getElementById('post-cancel');
  const submitBtn = document.getElementById('post-submit');

  const dateInputWrapper = document.getElementById('date-input-wrapper');
  const dateUnknownText = document.getElementById('date-unknown-text');
  const dateRadios = document.querySelectorAll('input[name="dateKnown"]');
  const postForm = popupOverlay.querySelector('form');

  // ✅ "투고" 버튼 클릭 시 로그인 여부 확인 (기존 코드 유지)
  if (postBtn) {
    postBtn.addEventListener('click', () => {
      fetch('/api/user/nickname', {
        method: 'GET',
        credentials: 'include'
      })
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

  // ❌ 로그인 후 자동 팝업 기능 제거 (이 부분 삭제)
  // const autoPost = sessionStorage.getItem('autoPost');
  // if (autoPost === 'true') {
  //   sessionStorage.removeItem('autoPost');
  //   if (postBtn) postBtn.click();
  // }

  // ✅ "취소" 버튼 → 팝업 닫기
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      popupOverlay.style.display = 'none';
      postForm.reset();
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

  // ✅ 등록 버튼 → API POST 요청 (PostSubmission용)
  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const isUnknownDate = document.querySelector('input[name="dateKnown"]:checked')?.value === "unknown";
      const dateValue = isUnknownDate ? null : document.getElementById('post-date')?.value;
      const title = document.getElementById('post-title')?.value.trim();
      const content = document.getElementById('post-content')?.value.trim();
      const country = document.getElementById('post-country')?.value.trim();
      const address = document.getElementById('post-address')?.value.trim();

      if (!title || !content || !country || !address) {
        openMessagePopup("제목, 내용, 국가, 주소를 모두 입력해 주세요.");
        return;
      }

      const payload = {
        unknownDate: isUnknownDate,
        date: dateValue,
        country: country,
        address: address,
        title: title,
        content: content
      };

      fetch('/api/post', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (response.ok) {
            popupOverlay.style.display = 'none';
            postForm.reset();
            openMessagePopup("게시글이 등록되었습니다.");
            window.loadLatestNewsToSidebar();
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

// ✅ 우클릭 메뉴에서 "투고" 버튼 클릭 시 호출되는 함수
function openPostSubmissionPopup() {
  // 로그인 상태 확인
  fetch('/api/user/nickname', {
    method: 'GET',
    credentials: 'include'
  })
    .then(res => {
      if (!res.ok) throw new Error('Unauthorized');
      return res.json();
    })
    .then(() => {
      // 로그인 상태면 투고 팝업 열기
      const popupOverlay = document.getElementById('post-popup-overlay');
      if (popupOverlay) {
        popupOverlay.style.display = 'flex';
      }
    })
    .catch(() => {
      // 비로그인 상태면 로그인 요청 메시지
      openMessagePopup("로그인 후 투고 가능합니다.");
    });
}

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
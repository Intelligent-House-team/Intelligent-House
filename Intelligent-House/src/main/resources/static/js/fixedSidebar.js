const sidebar = document.getElementById('fixed-sidebar');
const openBtn = document.getElementById('fixed-sidebar-button');
const closeBtn = document.getElementById('close-sidebar');

// 열기 버튼
if (openBtn && sidebar) {
  openBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
    sidebar.classList.remove('closed');
  });
}

// 닫기 버튼
if (closeBtn && sidebar) {
  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebar.classList.add('closed');
  });
}


  // 탭 전환 기능
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.add('hidden'));

      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) {
        target.classList.remove('hidden');
      }
    });
  });
});

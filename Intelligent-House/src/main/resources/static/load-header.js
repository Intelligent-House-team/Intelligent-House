fetch('header.html')
  .then(res => res.text())
  .then(html => {
    // body 맨 위에 삽입 (지도보다 위에)
    document.body.insertAdjacentHTML('afterbegin', html);

    // 타이틀 동적 설정
    const title = 'Intelligent House';
    document.getElementById('site-title').textContent = title;
    document.title = title;
  });

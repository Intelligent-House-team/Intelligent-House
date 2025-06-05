fetch('header.html')
  .then(res => res.text())
  .then(html => {
    // body 맨 위에 삽입 (지도보다 위에)
    document.body.insertAdjacentHTML('afterbegin', html);

    // 타이틀 동적 설정
    const title = 'Intelligent House';
    document.getElementById('site-title').textContent = title;
    document.title = title;

    // 타이틀과 함께 움직일 페이지 레이아웃 변경 버튼
    const buttons = document.querySelectorAll('#layoutGroup-View .layout-button');
    let currentType = 'map'; // 기본 상태

    buttons.forEach(btn => {
          btn.addEventListener('click', () => {
            const selectedType = btn.id === 'layout-MapView' ? 'map' : 'sky';

            if (selectedType === currentType) {
              return; // 같은 버튼 눌렀을 땐 아무 일도 안 함
            }

            // 버튼 상태 업데이트
            buttons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // 맵 타입 전환
            currentType = selectedType;
            toggleMapType(currentType);//여기 아니면
            console.log("text: "+currentType);
          });
        });

    function toggleMapType(type) {
        if (type === 'map') {
            window.map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP); // 일반 지도
        } else {
            window.map.setMapTypeId(kakao.maps.MapTypeId.HYBRID); // 위성 지도 + 도로 정보
        }
    }
  });

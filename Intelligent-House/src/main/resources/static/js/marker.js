// 전역 지도 객체 확인
if (!window.map) {
    console.error("지도 객체가 초기화되지 않았습니다.");
} else {
    // 영진전문대학교 마커 생성
    const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(35.8965, 128.6210),
        map: window.map,
        title: '영진전문대학교'
    });


    // 더블 클릭 시 확대
    kakao.maps.event.addListener(window.map, 'dblclick', function(mouseEvent) {
        window.map.setLevel(window.map.getLevel() - 1, { anchor: mouseEvent.latLng });
    });

    // 우클릭 팝업 버튼 표시
    const actionBox = document.getElementById('map-action-buttons');

    kakao.maps.event.addListener(window.map, 'rightclick', function(mouseEvent) {
        const level = window.map.getLevel();

        if (level > 2) {
            actionBox.style.display = 'none';
            return;
        }

        const x = mouseEvent.point.x;
        const y = mouseEvent.point.y;

        actionBox.style.left = x + 10 + 'px';
        actionBox.style.top = y + 10 + 'px';
        actionBox.style.display = 'block';

        const latlng = mouseEvent.latLng;
        actionBox.dataset.lat = latlng.getLat();
        actionBox.dataset.lng = latlng.getLng();
    });

    // 버튼 클릭 이벤트
  document.getElementById('info-btn').addEventListener('click', () => {
      const existingSidebar = document.getElementById('information-sidebar');

      // 이미 로드된 경우 보여주기만 함
      if (existingSidebar) {
          existingSidebar.classList.remove('hidden');
          existingSidebar.classList.add('visible');
          return;
      }

      // 없으면 fetch로 로드해서 body에 삽입
      fetch('/sidebar/informationSidebar.html')
          .then(res => res.text())
          .then(html => {
              document.body.insertAdjacentHTML('beforeend', html);

              // 방금 삽입된 사이드바에 visible 클래스 부여
              const newSidebar = document.getElementById('information-sidebar');
              if (newSidebar) {
                  newSidebar.classList.remove('hidden');
                  newSidebar.classList.add('visible');
              }
          })
          .catch(error => {
              console.error('informationSidebar.html 로딩 실패:', error);
          });
  });

    document.getElementById('post-btn').addEventListener('click', () => {
        const lat = actionBox.dataset.lat;
        const lng = actionBox.dataset.lng;
    /*    alert(`이 위치에 투고하기\n위도: ${lat}\n경도: ${lng}`);*/
    });

    // 지도 클릭 시 팝업 버튼 숨김
    const mapContainer = document.getElementById('map');
    mapContainer.addEventListener('click', (e) => {
        if (!actionBox.contains(e.target)) {
            actionBox.style.display = 'none';
        }
    });

    // 휠 확대/축소 부드럽게 제어
    let zoomTimeout = null;
    let targetLevel = window.map.getLevel();

    mapContainer.addEventListener('wheel', function (e) {
        e.preventDefault();

        if (e.deltaY < 0) {
            if (targetLevel > 1) targetLevel--;
        } else {
            if (targetLevel < 14) targetLevel++;
        }

        clearTimeout(zoomTimeout);
        zoomTimeout = setTimeout(() => {
            window.map.setLevel(targetLevel, { animate: true });
        }, 100);
    }, { passive: false });
}
document.addEventListener('click', function (event) {
  const actionBox = document.getElementById('map-action-buttons');

  // actionBox가 보이는 상태일 때만 처리
  if (actionBox.style.display === 'block') {
    // 클릭한 요소가 actionBox 안에 포함되지 않으면 닫기
    if (!actionBox.contains(event.target)) {
      actionBox.style.display = 'none';
    }
  }
});

// marker.js
// 이미 app.js 또는 다른 파일에서 생성된 map 객체를 사용합니다.
if (window.map) {
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(37.554722, 126.970833),
    map: window.map, // 전역 map 객체 사용
    title: '서울역'
  });
} else {
  console.error("지도 객체가 초기화되지 않았습니다.");
}
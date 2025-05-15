// search.js
if (typeof kakao !== 'undefined' && kakao.maps && kakao.maps.services && kakao.maps.services.Places) {
  const ps = new kakao.maps.services.Places();

  ps.keywordSearch('카카오프렌즈샵', function (data, status, _pagination) {
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(data[0].y, data[0].x);
      if (window.map) {
        window.map.setCenter(coords);

        const searchMarker = new kakao.maps.Marker({
          map: window.map,
          position: coords,
          title: data[0].place_name
        });
      } else {
        console.error("지도 객체가 초기화되지 않았습니다.");
      }
    }
  });
} else {
  console.error("카카오 맵 API가 로드되지 않았습니다.");
}
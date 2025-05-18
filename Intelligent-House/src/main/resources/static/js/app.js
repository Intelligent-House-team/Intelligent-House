var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var defaultCenter = new kakao.maps.LatLng(37.554722, 126.970833); // 서울역 좌표
var options = { //지도를 생성할 때 필요한 기본 옵션
    center: defaultCenter, // 초기 중심 좌표를 서울역으로 설정
    level: 3 //지도의 레벨(확대, 축소 정도)
};

window.map = new kakao.maps.Map(container, options); // 전역변수 지도 생성 및 객체 리턴

// 더블클릭 이벤트 리스너 (이전 코드 유지)
kakao.maps.event.addListener(window.map, 'dblclick', function(mouseEvent) {
    window.map.setLevel(window.map.getLevel() - 1, { anchor: mouseEvent.latLng });
});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const currentPosition = new kakao.maps.LatLng(lat, lon);

        // 현재 위치로 지도 중심 이동
        window.map.setCenter(currentPosition);

        const geoMarker = new kakao.maps.Marker({ //현재 위치에 마커 표시 (선택 사항)
            position: currentPosition,
            map: window.map,
            title: "현재 위치"
        });
    }, function() {
        console.log("Geolocation 접근 실패 또는 거부.");
        // 위치 정보 접근 실패 시 기본 중심 좌표(서울역) 유지
    });
} else {
    console.log("이 브라우저는 Geolocation을 지원하지 않습니다.");
    // Geolocation 미지원 시 기본 중심 좌표(서울역) 유지
}
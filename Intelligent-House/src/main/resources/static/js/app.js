// 지도 초기화
const mapContainer = document.getElementById('map');
const defaultCenter = new kakao.maps.LatLng(35.899344, 128.610915); // 대구 복현동 영진전문대학교
const mapOption = {
    center: defaultCenter,
    level: 3
};
window.map = new kakao.maps.Map(mapContainer, mapOption);

// 현재 위치 중심 이동
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const currentPosition = new kakao.maps.LatLng(lat, lon);

        window.map.setCenter(currentPosition);

        // 현재 위치 마커
        const geoMarker = new kakao.maps.Marker({
            position: currentPosition,
            map: window.map,
            title: "현재 위치"
        });
    }, function() {
        console.log("Geolocation 실패 또는 거부됨");
    });
} else {
    console.log("이 브라우저는 Geolocation을 지원하지 않음");
}
